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
import Link from "next/link";


type PtDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function PtDetailPage({ params }: PtDetailPageProps) {
    const { id } = await params;

    const response = await getPtDetail(id);

    const trainerProfileId = response.data.trainer.trainerProfileId;

    if (!trainerProfileId) {
    throw new Error("트레이너 정보를 찾을 수 없습니다.");
    }

    const trainerInformation = await getTrainerProfileDetail(trainerProfileId);

    return (
        <div className="flex flex-col gap-8 px-80 py-10">
            <PtDetailInformation
                response={response.data}
                trainerInformation={trainerInformation.data}
            />

            <PtDetailButton 
                title={response.data.title}/>

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
    );
}