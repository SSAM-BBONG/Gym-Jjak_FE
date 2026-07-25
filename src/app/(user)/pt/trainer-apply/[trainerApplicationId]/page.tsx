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
    <div className="flex flex-col px-2.5 py-6 sm:px-2.5 md:px-40 md:py-8 lg:px-80 lg:py-10">
      <h1 className="text-2xl font-black text-white md:text-3xl lg:text-[36px]">트레이너 신청 상세</h1>
      <p className="text-xs font-normal text-[#99A1AF] md:text-sm lg:text-[14px]">신청 내용을 확인하거나 수정 및 취소할 수 있습니다.</p>

      <div className="mt-4 flex flex-col gap-4 md:mt-5 md:gap-5 lg:mt-6 lg:gap-6">
        <TrainerApplicationPending
          trainerApplicationData={application}
          editHref={`/pt/trainer-apply/${application.trainerApplicationId}/edit`}
        />

        <section className="rounded-xl border border-[#36415380] bg-[#101828] p-4 md:rounded-2xl md:p-6 lg:rounded-[16px] lg:p-8">
          <h2 className="text-base font-extrabold text-white md:text-lg lg:text-[20px]">프로필 정보</h2>
          <img
            className="mt-3 h-20 w-20 rounded-full border-[3px] border-[#BFFF0B] object-cover md:mt-4 md:h-24 md:w-24 lg:mt-4 lg:h-30 lg:w-30"
            src={application.profileImageUrl ?? TrainerProfileImgDefault}
            alt="트레이너 프로필 사진"
          />
        </section>

        <section className="rounded-xl border border-[#36415380] bg-[#101828] p-4 md:rounded-2xl md:p-6 lg:rounded-[16px] lg:p-8">
          <h2 className="text-base font-extrabold text-white md:text-lg lg:text-[20px]">필수 자격증</h2>
          <div className="mt-3 flex items-center gap-2 rounded-[10px] border border-[#364153] bg-[#1E293980] px-3 py-2 md:mt-4 lg:mt-4">
            <img src={TrainerEssentialQulificationIcon} alt="자격증 파일" />
            <p className="text-xs font-medium text-[#99A1AF] md:text-sm lg:text-[12px]">{application.certificateOriginalName}</p>
          </div>
        </section>

        <ApplicationTextList title="자격증" values={application.qualifications} />
        <ApplicationTextList title="대회 경력" values={application.awardHistories} />

        <section className="rounded-xl border border-[#36415380] bg-[#101828] p-4 md:rounded-2xl md:p-6 lg:rounded-[16px] lg:p-8">
          <h2 className="text-base font-extrabold text-white md:text-lg lg:text-[20px]">자기소개</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm text-[#D1D5DC] md:mt-4 md:text-base lg:mt-4 lg:text-[16px]">{application.introduction}</p>
        </section>
      </div>
    </div>
  );
}

function ApplicationTextList({ title, values }: { title: string; values: string[] }) {
  return (
    <section className="rounded-xl border border-[#36415380] bg-[#101828] p-4 md:rounded-2xl md:p-6 lg:rounded-[16px] lg:p-8">
      <h2 className="text-base font-extrabold text-white md:text-lg lg:text-[20px]">{title}</h2>
      <div className="mt-3 flex flex-col gap-2 md:mt-4 lg:mt-4">
        {values.length === 0 ? (
          <p className="text-sm text-[#99A1AF] md:text-base lg:text-[16px]">등록된 정보가 없습니다.</p>
        ) : (
          values.map((value) => (
            <p key={value} className="text-sm text-[#D1D5DC] md:text-base lg:text-[16px]"><span className="mr-2 font-black text-[#BFFF0B]">•</span>{value}</p>
          ))
        )}
      </div>
    </section>
  );
}
