'use client'

import { Inbody, InbodyData } from "@/feature/mypage/type";
import InbodyAddButton from "./InbodyAddButton";
import InbodyCt from "./InbodyCt";
import NoneInbodyCt from "./NoneInbodyCt";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function InbodyListCt({ setUpdate, response }: { setUpdate: Dispatch<SetStateAction<Inbody | null>>, response: { data: InbodyData } }) {
    const [inbodyData, setInbodyData] = useState<InbodyData>({
        inbodies: [],
        nextMeasuredDate: '',
        nextInbodyId: 0,
        hasNext: false
    })

    useEffect(() => (
        setInbodyData(response.data)
    ), [response.data])


    return (
        <>
            {inbodyData.inbodies.length === 0 && (
                <NoneInbodyCt />
            )}
            {inbodyData.inbodies.map((inbody, index) => {
                return <InbodyCt setUpdate={setUpdate} inbody={inbody} key={inbody.inbodyId} index={index} />
            })}
            {inbodyData.hasNext && inbodyData.nextInbodyId && inbodyData.nextMeasuredDate &&
                <InbodyAddButton setInbodyData={setInbodyData} nextInbodyId={inbodyData.nextInbodyId} nextInbodyDate={inbodyData.nextMeasuredDate} />
            }
        </>
    );
}