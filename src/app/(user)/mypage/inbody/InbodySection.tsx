'use client'

import { Inbody, InbodyData } from "@/feature/mypage/type";
import InbodyForm from "./InbodyForm";
import InbodyListCt from "./InbodyListCt";
import { useState } from "react";

export default function InbodySection({ response, inbodies }: { response: { data: InbodyData }, inbodies: Inbody[] }) {

    const [update, setUpdate] = useState<Inbody | null>(null);
    return (
        <section className="flex gap-6 flex-col md:flex-row">
            <article className="min-h-107 max-h-120 w-full rounded-[16px] border border-[#36415380] bg-[#101828] p-6">
                <h3 className="mb-4 font-bold text-[18px] text-white">새 기록 추가</h3>
                <InbodyForm setUpdate={setUpdate} update={update} />
            </article>
            <article className="w-full min-h-80 rounded-[16px] border border-[#36415380] bg-[#101828] p-6">
                <div className="flex justify-between">
                    <h3 className="mb-4 font-bold text-[18px] text-white">측정 기록</h3>
                    <p className="text-[#FF6467] font-normal text-sm">{Number(inbodies[0]?.bmiChange || 0) > 0 && '+'}{inbodies[0]?.bmiChange}</p>
                </div>
                <InbodyListCt setUpdate={setUpdate} response={response} />
            </article>
        </section>
    );
}