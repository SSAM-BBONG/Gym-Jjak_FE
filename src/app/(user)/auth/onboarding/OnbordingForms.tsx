'use client'

import { ReactHTMLElement, useState } from "react";
import Onboarding1Form from "./Onboarding1Form";
import Onboarding2Form from "./Onboarding2Form";
import Onboarding3Form from "./Onboarding3Form";
import Onboarding4Form from "./Onboarding4Form";
import Onboarding5Form from "./Onboarding5Form";
import Onboarding6Form from "./Onboarding6Form";
import { onbordingRequest } from "@/feature/auth/type";



export default function OnbordingForms({ page }: { page: string }) {

    const [totalData, setTotalData] = useState<onbordingRequest>({
        exerciseGoal: '',
        exercisePeriod: '',
        exerciseFrequency: '',
        preferredExercise: '',
        height: 0,
        weight: 0,
        region: {
            sido: "",
            sigungu: "",
            eupmyeondong: "",
            fullName: "",
            latitude: 0,
            longitude: 0
        }
    })

    return (
        <>
            <div hidden={page !== '1'}>
                <Onboarding1Form totalData={totalData} setTotalData={setTotalData} />
            </div>
            <div hidden={page !== '2'}>
                <Onboarding2Form totalData={totalData} setTotalData={setTotalData} />
            </div>
            <div hidden={page !== '3'}>
                <Onboarding3Form totalData={totalData} setTotalData={setTotalData} />
            </div>
            <div hidden={page !== '4'}>
                <Onboarding4Form totalData={totalData} setTotalData={setTotalData} />
            </div>
            <div hidden={page !== '5'}>
                <Onboarding5Form totalData={totalData} setTotalData={setTotalData} />
            </div>
            <div hidden={page !== '6'}>
                <Onboarding6Form totalData={totalData} setTotalData={setTotalData} />
            </div>
        </>
    );
}