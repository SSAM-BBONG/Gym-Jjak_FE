import PtRegistForm from "@/feature/pt/components/PtRegistForm";
import { getPtzoneCategory, getPtzoneTag } from "@/service/ptzone.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default async function PtRegistPage() {

    const categoryResponse = await getPtzoneCategory();
    const TagResponse = await getPtzoneTag();

    return (
        <div className="flex flex-col gap-1 px-70 py-10">
            <p className="text-[36px] font-black text-white"> PT 등록 </p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 새로운 PT를 등록해주세요. </p>

            <PtRegistForm
                category={categoryResponse.data}
                tag={TagResponse.data}
            />
        </div>
    );
}