import { AdminSearchImg } from "@/components/ui/image";

export default function SearchBar() {
    return (
        <form
            className="rounded-md border-[#364153] w-full p-6 bg-gradient-to-br from-[#101828] to-[#1E2939] flex gap-4">
            <div
                className="flex items-center gap-3 bg-[#1E2939] border border-[#364153] rounded-md w-full p-3.5">
                <button><img src={AdminSearchImg} alt="검색" /></button>
                <input
                    className="font-normal text-[#6A7282] text-base focus:outline-0 w-full"
                    placeholder="검색어를 입력해주세요."
                    type="text"
                    name="search"
                />
            </div>
            <button type='button' className="px-4 py-3 text-[#99A1AF] rounded-md text-base font-medium w-23 bg-[#1E2939]"><img />필터</button>
        </form>
    );
}