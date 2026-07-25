import PtRegistForm from "@/feature/pt/components/PtRegistForm";
import { getMyPtRegistOrganizations } from "@/service/ptzone.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default async function PtRegistPage() {
    const organizationResponse = await getMyPtRegistOrganizations();

    return (
        <div className="flex flex-col gap-1 px-3 py-5 sm:px-6 md:px-12 md:py-8 lg:px-70 lg:py-10">
            <p className="text-2xl font-black text-white sm:text-3xl lg:text-[36px]"> PT 등록 </p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 새로운 PT를 등록해주세요. </p>

            <PtRegistForm organizations={organizationResponse.data} />
        </div>
    );
}
