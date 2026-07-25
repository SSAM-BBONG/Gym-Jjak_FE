import { getMyTrainerApplicationListAction } from "@/feature/pt/actions";
import { TrainerApplicationStatus } from "@/feature/pt/type";
import Link from "next/link";

interface PtTrainerRegistPageProps {
  searchParams: Promise<{ page?: string }>;
}

const statusLabel: Record<TrainerApplicationStatus, string> = {
  PENDING: "대기중",
  APPROVED: "승인됨",
  REJECTED: "반려됨",
  CANCELED: "취소됨",
};

export default async function PtTrainerRegistPage({ searchParams }: PtTrainerRegistPageProps) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam ?? "0");
  const currentPage = Number.isInteger(page) && page >= 0 ? page : 0;
  const result = await getMyTrainerApplicationListAction(currentPage);

  if (!result.success) {
    throw new Error(result.message);
  }

  const { content, hasNext } = result.data;

  return (
    <div className="flex flex-col px-2.5 py-6 sm:px-2.5 md:px-40 md:py-8 lg:px-80 lg:py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white md:text-3xl lg:text-[36px]">트레이너 신청 현황</h1>
          <p className="text-xs font-normal text-[#99A1AF] md:text-sm lg:text-[14px]">신청한 헬스장별 상태를 확인하세요.</p>
        </div>
        <Link
          href="/pt/trainer-apply/regist"
          className="rounded-[10px] bg-[#BFFF0B] px-3 py-2 text-sm font-extrabold text-black md:px-4 md:py-3 md:text-base lg:px-4 lg:py-3 lg:text-[16px]"
        >
          신청하기
        </Link>
      </div>

      {content.length === 0 ? (
        <div className="mt-4 rounded-xl border border-[#36415380] bg-[#101828] px-4 py-10 text-center text-sm text-[#99A1AF] md:mt-5 md:rounded-2xl md:px-6 md:py-12 md:text-base lg:mt-6 lg:rounded-[16px] lg:px-8 lg:py-16 lg:text-[16px]">
          트레이너 신청 목록이 없습니다.
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-3 md:mt-5 md:gap-4 lg:mt-6 lg:gap-4">
          {content.map((application) => (
            <Link
              key={application.trainerApplicationId}
              href={`/pt/trainer-apply/${application.trainerApplicationId}`}
              className="rounded-xl border border-[#36415380] bg-[linear-gradient(135deg,rgba(16,24,40,0.90)_0%,rgba(30,41,57,0.90)_100%)] p-4 transition-colors hover:border-[#BFFF0B] md:rounded-2xl md:p-5 lg:rounded-[16px] lg:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-base font-extrabold text-white md:text-lg lg:text-[20px]">{application.organizationName}</p>
                  <p className="mt-1 text-xs text-[#99A1AF] md:mt-2 md:text-sm lg:text-[14px]">신청일: {application.createdAt.slice(0, 10)}</p>
                </div>
                <span className="rounded-full bg-[#364153] px-2 py-1 text-xs font-bold text-white md:px-3 md:text-sm lg:px-3 lg:text-[14px]">
                  {statusLabel[application.status]}
                </span>
              </div>
              {application.rejectReason && (
                <p className="mt-3 text-xs text-[#FF9A9C] md:mt-4 md:text-sm lg:mt-4 lg:text-[14px]">반려 사유: {application.rejectReason}</p>
              )}
            </Link>
          ))}

          <div className="flex justify-center gap-3 pt-2">
            {currentPage > 0 && (
              <Link href={`/pt/trainer-apply?page=${currentPage - 1}`} className="rounded-[10px] bg-[#364153] px-4 py-2 text-white">
                이전
              </Link>
            )}
            {hasNext && (
              <Link href={`/pt/trainer-apply?page=${currentPage + 1}`} className="rounded-[10px] bg-[#364153] px-4 py-2 text-white">
                다음
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
