import OrganizationRegistForm from "@/feature/mypage/components/OrganizationRegistForm";
import { getOrganizationApplication } from "@/service/mypage.service";

// 조직 신청 상세 조회 타입 설정
interface OrganizationApplicationDetailPageProps {
  params: Promise<{
    applicationId: string;
  }>;
}

export default async function OrganizationApplicationDetailPage({params}: OrganizationApplicationDetailPageProps) {
  // 조직 신청 목록 아이디
  const { applicationId } = await params;
  // reponse값 저장
  const response = await getOrganizationApplication(applicationId);

  return ( 
    // 읽기 모드 & 화면에 뿌리기
  <OrganizationRegistForm mode="read" application={response.data} />
  )
}
