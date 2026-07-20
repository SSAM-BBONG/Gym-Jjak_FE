import { TrainerApplicationPending } from "@/feature/pt/components/TrainerApplicationPending";
import { TrainerEssentialQulificationIcon, TrainerProfileImgDefault } from "@/components/ui/image";
import { getMyTrainerApplicationDetail } from "@/service/ptzone.service";

interface TrainerApplicationDetailPageProps {
  params: Promise<{ trainerApplicationId: string }>;
}

export default async function TrainerApplicationDetailPage({ params }: TrainerApplicationDetailPageProps) {
  const { trainerApplicationId: trainerApplicationIdParam } = await params;
  const trainerApplicationId = Number(trainerApplicationIdParam);
  const result = await getMyTrainerApplicationDetail(trainerApplicationId);
  const application = result.data;

  return (
    <div className="flex flex-col px-80 py-10">
      <h1 className="text-[36px] font-black text-white">트레이너 신청 상세</h1>
      <p className="text-[14px] font-normal text-[#99A1AF]">신청 내용을 확인하거나 수정 및 취소할 수 있습니다.</p>

      <div className="mt-6 flex flex-col gap-6">
        <TrainerApplicationPending
          trainerApplicationData={application}
          editHref={`/pt/trainer-apply/${application.trainerApplicationId}/edit`}
        />

        <section className="rounded-[16px] border border-[#36415380] bg-[#101828] p-8">
          <h2 className="text-[20px] font-extrabold text-white">프로필 정보</h2>
          <img
            className="mt-4 size-30 rounded-full border-[3px] border-[#BFFF0B] object-cover"
            src={application.profileImageUrl ?? TrainerProfileImgDefault}
            alt="트레이너 프로필 사진"
          />
        </section>

        <section className="rounded-[16px] border border-[#36415380] bg-[#101828] p-8">
          <h2 className="text-[20px] font-extrabold text-white">필수 자격증</h2>
          <div className="mt-4 flex items-center gap-2 rounded-[10px] border border-[#364153] bg-[#1E293980] px-3 py-2">
            <img src={TrainerEssentialQulificationIcon} alt="자격증 파일" />
            <p className="text-[12px] font-medium text-[#99A1AF]">{application.certificateOriginalName}</p>
          </div>
        </section>

        <ApplicationTextList title="자격증" values={application.qualifications} />
        <ApplicationTextList title="대회 경력" values={application.awardHistories} />

        <section className="rounded-[16px] border border-[#36415380] bg-[#101828] p-8">
          <h2 className="text-[20px] font-extrabold text-white">자기소개</h2>
          <p className="mt-4 whitespace-pre-wrap text-[16px] text-[#D1D5DC]">{application.introduction}</p>
        </section>
      </div>
    </div>
  );
}

function ApplicationTextList({ title, values }: { title: string; values: string[] }) {
  return (
    <section className="rounded-[16px] border border-[#36415380] bg-[#101828] p-8">
      <h2 className="text-[20px] font-extrabold text-white">{title}</h2>
      <div className="mt-4 flex flex-col gap-2">
        {values.length === 0 ? (
          <p className="text-[16px] text-[#99A1AF]">등록된 정보가 없습니다.</p>
        ) : (
          values.map((value) => (
            <p key={value} className="text-[16px] text-[#D1D5DC]"><span className="mr-2 font-black text-[#BFFF0B]">•</span>{value}</p>
          ))
        )}
      </div>
    </section>
  );
}
