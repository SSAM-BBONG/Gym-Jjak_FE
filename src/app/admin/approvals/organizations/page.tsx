import { getOrganization } from "@/service/report.service";
import OrganizationADataList from "./OrganizationADataList";

export default async function Page() {

    const response = await getOrganization();
    const organizations: Organizations[] = response.data;

    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl text-white mb-8">조직 승인</h1>
            <OrganizationADataList organizations={organizations} />
        </section>
    );
}