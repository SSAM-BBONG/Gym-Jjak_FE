import Link from "next/link";
import { TrainerReportListData } from "../type";

interface TrainerMarketReportListProps {
  data: TrainerReportListData;
  page: number;
}

const formatTargetMonth = (targetMonth: string) => {
  const [, month] = targetMonth.split("-");

  return `${Number(month)}월 트레이너 리포트`;
};

export default function TrainerMarketReportList({ data, page }: TrainerMarketReportListProps) {
  if (data.items.length === 0) {
    return <p className="rounded-[16px] border border-[#364153] bg-[#101828] p-6 text-[14px] text-[#99A1AF]">생성된 트레이너 리포트가 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-3">
        {data.items.map((report) => (
          <li key={report.trainerReportId}>
            <Link
              href={`/pt/reports/${report.trainerReportId}`}
              className="flex items-center justify-between rounded-[14px] border border-[#364153] bg-[#101828] px-6 py-5 hover:border-[#BFFF0B66]"
            >
              <p className="text-[18px] font-bold text-white">{formatTargetMonth(report.targetMonth)}</p>
              <span className="text-[14px] font-bold text-[#BFFF0B]">상세 보기 →</span>
            </Link>
          </li>
        ))}
      </ul>

      <nav aria-label="트레이너 리포트 페이지" className="flex justify-center gap-3">
        {page > 0 ? (
          <Link href={`/pt/reports?page=${page - 1}`} className="rounded-[8px] border border-[#364153] px-4 py-2 text-[14px] text-white">
            이전
          </Link>
        ) : (
          <span className="rounded-[8px] border border-[#364153] px-4 py-2 text-[14px] text-[#6A7282]">이전</span>
        )}
        {data.hasNext && (
          <Link href={`/pt/reports?page=${page + 1}`} className="rounded-[8px] bg-[#BFFF0B] px-4 py-2 text-[14px] font-bold text-black">
            다음
          </Link>
        )}
      </nav>
    </div>
  );
}
