export default function SearchBar() {
    return (
        <form
            className="rounded-md border-[#364153] w-full p-6 bg-[#1E2939] flex">
            <div
                className="bg-[#1E2939] border-1 border-[#364153] rounded-md w-full p-3.5">
                <button><img /></button>
                <input
                    className="font-normal text-[#6A7282] text-base"
                    placeholder="검색어를 입력해주세요."
                    type="text"
                    name="search"
                />
            </div>
            <button type='button' className="px-4 py-3 text-[#99A1AF] text-base font-medium w-23 bg-[#1E2939]"><img />필터</button>
        </form>
    );
}