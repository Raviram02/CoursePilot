"use client";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import LoadingDialog from "../_components/LoadingDialog";
import service from "@/configs/service";
import { useRouter } from "next/navigation";

function CourseLayout({ params: paramsPromise }) {
  const params = React.use(paramsPromise); // ✅ unwrap promise to get actual params object
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    params && GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setCourse(result[0]);
    console.log(result);
  };

  const sanitizeAIText = (text) => {
    if (!text) return "";

    return text
      .replace(/```json/gi, "") // remove code fences
      .replace(/```/g, "")
      .replace(/^[^{\[]*/, "") // remove junk before first { or [
      .replace(/[^}\]]*$/, "") // remove junk after last } or ]
      .trim(); // 🚀 do NOT escape \n, \t, or \
  };

  const safeParseJSON = (text) => {
    try {
      const parsed = JSON.parse(text);
      // Ensure array
      if (Array.isArray(parsed)) return parsed;
      return [parsed]; // wrap single object
    } catch (err) {
      console.error("SafeParseJSON failed:", err.message, "\nRaw text:", text);
      return null;
    }
  };

  const GenerateChapterContent = async () => {
    try {
      setLoading(true);
      const chapters = course?.courseOutput?.chapters;

      if (!chapters?.length) {
        console.warn("No chapters found in course.");
        return;
      }

      for (let index = 0; index < chapters.length; index++) {
        const chapter = chapters[index];
        const PROMPT = `Explain the concept in detail on Topic: ${course?.name}, Chapter: ${chapter?.name}.
Return ONLY a valid JSON array of objects, nothing else. Each object must have exactly these fields:
- "title": a string (one line, no line breaks),
- "description": a string (use \\n for newlines, no raw line breaks),
- "code": if applicable, provide code examples wrapped in <precode>...</precode>, otherwise use null.

Make sure the JSON is strictly valid, enclosed in [ ]. Do not include extra text outside JSON.`;

        console.log(
          `\n--- Generating for Chapter ${index + 1}: ${chapter?.name} ---`
        );

        let aiText = "";
        let parsedJSON = null;
        let videoId = "";

        try {
          // ✅ Await video fetch
          const resp = await service.getVideos(
            course?.name + ":" + chapter?.name
          );
          videoId = resp?.[0]?.id?.videoId || "";

          // ✅ Get AI response
          const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
          aiText = await result.response?.text();
          console.log("Raw AI Response:", aiText);

          // ✅ Clean & parse
          const cleaned = sanitizeAIText(aiText);
          parsedJSON = safeParseJSON(cleaned);

          if (!parsedJSON) {
            console.warn(
              `Invalid JSON for Chapter ${chapter?.name}. Saving fallback.`
            );
            parsedJSON = [
              {
                title: "Content unavailable",
                description: "AI failed to generate valid JSON.",
                code: null,
              },
            ];
          }
        } catch (error) {
          console.error(
            `Error handling Chapter ${chapter?.name}:`,
            error,
            "\nAI text was:",
            aiText
          );
          parsedJSON = [
            {
              title: "Error occurred",
              description: "Chapter content could not be generated.",
              code: null,
            },
          ];
        }

        // ✅ Always save something (even fallback)
        try {
          await db.insert(Chapters).values({
            chapterId: chapter?.id || index,
            courseId: course?.courseId,
            content: parsedJSON,
            videoId: videoId,
          });
        } catch (dbErr) {
          console.error(
            `DB insert failed for Chapter ${chapter?.name}:`,
            dbErr
          );
        }
      }
    } catch (outerError) {
      console.error("Unexpected error in GenerateChapterContent:", outerError);
    } finally {
      setLoading(false);
      await db.update(CourseList).set({ publish: true });
      router.replace("/create-course/" + course?.courseId + "/finish");
    }
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      <LoadingDialog loading={loading} />
      {/* Basic Info */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />

      {/* Course Detail */}
      <CourseDetail course={course} />

      {/* List of Chapters */}
      <ChapterList course={course} refreshData={() => GetCourse()} />

      <Button onClick={GenerateChapterContent} className="my-10 cursor-pointer">
        Generate Course Content
      </Button>
    </div>
  );
}

export default CourseLayout;
