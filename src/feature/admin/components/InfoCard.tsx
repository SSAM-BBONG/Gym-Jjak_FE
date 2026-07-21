'use client'

export default function InfoCard({ content, href = '' }: { content: string, href?: string }) {
    return (
        < div
            className="h-14 flex items-center gap-4 border-[#364153] border w-full p-4 mt-2 bg-[#1E2939] rounded-md text-[#D1D5DC] text-base font-normal"
        >
            <div className="bg-[#BFFF0B] w-2 h-2 rounded-full"></div>
            <p>{content}</p>
            {href && <a target="_blank" rel="noopener noreferrer" href={href} className="px-3 md:px-4.5 py-1.5 md:py-2 text-black bg-[#BFFF0B] rounded-md font-bold text-[10px] md:text-sm lg:text-base ml-auto">자격증 보기</a>}
        </div>
    );
}