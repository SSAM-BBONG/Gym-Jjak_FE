import { getTrainerReportDetailAction } from "@/feature/pt/actions";
import TrainerMarketReport from "@/feature/pt/components/TrainerMarketReport";
import Link from "next/link";

interface TrainerReportDetailPageProps {
  params: Promise<{
    trainerReportId: string;
  }>;
}

export default async function TrainerReportDetailPage({ params }: TrainerReportDetailPageProps) {
  const { trainerReportId } = await params;
  const reportId = Number(trainerReportId);

  if (!Number.isInteger(reportId) || reportId < 1) {
    return (
      <div className="px-40 py-10 text-[#99A1AF]">유효하지 않은 리포트입니다.</div>
    );
  }

  const result = await getTrainerReportDetailAction(reportId);

  if (!result.success) {
    return (
      <div className="flex flex-col gap-4 px-40 py-10">
        <p className="text-[20px] font-bold text-white">리포트를 불러올 수 없습니다.</p>
        <p className="text-[14px] text-[#99A1AF]">{result.message}</p>
        <Link href="/pt" className="text-[14px] font-bold text-[#BFFF0B]">
          PT ZONE으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <main className="px-40 py-10">
      <TrainerMarketReport data={result.data} />
    </main>
  );
}
