import Link from "next/link";

type PtManageNavType = "feedback" | "calendar" | "meal" | "routine";

interface PtManageNavProps {
    href: string;
    type?: string;
}

const navItems: { label: string; value: PtManageNavType }[] = [
    { label: "피드백 관리", value: "feedback" },
    { label: "운동일지", value: "calendar" },
    { label: "식단관리", value: "meal" },
    { label: "루틴 분석", value: "routine" },
];

export default function PtManageNav({ href, type }: PtManageNavProps) {
    const currentType = type ?? "feedback";

    const active = "py-2 text-[12px] font-extrabold text-black bg-[#BFFF0B] rounded-[10px] text-center sm:py-3 sm:text-[14px] lg:text-[16px]";
    const noneActive = "py-2 text-[12px] font-extrabold text-[#99A1AF] rounded-[10px] text-center sm:py-3 sm:text-[14px] lg:text-[16px]";

    return (
        <div
            className="
            grid grid-cols-2 gap-2 sm:grid-cols-4
            bg-[#101828]
            border border-[#1E2939] rounded-[14px]
            p-1 sm:p-2
            "
        >
            {navItems.map((item) => (
                <Link
                    key={item.value}
                    href={`${href}?type=${item.value}`}
                    className={currentType === item.value ? active : noneActive}
                >
                    {item.label}
                </Link>
            ))}
        </div>
    );
}
