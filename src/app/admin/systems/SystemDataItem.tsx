import AdminDeleteButton from "@/feature/admin/components/AdminDeleteButton";
import AdminUpdateButton from "@/feature/admin/components/AdminUpdateButton";

export default function SystemDataItem({ text }: { text: string }) {
    return (
        <div
            style={{ display: 'grid' }}
            className="!gird grid-cols-14 px-6 text-white font-normal text-sm border-t border-[#364153] h-17.5 items-center"
        >
            <p className="col-span-4">하이</p>
            <p className="col-span-3">하이</p>
            <p className="col-span-3 text-[#BFFF0B]">하이</p>
            <div className="col-span-2"><AdminUpdateButton mode={text} /></div>
            <div className="col-span-2"><AdminDeleteButton mode={text} /></div>
        </div>
    );
}