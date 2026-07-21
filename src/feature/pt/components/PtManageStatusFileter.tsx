"use client";

const STATUS_OPTIONS = [
    { value: "ALL", label: "전체" },
    { value: "IN_PROGRESS", label: "수강중" },
    { value: "CANCELLED", label: "취소됨" },
    { value: "RESERVED", label: "예약됨" },
    { value: "COMPLETED", label: "완료됨" },
];

interface PtManageStatusFileterProps {
    selectedStatus: string;
    onStatusChange: (status: string) => void;
}

export default function PtManageStatusFileter({
    selectedStatus,
    onStatusChange,
}: PtManageStatusFileterProps) {
    return (
        <select
            className="self-center  cursor-pointer rounded-[10px] border border-[#1E2939] bg-[#1E2939] px-4 py-2 text-[14px] font-extrabold text-white outline-none hover:border-[#BFFF0B]"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
        >
            {STATUS_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
            ))}
        </select>
    );
}
