import { PtDetailHistory, PtDetailQualification, PtfindTestImg } from "@/components/ui/image";
import { getPtDetail } from "@/service/ptzone.service";
import Link from "next/link";


type PtDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function PtDetailPage({ params }: PtDetailPageProps) {
    const { id } = await params;

    const response = await getPtDetail(id);
    return (
        <div className="flex flex-col gap-8 px-80 py-10">
            <div
                style={{
                    backgroundImage: `
                    linear-gradient(0deg, #000 0%, rgba(0,0,0,0.60) 50%, rgba(0,0,0,0.00) 100%),
                    url(${response.data.thumbnailUrl})
                `,
                }}
                className="
                h-100 
                flex flex-col justify-end 
                bg-cover bg-center bg-no-repeat bg-gray-300
                rounded-[14px]  
                p-6">
                <p className="text-[36px] font-black text-white"> {response.data.title} </p>
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <div className="text-[#BFFF0B] text-[20px]"> ★ </div>
                        <p className="text-[18px] font-extrabold text-white">
                            {response.data.averageRating}  <span className="text-[14px] font-normal text-[#99A1AF]">({response.data.reviewCount}개)</span>
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-[36px] font-black text-[#BFFF0B]"> {response.data.price.toLocaleString()}원</p>
                        <p className="text-[14px] font-normal text-[#99A1AF] text-right"> {response.data.totalSessionCount}회 </p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <button className="
                py-4 
                rounded-[14px] 
                bg-[#1E2939] text-[16px] font-extrabold text-white
                hover:text-black hover:bg-[#BFFF0B]
                "> 예약하기 </button>
                <button className="
                py-4 
                rounded-[14px] 
                bg-[#1E2939] text-[16px] font-extrabold text-white
                hover:text-black hover:bg-[#BFFF0B]
                "> 채팅하기 </button>
                <button className="
                py-4 
                rounded-[14px] 
                bg-[#1E2939] text-[16px] font-extrabold text-white
                hover:text-black hover:bg-[#BFFF0B]
                ">  전화하기 </button>
            </div>

            <div className="
            flex flex-col gap-5
            border border-[#364153] rounded-[14px]
            bg-[linear-gradient(176deg,_#101828_3.11%,_#1E2939_96.89%)]
            p-6
            ">
                <p className="text-[18px] font-extrabold text-white"> 강사 정보 </p>
                <div className="flex gap-4">
                    <div
                        style={{ backgroundImage: `url(${response.data.thumbnailUrl})` }}
                        className="bg-cover size-15 border border-[#BFFF0B] rounded-full">
                    </div>

                    <div className="flex flex-col flex-8 gap-2">
                        <p className="text-[18px] font-extrabold text-white"> {response.data.trainerName} 트레이너 </p>
                        <p className="text-[14px] font-normal text-[#99A1AF]"> {response.data.trainerSpec} </p>
                        <p className="text-[14px] font-normal text-[#D1D5DC]"> {response.data.trainerIntroduction} </p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-1 flex-col gap-2">
                        <div className="flex gap-2 items-center">
                            <img src={PtDetailQualification} alt="PT 상세조회 자격증" />
                            <p className="text-[14px] font-extrabold text-white"> 자격증 </p>
                        </div>
                        <p className="text-[12px] font-normal text-[#D1D5DC] flex gap-2"><span className="text-[#BFFF0B] text-[12px]">•</span> 생활체육지도사 2급 </p>
                        <p className="text-[12px] font-normal text-[#D1D5DC] flex gap-2"><span className="text-[#BFFF0B] text-[12px]">•</span>  NSCA-CPT </p>
                        <p className="text-[12px] font-normal text-[#D1D5DC] flex gap-2"><span className="text-[#BFFF0B] text-[12px]">•</span>  ACSM 인증 트레이너 </p>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <div className="flex gap-2 items-center">
                            <img src={PtDetailHistory} alt="PT 상세조회 대회경력" />
                            <p className="text-[14px] font-extrabold text-white"> 대회 경력 </p>
                        </div>
                        <p className="text-[12px] font-normal text-[#D1D5DC] flex gap-2"><span className="text-[#BFFF0B] text-[12px]">•</span>  2023 피지크 대회 입상 </p>
                        <p className="text-[12px] font-normal text-[#D1D5DC] flex gap-2"><span className="text-[#BFFF0B] text-[12px]">•</span>  보디빌딩 선수권 3위 </p>
                        <p className="text-[12px] font-normal text-[#D1D5DC] flex gap-2"><span className="text-[#BFFF0B] text-[12px]">•</span>  2024 체육인 대회 우승 </p>
                    </div>
                </div>
            </div>

            <div className="
            flex flex-col gap-5
            border border-[#364153] rounded-[14px]
            bg-[linear-gradient(176deg,_#101828_3.11%,_#1E2939_96.89%)]
            p-6
            ">
                <p className="text-[18px] font-extrabold text-white"> 강좌 소개 </p>
                <p className="text-[14px] font-normal text-[#D1D5DC]"> {response.data.description} </p>
            </div>

            <div className="
            flex flex-col gap-5
            border border-[#364153] rounded-[14px]
            bg-[linear-gradient(176deg,_#101828_3.11%,_#1E2939_96.89%)]
            p-6
            ">
                <p className="text-[18px] font-extrabold text-white"> 커리큘럼 </p>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3 items-start">
                        <p className="px-3 py-1.5 text-[14px] font-black text-black bg-[#BFFF0B] rounded-full flex items-center justify-centerc"> 1 </p>
                        <div className="flex flex-col gap-1">
                            <p className="text-[14px] font-extrabold text-white"> 기초 자세 교정 및 평가 </p>
                            <p className="text-[12px] font-normal text-[#99A1AF]"> 현재 체형 분석 및 목표 설정, 기초 체력 측정 </p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <p className="px-3 py-1.5 text-[14px] font-black text-black bg-[#BFFF0B] rounded-full"> 1 </p>
                        <div className="flex flex-col gap-1">
                            <p className="text-[14px] font-extrabold text-white"> 기초 자세 교정 및 평가 </p>
                            <p className="text-[12px] font-normal text-[#99A1AF]"> 현재 체형 분석 및 목표 설정, 기초 체력 측정 </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="
            flex flex-col gap-5
            border border-[#364153] rounded-[14px]
            bg-[linear-gradient(176deg,_#101828_3.11%,_#1E2939_96.89%)]
            p-6
            ">
                <p className="text-[18px] font-extrabold text-white"> 레슨 시간</p>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-4 items-center">
                        <p className="px-3 py-2 bg-[#BFFF0B1A] rounded-[10px] text-[14px] font-black text-[#BFFF0B]"> 월 </p>
                        <p className="text-[16px] font-extrabold text-white"> 월요일 </p>
                        <p className="flex gap-3 items-center border border-[#364153] rounded-[10px] bg-[#1E293980] px-4 py-2 text-[14px] font-normal text-white">
                            10:00 <span className="text-[16px] font-extrabold text-[#BFFF0B]"> → </span> 11:00
                        </p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className="px-3 py-2 bg-[#BFFF0B1A] rounded-[10px] text-[14px] font-black text-[#BFFF0B]"> 월 </p>
                        <p className="text-[16px] font-extrabold text-white"> 월요일 </p>
                        <p className="flex gap-3 items-center border border-[#364153] rounded-[10px] bg-[#1E293980] px-4 py-2 text-[14px] font-normal text-white">
                            10:00 <span className="text-[16px] font-extrabold text-[#BFFF0B]"> → </span> 11:00
                        </p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className="px-3 py-2 bg-[#BFFF0B1A] rounded-[10px] text-[14px] font-black text-[#BFFF0B]"> 월 </p>
                        <p className="text-[16px] font-extrabold text-white"> 월요일 </p>
                        <p className="flex gap-3 items-center border border-[#364153] rounded-[10px] bg-[#1E293980] px-4 py-2 text-[14px] font-normal text-white">
                            10:00 <span className="text-[16px] font-extrabold text-[#BFFF0B]"> → </span> 11:00
                        </p>
                    </div>
                </div>
            </div>

            <div className="
            flex flex-col
            border border-[#364153] rounded-[14px]
            bg-[linear-gradient(176deg,_#101828_3.11%,_#1E2939_96.89%)]
            p-6
            pb-0
            mb-20
            ">
                <p className="text-[18px] font-extrabold text-white"> 강사평 </p>
                <div>
                    <div className="flex flex-col gap-1 py-6 border-b border-b-[#364153]">
                        <div className="flex justify-between">
                            <p className="text-[14px] font-extrabold text-white"> 운동초보 </p>
                            <p className="text-[12px] font-normal text-[#6A7282]"> 2026-05-10 </p>
                        </div>
                        <div className="text-[#BFFF0B]">
                            ★★★☆☆
                        </div>
                        <div className="text-[12px] font-normal text-[#D1D5DC]">
                            정말 체계적으로 가르쳐주십니다. 3개월만에 몸이 확실히 달라졌어요! 친절하고 자세 교정을 정말 세심하게 해주셔서 부상 없이 운동할 수 있었습니다.
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 py-6 border-b border-b-[#364153]">
                        <div className="flex justify-between">
                            <p className="text-[14px] font-extrabold text-white"> 운동초보 </p>
                            <p className="text-[12px] font-normal text-[#6A7282]"> 2026-05-10 </p>
                        </div>
                        <div className="text-[#BFFF0B]">
                            ★★★☆☆
                        </div>
                        <div className="text-[12px] font-normal text-[#D1D5DC]">
                            정말 체계적으로 가르쳐주십니다. 3개월만에 몸이 확실히 달라졌어요! 친절하고 자세 교정을 정말 세심하게 해주셔서 부상 없이 운동할 수 있었습니다.
                        </div>
                    </div>
                </div>
                <Link href="/pt/1/reviews">
                    <p className="py-6 text-[16px] font-medium text-white text-center"> 전체 리뷰 보기 &nbsp; 〉</p>
                </Link>
            </div>
        </div>
    );
}