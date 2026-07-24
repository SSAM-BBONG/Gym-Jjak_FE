"use client";

import OneButtonModal from "@/components/ui/OneButtonModal";
import { updatePtCourseAction } from "@/feature/pt/actions";
import { PtCourseDetailData } from "@/feature/pt/type";
import { PtRegistFormValue, ptCourseEditSchema } from "@/lib/ptRegistSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import PtRegistBasicInformation from "./PtRegistBasicInformation";
import PtRegistCurriculum from "./PtRegistCurriculum";
import PtRegistPart from "./PtRegistPart";
import PtRegistPreview from "./PtRegistPreview";
import PtRegistTime from "./PtRegistTime";

export default function PtCourseEditForm({ course }: { course: PtCourseDetailData }) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<PtRegistFormValue>({
    resolver: zodResolver(ptCourseEditSchema) as unknown as Resolver<PtRegistFormValue>,
    defaultValues: {
      thumbnailFile: undefined as unknown as File,
      part: undefined as unknown as PtRegistFormValue["part"],
      title: course.title,
      description: course.description,
      price: course.price,
      curriculums: course.curriculums.map(({ curriculumId, title, content }) => ({ id: curriculumId, title, content })),
      schedules: course.schedules.map(({ scheduleId, dayOfWeek, startTime, endTime }) => ({ id: scheduleId, dayOfWeek: dayOfWeek as PtRegistFormValue["schedules"][number]["dayOfWeek"], startTime, endTime })),
    },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<PtRegistFormValue> = async (values) => {
    const formData = new FormData();
    if (values.thumbnailFile instanceof File && values.thumbnailFile.size > 0) formData.append("thumbnailFile", values.thumbnailFile);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("part", values.part);
    formData.append("price", String(values.price));
    formData.append("curriculums", JSON.stringify(values.curriculums));
    formData.append("schedules", JSON.stringify(values.schedules));

    const result = await updatePtCourseAction(course.ptCourseId, formData);
    if (!result.success) {
      setErrorMessage(result.message);
      return;
    }

    router.push("/pt/manage");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-6">
      <PtRegistPreview
        setValue={setValue}
        error={errors.thumbnailFile?.message}
        initialThumbnailUrl={course.thumbnailUrl}
        allowThumbnailDelete
      />
      <PtRegistBasicInformation register={register} errors={{ title: errors.title?.message, description: errors.description?.message, price: errors.price?.message }} />
      <PtRegistPart register={register} error={errors.part?.message} />
      <PtRegistCurriculum setValue={setValue} error={errors.curriculums?.message} initialCurriculums={course.curriculums.map(({ curriculumId, title, content }) => ({ id: curriculumId, title, content }))} />
      <PtRegistTime setValue={setValue} error={errors.schedules?.message} initialSchedules={course.schedules.map(({ scheduleId, dayOfWeek, startTime, endTime }) => ({ id: scheduleId, dayOfWeek: dayOfWeek as PtRegistFormValue["schedules"][number]["dayOfWeek"], startTime, endTime }))} />
      <div className="flex gap-3"><button type="button" onClick={() => router.back()} className="flex-1 rounded-[10px] bg-[#1E2939] py-4 text-[16px] font-extrabold text-white">취소</button><button type="submit" disabled={isSubmitting} className="flex-1 rounded-[10px] bg-[#BFFF0B] py-4 text-[16px] font-extrabold text-black">{isSubmitting ? "수정 중..." : "수정하기"}</button></div>
      <OneButtonModal isModal={Boolean(errorMessage)} closeModal={() => setErrorMessage("")} title="PT 강습 수정 실패" content={errorMessage} />
    </form>
  );
}
