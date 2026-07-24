import { PtDetailQualification } from "@/components/ui/image";
import { getTrainerReviewListAction, getTrainerReviewSummaryAction } from "@/feature/pt/actions";
import TrainerReviewCard from "@/feature/pt/components/TrainerReviewCard";
import { getTrainerProfileDetail } from "@/service/mypage.service";
import { getPublicPtDetail } from "@/service/ptzone.service";
import Image from "next/image";
import Link from "next/link";

interface TrainerReviewPageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ sort?: string }>;
}

export default async function TrainerReviewPage({ params, searchParams }: TrainerReviewPageProps) {
    const { id } = await params;
    const { sort: sortParam } = await searchParams;
    const sort = sortParam === "HIGH_RATING" ? "HIGH_RATING" : "LATEST";
    const ptCourse = await getPublicPtDetail(id);
    const trainerProfileId = ptCourse.data.trainerProfileId;
    const trainerInformation = await getTrainerProfileDetail(trainerProfileId);
    const result = await getTrainerReviewListAction(trainerProfileId, { sort });
    const summaryResult = await getTrainerReviewSummaryAction(trainerProfileId);

    return (
        <div className="flex flex-col gap-5 px-4 py-6 sm:px-6 md:gap-6 md:px-12 md:py-8 lg:px-60 lg:py-10">
            <div className="
            flex gap-4 md:gap-5 lg:gap-6
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
             border border-[#36415380] rounded-[16px]
             p-4 sm:p-6 lg:p-8">
                <div
                    style={{ backgroundImage: `url(${trainerInformation.data.profileImageUrl})` }}
                    className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 border border-[#BFFF0B] rounded-full bg-cover"></div>
                <div className="flex flex-col gap-2">
                    <p className="text-[20px] md:text-[24px] lg:text-[30px] font-black text-white"> {trainerInformation.data.trainerName} 트레이너</p>
                    <p className="text-[12px] md:text-[14px] lg:text-[16px] font-normal text-[#99A1AF]"> {trainerInformation.data.introduction} </p>
                    <div className="flex gap-2 items-center">
                        <div className="relative w-3 h-3 md:w-4 md:h-4">
                            <Image
                                src={PtDetailQualification}
                                alt="트레이너평 상세조회 자격증"
                                fill
                                sizes="w-8 h-8"
                                className="object-cover"
                            />
                        </div>
                        {trainerInformation.data.certifications.map((certification) => (
                            <p
                                key={certification.trainerCertificationId}
                                className="px-2 py-1 lg:px-3 rounded-full bg-[#1E2939] text-[10px] md:text-[11px] lg:text-[12px] font-normal text-[#D1D5DC] whitespace-nowrap"
                            >
                                {certification.name}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="
            flex flex-col gap-4 md:gap-5
            bg-[#101828]
            border border-[#36415380] rounded-[16px]
            p-4 sm:p-6 lg:p-8">
                <p className="text-[16px] md:text-[18px] lg:text-[20px] font-extrabold text-white"> 강사 평가</p>
                {summaryResult.success === false ? (
                    <p className="text-[#FF6467]">{summaryResult.message}</p>
                ) : (
                    <>
                        <div className="flex items-start">
                            <div className="flex flex-1 flex-col gap-1">
                                <p className="justify-self-start text-[40px] md:text-[48px] lg:text-[55px] font-black text-[#BFFF0B]">
                                    {summaryResult.data.averageRating.toFixed(1)}<span className="text-[18px] md:text-[20px] lg:text-[24px] font-normal text-[#99A1AF]">/5</span>
                                </p>
                                <p className="text-[20px] md:text-[22px] lg:text-[24px] text-[#BFFF0B]">
                                    {"★".repeat(Math.round(summaryResult.data.averageRating))}{"☆".repeat(5 - Math.round(summaryResult.data.averageRating))}
                                </p>
                                <p className="text-[12px] md:text-[14px] lg:text-[16px] font-normal text-[#99A1AF]"> 총 {summaryResult.data.reviewCount}개의 리뷰 </p>
                            </div>
                            <div className="flex flex-1 flex-col gap-2">
                                {[5, 4, 3, 2, 1].map((rating) => {
                                    const count = summaryResult.data.ratingDistribution[String(rating) as "1" | "2" | "3" | "4" | "5"];
                                    const width = summaryResult.data.reviewCount > 0
                                        ? Math.min(100, (count / summaryResult.data.reviewCount) * 100)
                                        : 0;

                                    return (
                                        <div key={rating} className="flex items-center justify-between">
                                            <p className="flex-1 text-[10px] md:text-[12px] lg:text-[14px] font-normal text-[#99A1AF]"> {rating}★ </p>
                                            <div className="h-2 flex-[3] rounded-full bg-[#1E2939]">
                                                <div
                                                    className="h-2 rounded-full bg-[#BFFF0B]"
                                                    style={{ width: `${width}%` }}
                                                />
                                            </div>
                                            <p className="flex-1 text-right text-[10px] md:text-[12px] lg:text-[14px] font-normal text-[#99A1AF]"> {count}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
                <div className="flex justify-between items-center">
                    <p className="text-[16px] md:text-[17px] lg:text-[18px] font-extrabold text-white"> 강사평 목록 </p>
                    <div className="flex gap-2">
                        <Link
                            href={`/pt/${id}/reviews?sort=LATEST`}
                            className={`px-3 py-2 lg:px-4 rounded-[10px] text-[12px] md:text-[13px] lg:text-[14px] ${sort === "LATEST" ? "bg-[#BFFF0B] font-extrabold text-black" : "bg-[#1E2939] font-medium text-[#99A1AF]"}`}
                        >
                            최신순
                        </Link>
                        <Link
                            href={`/pt/${id}/reviews?sort=HIGH_RATING`}
                            className={`px-3 py-2 lg:px-4 rounded-[10px] text-[12px] md:text-[13px] lg:text-[14px] ${sort === "HIGH_RATING" ? "bg-[#BFFF0B] font-extrabold text-black" : "bg-[#1E2939] font-medium text-[#99A1AF]"}`}
                        >
                            별점높은순
                        </Link>
                    </div>
                </div>

                {result.success === false ? (
                    <p className="text-[#FF6467]">{result.message}</p>
                ) : result.data.reviews.length === 0 ? (
                    <p className="text-[#99A1AF]">등록된 수강평이 없습니다.</p>
                ) : (
                    result.data.reviews.map((review) => (
                        <TrainerReviewCard
                            key={review.trainerReviewId}
                            review={review}
                            ptCourseId={id}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
