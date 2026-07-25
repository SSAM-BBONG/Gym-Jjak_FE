'use client'

export default function CommuWriteButton() {
    return (
        <button className="
            bg-[#BFFF0B]
            rounded-[5px] md:rounded-[10px]
            text-[12px]
            md:text-[16px] text-black 
            flex items-center justify-center font-semibold md:font-extrabold px-5 py-2
            transition-colors hover:cursor-pointer hover:bg-[#BFFF0B99] hover:text-black"
        >
            + 글쓰기
        </button>
    );
}
