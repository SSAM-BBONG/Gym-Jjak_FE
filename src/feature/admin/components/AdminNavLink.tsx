'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminNavLinkProps {
    href: string,
    children: string
}

export default function AdminNavLink({ href, children }: AdminNavLinkProps) {
    const pathName = usePathname();
    const purehref = href.split('?')[0]
    const isActive = pathName.startsWith(purehref);
    let active = 'text-[#BFFF0B] text-sm bg-[#BFFF0B1A] border-[#BFFF0B33] border-1 py-2 px-4 w-full block rounded-md my-1 transition-colors hover:border-[#BFFF0B] hover:bg-[#BFFF0B1A] hover:text-[#BFFF0B]';
    let noneActive = 'text-[#6A7282] text-sm py-2 px-4 w-full block my-1 rounded-md border border-transparent transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white';

    return (
        <Link href={href} className={isActive ? active : noneActive}>
            {children}
        </Link>
    );
}
