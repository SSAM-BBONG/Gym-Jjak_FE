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
    <main className="flex flex-col gap-4 px-4 py-5 sm:gap-5 sm:px-10 md:px-25 md:py-8 lg:gap-6 lg:px-40 lg:py-10">
      <header>
        <p className="text-[12px] font-bold text-[#BFFF0B] md:text-[14px]">AI 비서 · 데이터 기반 인사이트</p>
        <h1 className="mt-1 text-2xl font-black text-white sm:text-3xl lg:text-[36px]">트레이너 리포트</h1>
        <p className="mt-2 text-[12px] text-[#99A1AF] md:text-[14px]">월별 시장 동향과 PT 상품 운영 인사이트를 확인하세요.</p>
      </header>

      {result.success ? (
        <TrainerMarketReportList data={result.data} page={page} />
      ) : (
        <section className="rounded-[16px] border border-[#364153] bg-[#101828] p-4 sm:p-5 lg:p-6">
          <p className="text-[18px] font-bold text-white">리포트 목록을 불러올 수 없습니다.</p>
          <p className="mt-2 text-[14px] text-[#99A1AF]">{result.message}</p>
          <Link href="/pt" className="mt-4 inline-block text-[14px] font-bold text-[#BFFF0B]">PT ZONE으로 돌아가기</Link>
        </section>
      )}
    </main>
  );
}
