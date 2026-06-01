'use client'

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import PreButton from "./(user)/preButton";

type ErrorProps = {
    error: Error;
    reset: () => void;
}



export default function Error({ error, reset }: ErrorProps) { // {error: Error 객체, reset: 함수}
    const router = useRouter();

    const [isPending, startTransition] = useTransition(); //[실행 중 여부, 함수]

    const handleReset = () => {
        startTransition(() => {
            router.refresh();//서버에 새 데이터 줘 라는 요청    //비동기
            reset();//받아온 데이터 기반으로 화면 다시 그려줘 라는 요청     //동기
        })

    }

    return (
        <div className="p-8">
            <p className="text-center text-white mt-4">
                {error.message || '알 수 없는 오류가 발생했습니다.'}
            </p>
            <div className="text-center mt-10">
                <PreButton />
                <button
                    className="mx-2 py-3 px-7 bg-[#BFFF0B] text-black font-bold text-sm rounded-md"
                    onClick={handleReset}>
                    다시 시도
                </button>

            </div>
        </div>
    );
}