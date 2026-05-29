import Link from "next/link";

export default function AdminPagination({ mode, page }: { mode: 'TRAINER_REVIEW' | 'COMMENT' | 'PT_COURSE' | 'FEEDBACK' | 'POST', page: string }) {
    const totalPage = 13;
    const currentpage = Number(page);
    const currentPageGroup = Math.ceil(currentpage / 5);

    const arr = [];
    for (let i = (currentPageGroup - 1) * 5 + 1; i <= Math.min(currentPageGroup * 5, totalPage); i++) {
        arr.push(i);
    }

    const modeType = { 'TRAINER_REVIEW': 'reviews', 'COMMENT': 'comments', 'PT_COURSE': 'pt', 'FEEDBACK': 'feedbacks', 'POST': 'posts' }



    return (
        <div className="flex gap-2 text-white">
            <Link href={`/admin/reports/${modeType[mode]}?page=${Math.max(currentpage - 1, 1)}`}><img />이전</Link>
            {
                arr.map(i => <Link key={i} href={`/admin/reports/${modeType[mode]}?page=${i}`}>{i}</Link>)
            }
            <Link href={`/admin/reports/${modeType[mode]}?page=${Math.min(currentpage + 1, totalPage)}`}><img />다음</Link>

        </div>
    );
}