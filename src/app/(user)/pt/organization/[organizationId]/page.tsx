import { getPublicOrganizationDetailAction } from "@/feature/organization/actions";
import PtOrganizationDetail from "@/feature/pt/components/PtOrganizationDetail";

interface OrganizationDetailPageProps {
  params: Promise<{ organizationId: string }>;
}

export default async function OrganizationDetailPage({ params }: OrganizationDetailPageProps) {
  const { organizationId } = await params;
  const parsedOrganizationId = Number(organizationId);

  if (!Number.isInteger(parsedOrganizationId) || parsedOrganizationId <= 0) {
    return (
      <main className="mx-auto w-full max-w-4xl px-5 py-10 text-center text-sm text-[#98A2B3]">
        올바르지 않은 조직 정보입니다.
      </main>
    );
  }

  const result = await getPublicOrganizationDetailAction(parsedOrganizationId);

  if (!result.success) {
    return (
      <main className="mx-auto w-full max-w-4xl px-5 py-10">
        <div className="rounded-2xl border border-[#2A3445] bg-[#121A2B] px-6 py-16 text-center">
          <h1 className="text-xl font-extrabold text-white">조직 정보를 불러올 수 없습니다.</h1>
          <p className="mt-2 text-sm text-[#98A2B3]">{result.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="px-5 py-10 sm:px-8 sm:py-12">
      <PtOrganizationDetail organization={result.data} />
    </main>
  );
}
