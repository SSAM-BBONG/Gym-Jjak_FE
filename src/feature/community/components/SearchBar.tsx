import { CommunitySearchBar } from "@/components/ui/image";

export default function CommuSearchBar() {
    return (
        <div className="flex gap-2 mt-6">
            <div className="flex flex-1 items-center rounded-[10px] border-[#364153] bg-[#101828] px-[16px] py-[16px] gap-4">
            <img src={CommunitySearchBar} alt="커뮤니티 검색바"/>
            <input type="text" 
            className="flex-1 text-white outline-none placeholder:text-[#6A7282] placeholder:text-[14px] placeholder:font-normal" 
            placeholder="검색어를 입력하세요"/>
            </div>
            <select className="bg-[#101828] text-white px-4 py-2 rounded-[10px] hover:cursor-pointer">
                <option> 최신순 </option>
                <option> 조회순 </option>
                <option> 인기순 </option>
            </select>
        </div>
    );
}