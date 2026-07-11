'use client'

export default function CommuWriteButton() {
    return (
        <button className="
            bg-[#BFFF0B]
            rounded-[5px] md:rounded-[10px]
            text-[12px]
            md:text-[16px] text-black 
            flex items-center justify-center font-semibold md:font-extrabold px-5 py-2
            hover:cursor-pointer"
        >
            + 글쓰기
        </button>
    );
}