import { getInbody } from "@/service/mypage.service";
import InbodySection from "./InbodySection";
import { Inbody } from "@/feature/mypage/type";

export default async function Page() {
    const response = await getInbody();
    const inbodies: Inbody[] = response.data.inbodies;

    return (
        <div className="flex flex-col px-4 sm:px-10 md:px-20 lg:px-40 gap-2 pt-6 sm:pt-8 lg:pt-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-black text-white"> 인바디 정보</h1>
                    <p className="text-xs sm:text-sm lg:text-[14px] font-normal text-[#99A1AF] mb-6 sm:mb-7 lg:mb-8">키, 몸무게, 체성분 정보를 기록하고 관리하세요</p>
                </div>
            </div>


            <InbodySection response={response} inbodies={inbodies} />
        </div>
    );
}
