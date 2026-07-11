import { CommunitySearchBar } from "@/components/ui/image";
import Image from "next/image";

export default function CommentBar() {
    return (
        <div className="w-full ">
            <div className="flex items-center  rounded-[5px] md:rounded-[10px] border-[#364153] bg-[#1E2939] mx-7 sm:mx-15 md:mx-0 py-4 px-4 my-6 gap-4">
                <input type="text"
                    className="w-full text-white outline-none placeholder:text-[#6A7282] text-[12px] md:placeholder:text-[14px] placeholder:font-normal"
                    placeholder="댓글을 입력하세요" />
                <div className="relative w-4 h-4">
                    <Image
                        src={CommunitySearchBar}
                        alt="커뮤니티 검색바"
                        fill
                        sizes="w-8 h-8"
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}