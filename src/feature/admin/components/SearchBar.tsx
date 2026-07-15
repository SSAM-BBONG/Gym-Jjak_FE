'use client'

import { AdminSearchImg } from "@/components/ui/image";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchBar({ page = true }: { page?: boolean }) {
    const [searchInput, setSearchInput] = useState<string>('')
    const searchParams = useSearchParams();
    const router = useRouter();

    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const debounceTimer = setTimeout(() => {
            const params = new URLSearchParams(searchParams);

            if (!searchInput.trim()) {
                params.delete('keyword');
            } else {
                params.set('keyword', searchInput);
            }
            if (page) {
                params.set('page', '0');
            }

            //검색어 변경은 주소에는 반영되지만, 뒤로가기 기록에는 계속 쌓이지 않습니다.
            //push는 뒤로가기에 쌓임
            router.replace(`?${params.toString()}`);
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [searchInput]);

    return (
        <form
            className="rounded-md border-[#364153] w-full p-3 sm:p-4 md:p-5 lg:p-6 bg-gradient-to-br from-[#101828] to-[#1E2939] flex gap-2 sm:gap-3 lg:gap-4">
            <div
                className="flex items-center gap-2 sm:gap-3 bg-[#1E2939] border border-[#364153] rounded-md w-full p-2.5 sm:p-3 lg:p-3.5">
                <button className="relative w-4 h-4 lg:w-5 lg:h-5">
                    <Image
                        src={AdminSearchImg}
                        alt="검색"
                        fill
                        sizes="w-4 h-4"
                    />
                </button>
                <input
                    className="font-normal text-[#6A7282] text-sm md:text-base focus:outline-0 w-full"
                    placeholder="검색어를 입력해주세요."
                    type="text"
                    name="search"
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                />
            </div>
            <button type='button' className="px-3 lg:px-4 py-2.5 lg:py-3 text-[#99A1AF] rounded-md text-sm md:text-base font-medium w-18 sm:w-20 lg:w-23 bg-[#1E2939]">필터</button>
        </form>
    );
}
