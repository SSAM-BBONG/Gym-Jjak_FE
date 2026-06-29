import { UseFormRegister } from "react-hook-form";
import { PtRegistCategoryData, PtRegistTagData } from "../type";
import { PtRegistFormValue } from "@/lib/ptRegistSchema";

interface PtRegistCategoryTagProps {
    category: PtRegistCategoryData[];
    tag: PtRegistTagData[];
    register: UseFormRegister<PtRegistFormValue>;
    errors: {
        categoryId?: string;
        tagId?: string;
    }
}

export default function PtRegistCategoryTag( {
    category, tag, register, errors
}: PtRegistCategoryTagProps) {
    
    return (
        <div className="
            flex flex-col gap-6
            bg-[#101828]
            border border-[#1E2939] rounded-[16px]
            p-6
            ">
                <p className="text-[18px] font-extrabold text-white"> 카테고리 및 태그 </p>
                <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-medium text-white"> 카테고리 </p>
                    <div className="flex gap-3">
                        {category.map((item) => (
                             <label 
                                key={item.categoryId}
                                className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[16px] font-medium cursor-pointer"
                            >
                                <input 
                                    className="hidden" 
                                    type="checkbox" 
                                    value={item.categoryId}
                                    {...register("categoryId")}  /> 
                                {item.name} 
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-medium text-white"> 태그 </p>
                    <div className="flex gap-3">
                        {tag.map((item) => (
                            <label 
                                key={item.tagId}
                                className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-extrabold hover:cursor-pointer"
                            >
                                <input 
                                    className="hidden"  
                                    type="checkbox" 
                                    value={item.tagId} 
                                    {...register("tagId")}/> 
                                {item.name} 
                            </label>                            
                        ))}
                    </div>
                    {errors.tagId && <p className="text-[14px] text-red-400">{errors.tagId}</p>}
                </div>
            </div>
    );
}