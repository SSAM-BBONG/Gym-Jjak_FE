import { CommonLocation, MypageOrganization, PtfindStar, PtfindTestImg } from "@/components/ui/image";
import { PtCourseListData } from "../type";
import Link from "next/link";
import Image from "next/image";

interface PtFindCardProps {
  response: PtCourseListData;
}


export default function PtFindCard({ response }: PtFindCardProps) {
    console.log(response);
    return (
        <div className="
        flex flex-col
        shrink-0
        overflow-hidden
        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
        border border-[#36415380] rounded-[14px]
        ">  
            <Link href={`/pt/${response.ptCourseId}`}>
            <div 
                className="w-full h-40 object-cover"
                style={{ backgroundImage: `url(${PtfindTestImg})` }} >

            </div>
            <div className="flex flex-col gap-3 p-5">
                <p className="text-[20px] text-white font-extrabold"> {response.title} </p>
                <p className="text-[14px] text-[#D1D5DC] font-medium"> {response.trainerName} </p>
                <div className="flex gap-2 items-center text-[14px] font-normal text-[#99A1AF]">
                    <Image 
                        src={MypageOrganization} 
                        alt="PT 카드 지점"
                        width={15}
                        height={15}/>
                    {response.businessName}
                </div>
                <div className="flex gap-2 items-center">
                    <img src={CommonLocation} alt="PT 카드 위치"/>
                    <p className="text-[14px] font-normal text-[#99A1AF]"> {response.roadAddress } </p>
                </div>
                <div className="flex gap-2 items-center text-[14px]">
                    <img src={PtfindStar} alt="PT 카드 별점"/>
                    <p className="font-extrabold text-[#BFFF0B]"> 
                        {response.averageRating}<span className="text-[#6A7282] font-normal">({response.reviewCount}개의 리뷰)</span> </p>
                </div>
                <hr className="border border-[#36415380]"/>
                <p className="text-[14px] font-normal text-[#99A1AF]"> <span className="text-[24px] font-black text-[#BFFF0B]">{response.price.toLocaleString()}</span>원 </p>
            </div>
            </Link>
        </div>
    );
}