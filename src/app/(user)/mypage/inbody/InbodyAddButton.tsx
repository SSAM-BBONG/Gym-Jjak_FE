'use client'

import { getInbodyDetailAction } from "@/feature/mypage/actions";
import { InbodyData } from "@/feature/mypage/type";
import { Dispatch, SetStateAction } from "react";

export default function InbodyAddButton({ setInbodyData, nextInbodyId, nextInbodyDate }: { setInbodyData: Dispatch<SetStateAction<InbodyData>>, nextInbodyId: number, nextInbodyDate: string }) {
    const addInbody = async () => {
        const response = await getInbodyDetailAction(nextInbodyId, nextInbodyDate);
        const addInbodies: InbodyData = response.data;
        setInbodyData((prev) => ({
            inbodies: [...prev.inbodies, ...addInbodies.inbodies],
            nextMeasuredDate: addInbodies?.nextMeasuredDate,
            nextInbodyId: addInbodies?.nextInbodyId,
            hasNext: addInbodies.hasNext
        }))
    }

    return (
        <button className="text-[#6A7282] w-full text-center text-base font-normal px-1 mt-2" onClick={addInbody} > 더보기 ▾</button>
    );
}