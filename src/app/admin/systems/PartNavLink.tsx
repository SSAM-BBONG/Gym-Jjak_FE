'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

interface AdminNavLinkProps {
    part: PartKo,
    href: string,
    children: string
}


export default function PartNavLink({ part, href, children }: AdminNavLinkProps) {
    const pathName = usePathname();
    const isActive = href === `${pathName}${part ? `?part=${part}` : ''}`;
    let active = 'text-black text-sm font-semibold bg-[#BFFF0B] border-[#BFFF0B] border-1 py-2 px-4 block rounded-md my-1 transition-colors hover:border-[#d4ff65] hover:bg-[#d4ff65] hover:text-[#0b0f19]';
    let noneActive = 'text-[#BFFF0B] text-sm py-2 px-4 block my-1 rounded-md border border-transparent transition-colors hover:border-[#BFFF0B] hover:bg-white/10 hover:text-[#BFFF0B]';

    return (
        <Link href={href} className={isActive ? active : noneActive}>
            {children}
        </Link>
    );
}
