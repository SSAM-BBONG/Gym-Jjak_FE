import { getInbody } from "@/service/mypage.service";
import InbodyForm from "./InbodyForm";
import { Inbody } from "@/feature/mypage/type";
import InbodyListCt from "./InbodyListCt";

export default async function Page() {
    const response = await getInbody();
    const inbodies: Inbody[] = response.data.inbodies;

    return (
        <div className="flex flex-col px-40 gap-2 pt-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-[36px] font-black text-white"> 인바디 정보</h1>
                    <p className="text-[14px] font-normal text-[#99A1AF] mb-8">키, 몸무게, 체성분 정보를 기록하고 관리하세요</p>
                </div>
            </div>
            <section className="flex gap-6 flex-col md:flex-row">
                <article className="h-107 w-full rounded-[16px] border border-[#36415380] bg-[#101828] p-6">
                    <h3 className="mb-4 font-bold text-[18px] text-white">새 기록 추가</h3>
                    <InbodyForm />
                </article>
                <article className="w-full min-h-80 rounded-[16px] border border-[#36415380] bg-[#101828] p-6">
                    <div className="flex justify-between">
                        <h3 className="mb-4 font-bold text-[18px] text-white">측정 기록</h3>
                        <p className="text-[#FF6467] font-normal text-sm">{Number(inbodies[0]?.bmiChange || 0) > 0 && '+'}{inbodies[0]?.bmiChange}</p>
                    </div>
                    <InbodyListCt response={response} />
                </article>
            </section>
        </div>
    );
}