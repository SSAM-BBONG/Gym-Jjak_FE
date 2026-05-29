'use client'
import { useRouter } from 'next/navigation';

export default function PreButton() {
    const router = useRouter();
    return (
        <button
            onClick={router.back}
            className="py-3 px-7 bg-[#1E2939] text-white font-bold text-sm rounded-md">
            이전 페이지</button>
    );
}