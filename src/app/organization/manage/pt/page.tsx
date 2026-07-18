import { getOrganizationPtCoursesAction } from "@/feature/organization/actions";
import GymPtManageCard from "@/feature/organization/components/GymPtManageCard";

export default async function OrganizationPtManagePage() {
  const response = await getOrganizationPtCoursesAction();
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <p className="text-[36px] font-black text-white">PT 관리</p>
      <GymPtManageCard
        data={response.data}
      />
    </div>
  );
}
