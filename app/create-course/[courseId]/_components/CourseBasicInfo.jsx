import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdOutlineCategory } from "react-icons/md";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { Input } from "@/components/ui/input";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

function CourseBasicInfo({ course, refreshData, edit = true }) {
  const [selectedFile, setSelectedFile] = useState();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (course) {
      setSelectedFile(course?.courseBanner);
    }
  }, [course]);

  // const onFileSelected = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(URL.createObjectURL(file));
  //   const fileName = Date.now() + '.jpg';
  //   const storageRef = ref(storage, fileName)
  // }

  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "CoursePilot_images"); // set in Cloudinary dashboard

    try {
      setUploading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Cloudinary Upload Response:", data);

      if (data.secure_url) {
        // You can now save this URL to your DB with refreshData()
        // refreshData(true);
        // console.log(data.secure_url);
        await db
          .update(CourseList)
          .set({
            courseBanner: data.secure_url,
          })
          .where(eq(CourseList.id, course?.id));
      }
    } catch (err) {
      console.error("Upload Error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.courseName}
            {edit && (
              <EditCourseBasicInfo
                course={course}
                refreshData={() => refreshData(true)}
              />
            )}
          </h2>
          <p className="text-sm text-gray-500 mt-3">
            {course?.courseOutput?.description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            <MdOutlineCategory />
            {course?.category}
          </h2>
          {!edit && (
            <Link href={"/course/" + course?.courseId + "/start"}>
              <Button className="w-full mt-5 cursor-pointer">Start</Button>
            </Link>
          )}
        </div>
        <div>
          <label htmlFor="upload-image">
            <Image
              src={selectedFile ? selectedFile : "/placeholder.png"}
              width={300}
              height={300}
              className="w-full rounded-xl h-[250px] object-cover cursor-pointer"
              alt="Course-placeholder-image"
            />
          </label>

          {edit && (
            <Input
              type="file"
              id="upload-image"
              className="opacity-0"
              onChange={onFileSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
