import OrganizationManageDefaultInformation from "@/feature/mypage/components/OrganizationManageDefaultInformation";
import OrganizationManageForm from "@/feature/mypage/components/OrganizationManageForm";

export default function OrganManagePage() {
    return (
        <div className="flex flex-col gap-6">
            <OrganizationManageDefaultInformation/>
            <OrganizationManageForm/>
        </div>
    );
}