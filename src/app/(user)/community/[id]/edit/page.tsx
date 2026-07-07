import { CommuDetailDeclaration, CommuDetailEdit, CommuDetailLike, CommuDetailRemove } from "@/components/ui/image";
import CommuCommentCard from "@/feature/community/components/CommuCommentCard";
import Image from "next/image";

export default function page() {
    return (
        <div className="flex flex-col gap-3 
        md:bg-[linear-gradient(135deg,_rgba(16,24,40,0.90)_0%,_rgba(30,41,57,0.90)_100%)]
        md:border-[#36415380] md:border-[1px]
        md:rounded-[16px]
        sm:mx-10
        md:mx-25
        lg:mx-40
        mt-5
        md:mt-10
        p-8
        ">
            <h2
                className="
                flex items-center justify-center
                self-baseline
                rounded-[4px] px-3 py-1 
                text-[#D1D5DC] bg-[#364153]
                text-[12px]
                font-extrabold"
            >
                자유게시판
            </h2>
            <input
                placeholder="제목을 입력해주세요"
                className="text-[22px] md:text-[30px] font-black text-white focus:outline-none" />

            <div className="flex justify-between mt-5 md:my-5 items-center">
                <div className="flex flex-col md:flex-row gap-3">
                    <p className="text-[10px] md:text-[12px] lg:text-[14px] text-white font-medium"> 사용자 아이디</p>
                    <p className="text-[10px] md:text-[12px] lg:text-[14px] text-[#99A1AF] font-normal">
                        2025-05-13 14:30
                    </p>
                </div>
            </div>
            <hr className="border-[#1E2939]" />

            <textarea
                placeholder="내용을 입력해주세요"
                defaultValue={'게시글 내용'}
                className="rounded-[10px] h-47 focus:outline-none resize-none text-[13px] md:text-[16px] font-normal text-[#D1D5DC] p-2" />

        </div>
    );
}
