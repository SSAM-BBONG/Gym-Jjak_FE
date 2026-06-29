"use client";

import { PtRegistFormValue } from "@/lib/ptRegistSchema";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";


interface PtRegistCurriculumProps {
  setValue: UseFormSetValue<PtRegistFormValue>;
  error?: string;
}

interface CurriculumItem {
  title: string;
  content: string;
}



export default function PtRegistCurriculum({
  setValue,
  error,
}: PtRegistCurriculumProps) {

    const [curriculumTitleInput, setCurriculumTitleInput] = useState("");
    const [curriculumContentInput, setCurriculumContentInput] = useState("");
    const [curriculums, setCurriculums] = useState<CurriculumItem[]>([]);

    const handleAddCurriculum = () => {
        const trimmedTitle = curriculumTitleInput.trim();
        const trimmedContent = curriculumContentInput.trim();

        if (trimmedTitle === "" || trimmedContent === "") return;

        const nextCurriculums = [
        ...curriculums,
        {
            title: trimmedTitle,
            content: trimmedContent,
        },
        ];

        setCurriculums(nextCurriculums);
        setCurriculumTitleInput("");
        setCurriculumContentInput("");

        setValue("curriculums", nextCurriculums, {
        shouldValidate: true,
        shouldDirty: true,
        });
    };

    const handleRemoveCurriculum = (removeIndex: number) => {
        const nextCurriculums = curriculums.filter(
        (_, index) => index !== removeIndex
        );

        setCurriculums(nextCurriculums);

        setValue("curriculums", nextCurriculums, {
        shouldValidate: true,
        shouldDirty: true,
        });
    };

    return (
    <div className="
        flex flex-col gap-6
        bg-[#101828]
        border border-[#1E2939] rounded-[16px]
        p-6
        ">
            <div className="flex justify-between items-center"> 
                <p className="text-[18px] font-extrabold text-white"> 커리큘럼 </p>
                <button
                    type="button"
                    onClick={handleAddCurriculum}
                    className="px-4 py-2 bg-[#364153] rounded-[10px] text-white text-[14px] font-medium"
                >
                    + 회차 추가
                </button>
            </div>

            <div className="flex flex-col gap-4 bg-[#1E2939] rounded-[10px] p-4">
                <input
                    value={curriculumTitleInput}
                    onChange={(e) => setCurriculumTitleInput(e.target.value)}
                    className="bg-[#101828] border border-[#364153] rounded-[10px] px-3 py-2 text-[14px] font-normal text-white"
                    type="text"
                    placeholder="회차 제목"
                />

                <textarea
                    value={curriculumContentInput}
                    onChange={(e) => setCurriculumContentInput(e.target.value)}
                    className="bg-[#101828] border border-[#364153] rounded-[10px] px-3 py-2 text-[14px] font-normal text-white"
                    placeholder="회차 설명"
                />
            </div>

            {curriculums.map((curriculum, index) => (
                <div
                    key={`${curriculum.title}-${index}`}
                    className="
                    flex flex-col gap-6
                    bg-[#1E2939]
                    rounded-[10px]
                    p-4"
                > 
                    <div className="flex justify-between items-center">
                        <p className="text-[14px] font-extrabold text-[#BFFF0B]"> {index + 1}회차 </p>
                        <button 
                            type="button"
                            onClick={() => handleRemoveCurriculum(index)}
                            className="px-3 py-1 bg-[#82181A4D] rounded-[10px] text-[#FF6467] font-extrabold"> ✕ </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="bg-[#101828] border border-[#364153] rounded-[10px] px-3 py-2 text-[14px] font-normal text-white">
                        {curriculum.title}
                        </p>

                        <p className="bg-[#101828] border border-[#364153] rounded-[10px] px-3 py-2 text-[14px] font-normal text-white whitespace-pre-wrap">
                        {curriculum.content}
                        </p>
                    </div>
                </div>
            ))}
        {error && <p className="text-[14px] text-red-400">{error}</p>}
        </div>
    );
} 
