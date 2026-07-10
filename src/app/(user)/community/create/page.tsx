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
            <h1 className="text-[22px] md:text-[30px] font-black text-white"> 게시글 제목 </h1>

            <div className="flex justify-between mt-5 md:my-5 items-center">
                <div className="flex flex-col md:flex-row gap-3">
                    <p className="text-[10px] md:text-[12px] lg:text-[14px] text-white font-medium"> 사용자 아이디</p>
                    <p className="text-[10px] md:text-[12px] lg:text-[14px] text-[#99A1AF] font-normal">
                        2025-05-13 14:30
                    </p>
                    <p className="text-[10px] md:text-[12px] lg:text-[14px] text-[#99A1AF] font-normal"> 조회 160</p>
                </div>
                <div className="flex gap-3 items-center">
                    <div className=" flex gap-2 items-center self-center px-3 md:px-4 py-2 bg-[#1E2939] rounded-[10px] font-extrabold text-[10px] md:text-[14px] text-white">
                        <div className="relative w-3 h-3 md:w-4 md:h-4">
                            <Image
                                src={CommuDetailLike}
                                alt="커뮤니티 상세조회 좋아요"
                                fill
                                sizes="w-8 h-8"
                                className="object-cover hover:cursor-pointer"
                            />
                        </div>
                        <p> 24 </p>
                    </div>

                    <div className="px-2 py-2 bg-[#1E2939] rounded-[10px]">
                        <div className="relative w-3 h-3 md:w-4 md:h-4">
                            <Image
                                src={CommuDetailEdit}
                                alt="게시글 수정"
                                fill
                                sizes="w-8 h-8"
                                className="object-cover hover:cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="px-2 py-2 bg-[#1E2939] rounded-[10px]">
                        <div className="relative w-3 h-3 md:w-4 md:h-4">
                            <Image
                                src={CommuDetailRemove}
                                alt="게시글 삭제"
                                fill
                                sizes="w-8 h-8"
                                className="object-cover hover:cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="px-2 py-2 bg-[#1E2939] rounded-[10px]">
                        <div className="relative w-3 h-3 md:w-4 md:h-4">
                            <Image
                                src={CommuDetailDeclaration}
                                alt="게시글 신고"
                                fill
                                sizes="w-8 h-8"
                                className="object-cover hover:cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-[#1E2939] hidden md:block" />

            <p className="text-[13px] md:text-[16px] font-normal text-[#D1D5DC] py-8"> 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용게시글 내용 게시글 내용 게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용 </p>

            <hr className="border-[#1E2939]" />

            <div className="flex gap-3 items-center">
                <p className="text-[14px] md:text-[18px] text-white font-extrabold"> 댓글</p>
                <p className="text-[14px] md:text-[18px] text-[#BFFF0B] font-extrabold"> 3</p>
            </div>
            <CommuCommentCard />
            <CommuCommentCard />
        </div>
    );
}
