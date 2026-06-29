"use client";

import { createPtRegistAction } from "@/feature/pt/actions";
import PtRegistCurriculum from "./PtRegistCurriculum";
import PtRegistTime from "./PtRegistTime";
import PtRegistCategoryTag from "./PtRegistCategoryTag";
import PtRegistBasicInformation from "./PtRegistBasicInformation";
import PtRegistPreview from "./PtRegistPreview";
import { PtRegistCategoryData, PtRegistTagData } from "../type";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { PtRegistFormValue, ptRegistSchema } from "@/lib/ptRegistSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface PtRegistFormProps {
    category: PtRegistCategoryData[];
    tag: PtRegistTagData[];
}

export default function PtRegistForm({ category, tag}: PtRegistFormProps) {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isSubmitting },
        } = useForm<PtRegistFormValue>({
        resolver: zodResolver(ptRegistSchema) as Resolver<PtRegistFormValue>,
        defaultValues: {
            title: "",
            description: "",
            categoryId: 0,
            tagId: 0,
            price: 0,
            curriculums: [{ title: "", content: "" }],
            schedules: [{ dayOfWeek: "MONDAY", startTime: "10:00", endTime: "11:00" }],
        },
        mode: "onSubmit",
    });

    const onSubmit: SubmitHandler<PtRegistFormValue> = async (values) => {
        const formData = new FormData();

        formData.append("thumbnailFile", values.thumbnailFile);
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("categoryId", String(values.categoryId));
        formData.append("tagId", String(values.tagId));
        formData.append("price", String(values.price));
        formData.append("curriculums", JSON.stringify(values.curriculums));
        formData.append("schedules", JSON.stringify(values.schedules));

        await createPtRegistAction(formData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}className="flex flex-col gap-6 mt-6">
            
            <PtRegistPreview
                setValue={setValue} 
                error={errors.thumbnailFile?.message}     
            />

            <PtRegistBasicInformation
                register={register}
                errors={{
                title: errors.title?.message,
                description: errors.description?.message,
                price: errors.price?.message,
                }}
            />

            <PtRegistCategoryTag
                category={category}
                tag={tag}
                register={register}
                errors={{
                categoryId: errors.categoryId?.message,
                tagId: errors.tagId?.message,
                }}
            />


            <PtRegistCurriculum 
                setValue={setValue}
                error={errors.curriculums?.message}
            />
            
            <PtRegistTime
                setValue={setValue}
                error={errors.schedules?.message}
            />


            <div className="flex gap-3">
                <button
                    type="button" 
                    className="flex-1 rounded-[10px] bg-[#1E2939] py-4 text-white text-[16px] font-extrabold"
                > 
                    취소 
                </button>
                <button 
                    type="submit"
                    disabled={isSubmitting} 
                    className="flex-1 rounded-[10px] bg-[#BFFF0B] py-4 text-black text-[16px] font-extrabold"
                > 
                    {isSubmitting ? "등록 중" : "등록하기"} 
                </button>
            </div>
        </form>
    );
}
