import { getOrganizationApplicationAdmin } from "@/service/report.service";
import OrganizationADataList from "./OrganizationADataList";

interface paramsProps {
    searchParams: Promise<{
        page: string;
        keyword: string;
    }>
}

export default async function Page({ searchParams }: paramsProps) {
    const { page, keyword } = await searchParams;
    const response = await getOrganizationApplicationAdmin(page, keyword);
    const organizations: OrganizationApplications[] = response.data.applications;
    const totalPage: number = response.data.totalPages;

    return (
        <section className="p-4 sm:p-5 md:p-6 lg:p-7.5">
            <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white mb-5 sm:mb-6 lg:mb-8">조직 승인</h1>
            <OrganizationADataList organizations={organizations} totalPage={totalPage} page={page} />
        </section>
    );
}
