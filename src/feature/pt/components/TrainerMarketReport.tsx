import { TrainerReportDetailData } from "../type";

interface TrainerMarketReportProps {
  data: TrainerReportDetailData;
}

interface DistributionItemProps {
  label: string;
  percentage: number;
  change: number | null;
}

const formatTargetMonth = (targetMonth: string) => {
  const [year, month] = targetMonth.split("-");

  return `${year}년 ${Number(month)}월`;
};

const formatChange = (change: number | null) => {
  if (change === null) return "비교 데이터 없음";
  if (change === 0) return "전월과 동일";

  return `${change > 0 ? "+" : ""}${change.toFixed(1)}%p`;
};

function DistributionItem({ label, percentage, change }: DistributionItemProps) {
  const safePercentage = Math.max(0, Math.min(100, percentage));

  return (
    <li className="space-y-2">
      <div className="flex items-center justify-between gap-4 text-[14px]">
        <span className="font-semibold text-white">{label}</span>
        <span className="text-[#99A1AF]">
          {percentage.toFixed(1)}% · {formatChange(change)}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#364153]">
        <div className="h-full rounded-full bg-[#BFFF0B]" style={{ width: `${safePercentage}%` }} />
      </div>
    </li>
  );
}

function DistributionSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[16px] border border-[#364153] bg-[#101828] p-6">
      <h2 className="text-[20px] font-black text-white">{title}</h2>
      <p className="mt-1 text-[14px] text-[#99A1AF]">{description}</p>
      <ul className="mt-5 space-y-4">{children}</ul>
    </section>
  );
}

export default function TrainerMarketReport({ data }: TrainerMarketReportProps) {
  const snapshot = data.marketTrendsSnapshot;

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-[14px] font-bold text-[#BFFF0B]">AI 비서 · 데이터 기반 인사이트</p>
        <h1 className="mt-1 text-[36px] font-black text-white">
          {formatTargetMonth(data.targetMonth)} 시장 동향 리포트
        </h1>
        <p className="mt-2 text-[14px] text-[#99A1AF]">
          시장 데이터와 현재 운영 환경을 참고해 PT 상품의 포지셔닝을 검토하세요.
        </p>
      </header>

      <section className="rounded-[16px] border border-[#BFFF0B4D] bg-[#BFFF0B0D] p-6">
        <h2 className="text-[20px] font-black text-white">이번 달 AI 인사이트</h2>
        <p className="mt-4 whitespace-pre-line break-keep text-[15px] leading-7 text-[#D1D5DC]">
          {data.report}
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <DistributionSection title="PT 총액 가격대" description="5만 원 단위의 총 PT 가격 분포입니다.">
          {snapshot.priceDistribution.length > 0 ? (
            snapshot.priceDistribution.map((item) => (
              <DistributionItem
                key={item.priceRange}
                label={item.priceRange}
                percentage={item.percentage}
                change={item.percentageChangeFromLastMonth}
              />
            ))
          ) : (
            <li className="text-[14px] text-[#99A1AF]">집계된 가격대 데이터가 없습니다.</li>
          )}
        </DistributionSection>

        <DistributionSection title="회차당 가격" description="5천 원 단위의 회차당 가격 분포입니다.">
          {snapshot.pricePerSessionDistribution.length > 0 ? (
            snapshot.pricePerSessionDistribution.map((item) => (
              <DistributionItem
                key={item.priceRange}
                label={item.priceRange}
                percentage={item.percentage}
                change={item.percentageChangeFromLastMonth}
              />
            ))
          ) : (
            <li className="text-[14px] text-[#99A1AF]">집계된 회차당 가격 데이터가 없습니다.</li>
          )}
        </DistributionSection>

        <DistributionSection title="PT 회차 수" description="상품별 총 회차 수 분포입니다.">
          {snapshot.sessionCountDistribution.length > 0 ? (
            snapshot.sessionCountDistribution.map((item) => (
              <DistributionItem
                key={item.sessionCount}
                label={`${item.sessionCount}회`}
                percentage={item.percentage}
                change={item.percentageChangeFromLastMonth}
              />
            ))
          ) : (
            <li className="text-[14px] text-[#99A1AF]">집계된 회차 수 데이터가 없습니다.</li>
          )}
        </DistributionSection>
      </div>

      <p className="rounded-[12px] border border-[#364153] bg-[#101828] px-5 py-4 text-[13px] leading-6 text-[#99A1AF]">
        본 리포트는 서비스 데이터 기반의 PT 상품 운영 참고 자료입니다. 운동 방법론이나 지도 방식에 대한 평가 또는 권고를 제공하지 않습니다.
      </p>
    </div>
  );
}
