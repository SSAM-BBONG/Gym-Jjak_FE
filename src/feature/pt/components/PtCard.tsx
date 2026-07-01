import Link from "next/link";

interface PtCardProps {
    imgsrc : string,
    title : string,
    content : string,
    movecoment : string,
    move : string,
    testId?: string;
}

export default function PtCard({imgsrc, title, content, movecoment, move, testId}: PtCardProps) {
    return (
        <Link 
        data-testid={testId}
        href={move}>
        <div className="
        flex flex-col gap-3 
        items-start
        border border-[#36415380] rounded-[16px]
        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
        hover:border-[#BFFF0B66] hover:bg-[linear-gradient(135deg,rgba(191,255,11,0.20)0%,rgba(168,230,0,0.10)100%)]
        p-6 ">
            <img src={imgsrc} alt="PT ZONE 카드 이미지"/>
            <p className="text-[24px] font-black text-white"> {title} </p>
            <p className="text-[14px] font-normal text-[#D1D5DC]"> {content} </p>
            <p className="text-[14px] font-extrabold text-[#99A1AF] hover:text-[#BFFF0B]"> {movecoment} → </p>
        </div>
        </Link>
    );
}