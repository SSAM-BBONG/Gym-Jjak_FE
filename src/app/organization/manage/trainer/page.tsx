import OrganizationTrainerCard from "@/feature/mypage/components/OrganizationTrainerCard";
import { getOraganizationTrainerLists } from "@/service/mypage.service";

export default async function OrganizationTrainerManagePage() {

    const response = await getOraganizationTrainerLists();

    return (
        <div>
            <OrganizationTrainerCard
                data={response.data.trainers}
            />
        </div>
    );
}