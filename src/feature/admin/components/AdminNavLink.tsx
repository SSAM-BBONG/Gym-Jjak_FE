'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminNavLinkProps {
    href: string,
    mode?: string,
    children: string
}

export default function AdminNavLink({ href, mode = 'sub', children }: AdminNavLinkProps) {
    const pathName = usePathname();
    const isActive = pathName === href;
    let active = 'text-[#BFFF0B] text-sm bg-[#BFFF0B1A] border-[#BFFF0B33] border-1 py-2 px-4 w-full block rounded-md my-1';
    let noneActive = 'text-[#6A7282] text-sm py-2 px-4 w-full block my-1 rounded-md hover:bg-gray-800/50 hover:text-gray-300';

    if (mode === 'main') {
        active = 'flex text-[#BFFF0B] bg-[#BFFF0B1A] border-[#BFFF0B33] border-1 font-medium text-base py-3 px-4 my-2 items-center rounded-md';
        noneActive = 'flex text-[#99A1AF] font-medium text-base py-3 px-4 my-2 items-center rounded-md hover:bg-gray-800 hover:text-white';
    }
    return (
        <Link href={href} className={isActive ? active : noneActive}>
            {children}
        </Link>
    );
}