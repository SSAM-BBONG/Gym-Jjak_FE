'use client'

import { InbodyData } from "@/feature/mypage/type";
import InbodyAddButton from "./InbodyAddButton";
import InbodyCt from "./InbodyCt";
import NoneInbodyCt from "./NoneInbodyCt";
import { useEffect, useState } from "react";

export default function InbodyListCt({ response }: { response: { data: InbodyData } }) {
    const [inbodyData, setInbodyData] = useState<InbodyData>({
        inbodies: [],
        nextMeasuredDate: '',
        nextInbodyId: 0,
        hasNext: false
    })

    useEffect(() => (
        setInbodyData(response.data)
    ), [])


    return (
        <>
            {inbodyData.inbodies.length === 0 && (
                <NoneInbodyCt />
            )}
            {inbodyData.inbodies.map((inbody, index) => {
                return <InbodyCt inbody={inbody} key={inbody.inbodyId} index={index} />
            })}
            {inbodyData.hasNext && inbodyData.nextInbodyId && inbodyData.nextMeasuredDate &&
                <InbodyAddButton setInbodyData={setInbodyData} nextInbodyId={inbodyData.nextInbodyId} nextInbodyDate={inbodyData.nextMeasuredDate} />
            }
        </>
    );
}