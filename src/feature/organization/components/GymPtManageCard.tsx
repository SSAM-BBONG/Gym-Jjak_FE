import { OrganizationPtCourseData } from "../type";
import GymPtStudentsModal from "./GymPtStudentModal";

interface GymPtManageCardProps {
    data: OrganizationPtCourseData[];
}

export default async function GymPtManageCard( {data}: GymPtManageCardProps) {

    return (
        <div>
            {data.length === 0 ? (
            <div className="rounded-[16px] border border-[#364153] bg-[#101828] p-6 text-center text-[#99A1AF]">
            등록된 PT 프로그램이 없습니다.
            </div>
            ) : (
            <div className="overflow-hidden rounded-[16px] border border-[#364153] bg-[#101828]">
                <div className="grid grid-cols-[2fr_1fr_0.5fr_0.5fr_0.7fr] border-b border-[#364153] px-6 py-4 text-[14px] font-extrabold text-[#99A1AF]">
                    <div>PT 프로그램</div>
                    <div>트레이너</div>
                    <div>수강생</div>
                    <div>상태</div>
                    <div>관리</div>
                </div>

            {data.map((course) => (
                <div
                key={course.ptCourseId}
                className="grid grid-cols-[2fr_1fr_0.5fr_0.5fr_0.7fr] items-center border-b border-[#1E2939] px-6 py-4 last:border-b-0"
                >
                    <div>
                        <p className="text-[14px] font-bold text-white">{course.title}</p>
                        <p className="text-[12px] font-normal text-[#6A7282]">
                        {course.totalSessionCount}회 - {course.price.toLocaleString("ko-KR")}원
                        </p>
                    </div>
                    <div className="text-[14px] font-normal text-[#D1D5DC]">{course.trainerName}</div>
                    <div className="text-[14px] font-bold text-[#BFFF0B]">{course.currentStudentCount}명</div>
                    <div>
                        <p
                        className={`w-fit whitespace-nowrap rounded-full border px-3 py-1 text-[12px] font-bold ${
                            course.status === "VISIBLE"
                            ? "border-[#00C95033] bg-[#00C9501A] text-[#05DF72]"
                            : "border-[#6A72824D] bg-[#6A728233] text-[#99A1AF]"
                        }`}
                        >
                            {course.status === "VISIBLE" ? "활성" : "비활성"}
                        </p>
                    </div>
                    <GymPtStudentsModal data={course} />
                 </div>
                    ))}
                </div>
            )}
        </div>
    );
}
