import OrganizationApplicationCard from "@/feature/mypage/components/OrganizationApplicationCard";
import OrganizationRegistForm from "@/feature/mypage/components/OrganizationRegistForm";

export default function OrganizationPage() {
    return (
        <div>
            <OrganizationRegistForm />
            <OrganizationApplicationCard/>
        </div>
    );
}