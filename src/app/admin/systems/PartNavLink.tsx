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
    let active = 'text-black text-sm font-semibold bg-[#BFFF0B] border-[#BFFF0B] border-1 py-2 px-4 block rounded-md my-1';
    let noneActive = 'text-[#BFFF0B] text-sm py-2 px-4 block my-1 rounded-md hover:bg-gray-800/50 hover:text-[#BFFF0B]-300';

    return (
        <Link href={href} className={isActive ? active : noneActive}>
            {children}
        </Link>
    );
}