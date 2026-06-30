import Link from "next/link";

export default function CalendarPtItem({ data }: { data: Pt }) {
    return (

        <Link
            href={``}
            className="p-5 border-l-4 border-l-[#BFFF0B] rounded-[10px] bg-[#101828] m-2 flex items-center justify-between">
            <p>{data.title}</p>
        </Link>

    );
}