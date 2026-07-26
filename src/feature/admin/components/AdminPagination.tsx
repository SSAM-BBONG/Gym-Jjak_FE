import Link from "next/link";

export default function AdminPagination({ url, page, totalPage, sort }: { url: string, page: string, totalPage: number, sort?: string }) {
    const currentpage = Number(page);
    const currentPageGroup = Math.ceil((currentpage + 1) / 5);
    const sortQuery = sort ? `&sort=${sort}` : '';

    const arr = [];
    for (let i = (currentPageGroup - 1) * 5 + 1; i <= Math.min(currentPageGroup * 5, Math.max(totalPage, 1)); i++) {
        arr.push(i);
    }

    return (
        <div className="flex gap-3 text-white font-semibold text-base justify-center mt-5">
            <Link href={`/admin/${url}?page=${Math.max(currentpage - 1, 0)}${sortQuery}`} className="rounded-md px-2 transition-colors hover:bg-white/10 hover:text-white">이전</Link>
            {
                arr.map(i => <Link key={i} href={`/admin/${url}?page=${i - 1}${sortQuery}`} className={currentpage + 1 === i ? 'rounded-md px-2 text-[#BFFF0B] transition-colors hover:bg-[#BFFF0B1A] hover:text-[#BFFF0B]' : 'rounded-md px-2 transition-colors hover:bg-white/10 hover:text-white'}>{i}</Link>)
            }
            <Link href={`/admin/${url}?page=${Math.min(currentpage + 1, Math.max(totalPage, 1) - 1)}${sortQuery}`} className="rounded-md px-2 transition-colors hover:bg-white/10 hover:text-white">다음</Link>
        </div>
    );
}
