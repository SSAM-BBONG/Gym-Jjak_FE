import Link from "next/link";

type PtManageNavType = "feedback" | "calendar" | "meal";

interface PtManageNavProps {
    href: string;
    type?: string;
}

const navItems: { label: string; value: PtManageNavType }[] = [
    { label: "피드백 관리", value: "feedback" },
    { label: "운동일지", value: "calendar" },
    { label: "식단관리", value: "meal" },
];

export default function PtManageNav({ href, type }: PtManageNavProps) {
    const currentType = type ?? "feedback";

    const active = "py-3 text-[16px] font-extrabold text-black bg-[#BFFF0B] rounded-[10px] text-center";
    const noneActive = "py-3 text-[16px] font-extrabold text-[#99A1AF] rounded-[10px] text-center";

    return (
        <div
            className="
            grid grid-cols-3 gap-2
            bg-[#101828]
            border border-[#1E2939] rounded-[14px]
            p-2
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
