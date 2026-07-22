const FILTER_OPTIONS = [
    { value: "ALL", label: "전체" },
    { value: "VISIBLE", label: "활성화" },
    { value: "HIDDEN", label: "비활성화" },
];

interface PtManageIsActiveProps {
    selectedStatus: string;
    onStatusChange: (status: string) => void;
}

export default function PtManageIsActive({
    selectedStatus,
    onStatusChange,
}: PtManageIsActiveProps) {
    return (
        <div className="flex gap-3 py-6">
            {FILTER_OPTIONS.map(({ value, label }) => {
                const isSelected = selectedStatus === value;

                return (
                    <button
                        key={value}
                        type="button"
                        className={`px-4 py-2 rounded-[10px] text-[16px] font-extrabold ${
                            isSelected
                                ? "bg-[#BFFF0B] text-black"
                                : "bg-[#1E2939] text-[#99A1AF]"
                        }`}
                        onClick={() => onStatusChange(value)}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}
