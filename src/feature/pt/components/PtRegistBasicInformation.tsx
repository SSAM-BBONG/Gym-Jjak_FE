import { PtRegistFormValue } from "@/lib/ptRegistSchema";
import { UseFormRegister } from "react-hook-form";

interface PtRegistBasicInformationProps {
  register: UseFormRegister<PtRegistFormValue>;
  errors: {
    title?: string;
    description?: string;
    price?: string;
  }
}

export default function PtRegistBasicInformation({
    register, errors
}: PtRegistBasicInformationProps) {
    return (
        <div className="
            flex flex-col gap-4
            bg-[#101828]
            border border-[#1E2939] rounded-[16px]
            p-6
            ">
                <p className="text-[18px] font-extrabold text-white"> 기본 정보</p>
                <div className="flex flex-col gap-6 mt-3">
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-white"> 강습명 </label>
                        <input
                            {...register("title")} 
                            type="text" 
                            placeholder="예: 체계적인 가슴 집중 PT"
                            className="
                            px-4 py-3
                            bg-[#1E2939]
                            border border-[#364153] rounded-[10px]
                            text-[16px] font-normal text-white"/>
                            {errors.title && <p className="text-[14px] text-red-400">{errors.title}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-white"> 강습 소개 </label>
                        <textarea 
                            {...register("description")} 
                            placeholder="강습의 목적, 진행 방식, 준비물, 대상자 등을 작성해주세요"
                            className="
                            px-4 py-3
                            bg-[#1E2939]
                            border border-[#364153] rounded-[10px]
                            text-[16px] font-normal text-white"
                            rows={8}/>
                        {errors.description && (
                            <p className="text-[14px] text-red-400">{errors.description}</p>
                        )}    
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-white"> 가격 (1회당)</label>
                        <input 
                            {...register("price")}
                            type="text" 
                            placeholder="PT 1회당 가격을 입력해주세요"
                            className="
                            px-4 py-3
                            bg-[#1E2939]
                            border border-[#364153] rounded-[10px]
                            text-[16px] font-normal text-white"/>
                            {errors.price && <p className="text-[14px] text-red-400">{errors.price}</p>}
                    </div>
                </div>
            </div>
    );
}