"use client";

import { OrganApplicationUpload} from "@/components/ui/image";
import { createPtCourseAction } from "@/feature/pt/actions";
import { useActionState } from "react";
import PtRegistCurriculum from "./PtRegistCurriculum";
import PtRegistTime from "./PtRegistTime";
import PtRegistCategoryTag from "./PtRegistCategoryTag";
import PtRegistBasicInformation from "./PtRegistBasicInformation";
import PtRegistPreview from "./PtRegistPreview";

export default function PtRegistForm() {
    const [state, formAction, isPending] = useActionState(createPtCourseAction, {
        success: false,
        message: "",
        errors: {},
    });

    return (
        <form action={formAction} className="flex flex-col gap-6 mt-6">
            
            <PtRegistPreview />

            <PtRegistBasicInformation/>

            <PtRegistCategoryTag />

            <PtRegistCurriculum />
            
            <PtRegistTime/>


            <div className="flex gap-3">
                <button type="button" className="flex-1 rounded-[10px] bg-[#1E2939] py-4 text-white text-[16px] font-extrabold"> 취소 </button>
                <button disabled={isPending} className="flex-1 rounded-[10px] bg-[#BFFF0B] py-4 text-black text-[16px] font-extrabold"> {isPending ? "등록 중" : "등록하기"} </button>
            </div>
        </form>
    );
}
