import OrganizationApplicationCard from "@/feature/mypage/components/OrganizationApplicationCard";
import { getOrganizationApplications } from "@/service/mypage.service";

export default async function MyPageApplicationCheckPage() {
    // 조직 신청 내역 목록 조회 함수
    const response = await getOrganizationApplications();

    return (
        <div>
            <OrganizationApplicationCard
                data={response.data}
            />
        </div>
    );
}