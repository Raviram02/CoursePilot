"use client";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetail from "@/app/create-course/[courseId]/_components/CourseDetail";
import Header from "@/app/dashboard/_components/Header";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Course() {
  const params = useParams();
  const courseId = params.courseId;
  const [course, setCoure] = useState();

  useEffect(() => {
    if (courseId) {
      GetCourse();
    }
  }, [courseId]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, courseId));

    setCoure(result[0]);
    console.log(result);
  };

  return (
    <div>
      <Header display={true}/>
      <div className="px-10 p-10 md:px-20 lg:px-44">
        <CourseBasicInfo course={course} edit={false}/>
        <CourseDetail course={course}/>

        <ChapterList course={course} edit={false}/>
      </div>
    </div>
  );
}

export default Course;
