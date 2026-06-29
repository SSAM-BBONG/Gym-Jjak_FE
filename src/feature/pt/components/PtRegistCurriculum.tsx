"use client";

import { useState } from "react";

export default function PtRegistCurriculum() {
    const [curriculums, setCurriculums] = useState([
    { id: 1 },
    ]);

    const handleAddCurriculum = () => {
    setCurriculums((prevCurriculums) => [
        ...prevCurriculums,
        { id: prevCurriculums.length + 1 },
    ]);
    };

    const handleRemoveCurriculum = (removeIndex: number) => {
        const nextCurriculums = curriculums.filter((_, index) => index !== removeIndex)
        setCurriculums(nextCurriculums);
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

            {curriculums.map((curriculum, index) => (
                <div
                    key={curriculum.id}
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
                        <input 
                            name="curriculumTitle"
                            className="
                            bg-[#101828]
                            border border-[#364153] rounded-[10px]
                            px-3 py-2
                            text-[14px] font-normal text-white"
                            type="text" 
                            placeholder="회차 제목"/>
                        <textarea 
                            name="curriculumContent"
                            className="
                            bg-[#101828]
                            border border-[#364153] rounded-[10px]
                            px-3 py-2
                            text-[14px] font-normal text-white"    
                            placeholder="회차 설명"/>
                    </div>
                </div>
            ))}
        </div>
    );
} 
