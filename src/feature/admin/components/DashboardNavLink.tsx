'use client'

import { AdminActiveDashboard, AdminDashboard } from "@/components/ui/image";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminNavLinkProps {
    href: string,
    children: string
}

export default function DashboardNavLink({ href, children }: AdminNavLinkProps) {
    const pathName = usePathname();
    const isActive = pathName === href;
    let active = 'flex gap-4 text-[#BFFF0B] bg-[#BFFF0B1A] border-[#BFFF0B33] border-1 font-medium text-base py-3 px-4 my-2 items-center rounded-md';
    let noneActive = 'flex gap-4 text-[#99A1AF] font-medium text-base py-3 px-4 my-2 items-center rounded-md hover:bg-gray-800 hover:text-white';

    return (
        <Link href={href} className={isActive ? active : noneActive}>
            <div className="relative w-5 h-5">
                <Image
                    src={isActive ? AdminActiveDashboard : AdminDashboard}
                    alt="대시보드"
                    fill
                    sizes="w-10 h-10"
                />
            </div>
            {children}
        </Link>
    );
}