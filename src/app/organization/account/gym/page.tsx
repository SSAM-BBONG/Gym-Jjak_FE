import OrganizationManageDefaultInformation from "@/feature/mypage/components/OrganizationManageDefaultInformation";
import OrganizationManageForm from "@/feature/mypage/components/OrganizationManageForm";
import { getOrganizationManageInformation } from "@/service/mypage.service";

export default async function OrganManagePage() {

    const response = await getOrganizationManageInformation();

    return (
        <div className="flex flex-col gap-6 p-6">
            <h1 className="font-extrabold text-4xl text-white"> 헬스장 정보 </h1>
            <OrganizationManageDefaultInformation
                data={response.data}
            />
            <OrganizationManageForm
                data={response.data}
            />
        </div>
    );
}