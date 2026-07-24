import { getTrainerReportListAction } from "@/feature/pt/actions";
import TrainerMarketReportList from "@/feature/pt/components/TrainerMarketReportList";
import Link from "next/link";

interface TrainerReportListPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function TrainerReportListPage({ searchParams }: TrainerReportListPageProps) {
  const { page: pageParam } = await searchParams;
  const parsedPage = Number(pageParam);
  const page = Number.isInteger(parsedPage) && parsedPage >= 0 ? parsedPage : 0;
  const result = await getTrainerReportListAction(page, 20);

  return (
    <main className="flex flex-col gap-6 px-40 py-10">
      <header>
        <p className="text-[14px] font-bold text-[#BFFF0B]">AI 비서 · 데이터 기반 인사이트</p>
        <h1 className="mt-1 text-[36px] font-black text-white">트레이너 리포트</h1>
        <p className="mt-2 text-[14px] text-[#99A1AF]">월별 시장 동향과 PT 상품 운영 인사이트를 확인하세요.</p>
      </header>

      {result.success ? (
        <TrainerMarketReportList data={result.data} page={page} />
      ) : (
        <section className="rounded-[16px] border border-[#364153] bg-[#101828] p-6">
          <p className="text-[18px] font-bold text-white">리포트 목록을 불러올 수 없습니다.</p>
          <p className="mt-2 text-[14px] text-[#99A1AF]">{result.message}</p>
          <Link href="/pt" className="mt-4 inline-block text-[14px] font-bold text-[#BFFF0B]">PT ZONE으로 돌아가기</Link>
        </section>
      )}
    </main>
  );
}
