'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminNavLinkProps {
    href: string,
    children: string
}

export default function AdminNavLink({ href, children }: AdminNavLinkProps) {
    const pathName = usePathname();
    const isActive = pathName.startsWith(href);
    let active = 'text-[#BFFF0B] text-sm bg-[#BFFF0B1A] border-[#BFFF0B33] border-1 py-2 px-4 w-full block rounded-md my-1';
    let noneActive = 'text-[#6A7282] text-sm py-2 px-4 w-full block my-1 rounded-md hover:bg-gray-800/50 hover:text-gray-300';

    return (
        <Link href={href} className={isActive ? active : noneActive}>
            {children}
        </Link>
    );
}