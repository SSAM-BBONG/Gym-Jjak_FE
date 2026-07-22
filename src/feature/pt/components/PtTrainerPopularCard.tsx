import { PtfindTestImg } from "@/components/ui/image";
import Image from "next/image";
import { PtPopularCourseData, TrainerPtDashboardCourse } from "../type";

interface PtPopularCardProps {
    data : TrainerPtDashboardCourse;
}

export default function PtTrainerPopularCard({ data }: PtPopularCardProps) {
    return (
        <div className="
        relative
        flex flex-col
        border border-[#1E2939] rounded-[14px]
        bg-[#101828]
        overflow-hidden
        cursor-pointer
        ">
            <div className="relative w-80 h-40">
                <Image
                    src={data.thumbnailUrl || PtfindTestImg }
                    alt="PT ZONE 인기강습 이미지"
                    fill
                    priority
                    sizes="w-160 h-80"
                    className="object-cover"
                />
            </div>
            <p className="absolute top-2 left-2 text-[12px] font-extrabold text-black p-1 rounded-[4px] bg-[#BFFF0B]"> 수강생 수 : {data.currentStudentCount} </p>
            <div className="flex flex-col p-4">
                <p className="text-[18px] font-extrabold text-white"> {data.title}</p>
                <p className="text-[12px] font-normal text-[#99A1AF]"> {data.trainerName} </p>
                <div className="flex justify-between">
                    <p className="text-[12px] font-normal text-[#6A7282]"> {data.organizationName} </p>
                    <p className="text-[14px] font-extrabold text-[#BFFF0B]"> {data.price.toLocaleString()}원 </p>
                </div>
            </div>
        </div>
    );
}