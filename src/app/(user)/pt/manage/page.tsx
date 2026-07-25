import PtManageCourseList from "@/feature/pt/components/PtManageCourseList";
import { getPtzonePtManageList } from "@/service/ptzone.service";

export default async function PtManagePage() {

    const response = await getPtzonePtManageList();

    return (
        <div className="flex flex-col gap-1 px-3 py-5 sm:px-6 md:px-12 md:py-8 lg:px-60 lg:py-10">
            <p className="text-2xl font-black text-white sm:text-3xl lg:text-[36px]"> PT 관리 </p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 내 PT 및 수강생을 관리하세요 </p>

            <PtManageCourseList ptCourses={response.data} />
        </div>
    );
}
