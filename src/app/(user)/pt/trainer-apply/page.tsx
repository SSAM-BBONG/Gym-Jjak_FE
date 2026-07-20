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
    <div className="flex flex-col px-80 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-[36px] font-black text-white">트레이너 신청 현황</h1>
          <p className="text-[14px] font-normal text-[#99A1AF]">신청한 헬스장별 상태를 확인하세요.</p>
        </div>
        <Link
          href="/pt/trainer-apply/regist"
          className="rounded-[10px] bg-[#BFFF0B] px-4 py-3 text-[16px] font-extrabold text-black"
        >
          신청하기
        </Link>
      </div>

      {content.length === 0 ? (
        <div className="mt-6 rounded-[16px] border border-[#36415380] bg-[#101828] px-8 py-16 text-center text-[16px] text-[#99A1AF]">
          트레이너 신청 목록이 없습니다.
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {content.map((application) => (
            <Link
              key={application.trainerApplicationId}
              href={`/pt/trainer-apply/${application.trainerApplicationId}`}
              className="rounded-[16px] border border-[#36415380] bg-[linear-gradient(135deg,rgba(16,24,40,0.90)_0%,rgba(30,41,57,0.90)_100%)] p-6 transition-colors hover:border-[#BFFF0B]"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[20px] font-extrabold text-white">{application.organizationName}</p>
                  <p className="mt-2 text-[14px] text-[#99A1AF]">신청일: {application.createdAt.slice(0, 10)}</p>
                </div>
                <span className="rounded-full bg-[#364153] px-3 py-1 text-[14px] font-bold text-white">
                  {statusLabel[application.status]}
                </span>
              </div>
              {application.rejectReason && (
                <p className="mt-4 text-[14px] text-[#FF9A9C]">반려 사유: {application.rejectReason}</p>
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
