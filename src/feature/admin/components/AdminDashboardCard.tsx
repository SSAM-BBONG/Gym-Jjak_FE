import Image from "next/image";
import Link from "next/link";

interface DashboardCardProps {
    imgsrc: string,
    title: string,
    content: string,
    movecoment?: string,
    move?: string,
}

export default function AdminDashboardCard({ imgsrc, title, content, movecoment, move = '' }: DashboardCardProps) {
    return (
        <Link
            className="w-full"
            href={move}>
            <div className="
            flex flex-col gap-3
            w-full
            border border-[#36415380] rounded-[10px]
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            p-6 ">
                <div className="flex items-center gap-2">
                    <div className="relative w-7 h-7">
                        <Image
                            src={imgsrc}
                            alt="PT 상세조회 대회경력"
                            fill
                            priority
                            sizes="w-20 h-20"
                            className="object-cover"
                        />
                    </div>
                    <p className="text-[24px] font-black text-white"> {title} </p>
                </div>
                <p className="text-[24px] font-bold text-[#D1D5DC] self-end"> {content} </p>
            </div>
        </Link>
    );
}