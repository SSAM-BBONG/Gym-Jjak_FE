import { CommonLocation, MypageOrganization, PtfindStar, PtfindTestImg } from "@/components/ui/image";
import { PtCourseListData } from "../type";
import Link from "next/link";
import Image from "next/image";

interface PtFindCardProps {
  response: PtCourseListData;
}


export default function PtFindCard({ response }: PtFindCardProps) {
    return (
        <div className="
        flex w-full flex-col
        shrink-0
        overflow-hidden
        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
        border border-[#36415380] rounded-[14px]
        ">  
            <Link 
                data-testid="pt-card-link"
                href={`/pt/${response.ptCourseId}`}>
            <div>
                <div className="relative h-56 w-full overflow-hidden sm:h-64 md:h-72 lg:h-56 xl:h-64 2xl:h-80">
                    <Image
                        src={response.thumbnailUrl}
                        alt={`${response.title} 썸네일`}
                        fill
                        sizes="320px"
                        className="object-cover"
                    />
                </div>    
            </div>
            <div className="flex flex-col gap-2 p-4 sm:gap-3 sm:p-5 lg:gap-2 lg:p-4 xl:gap-3 xl:p-5">
                <p className="text-[18px] text-white font-extrabold sm:text-[20px] lg:text-[18px] xl:text-[20px]"> {response.title} </p>
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
                    <Image
                        src={PtfindStar}
                        alt="PT 카드 별점"
                        width={15}
                        height={15}    
                    />
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