import PtManageCourseList from "@/feature/pt/components/PtManageCourseList";
import { getPtzonePtManageList } from "@/service/ptzone.service";

export default async function PtManagePage() {

    const response = await getPtzonePtManageList();

    return (
        <div className="flex flex-col gap-1 px-60 py-10">
            <p className="text-[36px] font-black text-white"> PT 관리 </p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 내 PT 및 수강생을 관리하세요 </p>

            <PtManageCourseList ptCourses={response.data} />
        </div>
    );
}
