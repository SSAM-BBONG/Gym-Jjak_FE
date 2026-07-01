import { PtDetailHistory, PtDetailQualification, PtfindTestImg } from "@/components/ui/image";
import PtDetailButton from "@/feature/pt/components/PtDetailButton";
import PtDetailCurriculums from "@/feature/pt/components/PtDetailCurriculums";
import PtDetailInformation from "@/feature/pt/components/PtDetailInformation";
import PtDetailPtIntroduce from "@/feature/pt/components/PtDetailPtIntroduce";
import PtDetailReviews from "@/feature/pt/components/PtDetailReviews";
import PtDetailSchedule from "@/feature/pt/components/PtDetailSchedules";
import PtDetailTrainer from "@/feature/pt/components/PtDetailTrainer";
import { getTrainerProfileDetail } from "@/service/mypage.service";
import { getPtDetail } from "@/service/ptzone.service";
import { Metadata } from "next";
import Link from "next/link";


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {

    const { id } = await params;

    const response = await getPtDetail(id);

    const trainerProfileId = response.data.trainerProfileId;
    const trainerInformation = await getTrainerProfileDetail(trainerProfileId);
    const keywords = response.data.curriculums.map((curri) => curri.title)



    if (!response) {
        return {
            title: '피티 찾을 수 없습니다.'// 메타데이터 반환
        }
    }
    return {
        title: response.data.title,
        description: response.data.description,
        authors: [{ name: trainerInformation.data.trainerName }],
        keywords: keywords,
        openGraph: {
            type: 'article',
            title: response.data.title,
            description: response.data.description,
            images: [
                {
                    url: response.data.thumbnailUrl,
                    width: 1200,
                    height: 630,
                    alt: response.data.title
                }
            ]
        }
    }
}


type PtDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function PtDetailPage({ params }: PtDetailPageProps) {
    const { id } = await params;

    const response = await getPtDetail(id);
    console.log(response);
    const trainerProfileId = response.data.trainerProfileId;

    if (!trainerProfileId) {
        throw new Error("트레이너 정보를 찾을 수 없습니다.");
    }

    const trainerInformation = await getTrainerProfileDetail(trainerProfileId);


    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",

        name: response.data.title,
        description: response.data.description,
        image: [response.data.thumbnailUrl],
        category: response.data.curriculums,
        sku: `PT-${response.data.ptCourseId}`,

        offers: {
            "@type": "Offer",
            url: `https://13.124.200.97.sslip.io/pt/${response.data.ptCourseId}`,
            priceCurrency: "KRW",
            price: response.data.price.toString(),
            seller: {
                "@type": "Organization",
                name: trainerInformation.data.trainerName,
            },
        },

        ...(trainerInformation.data.reviewCount > 0 &&
            trainerInformation.data.averageRating > 0 && {
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: trainerInformation.data.averageRating.toString(),
                reviewCount: trainerInformation.data.reviewCount.toString(),
                bestRating: "5",
                worstRating: "0",
            },
        }),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="flex flex-col gap-8 px-80 py-10">
                <PtDetailInformation
                    response={response.data}
                    trainerInformation={trainerInformation.data}
                />

                <PtDetailButton
                    ptCourseId={response.data.ptCourseId}
                    title={response.data.title} />

                <PtDetailTrainer
                    data={trainerInformation.data}
                />

                <PtDetailPtIntroduce
                    data={response.data}
                />

                <PtDetailCurriculums
                    data={response.data}
                />

                <PtDetailSchedule
                    data={response.data}
                />

                <PtDetailReviews
                    data={response.data}
                />
            </div>
        </>
    );
}