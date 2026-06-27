import AdminDeleteButton from "@/feature/admin/components/AdminDeleteButton";
import AdminUpdateButton from "@/feature/admin/components/AdminUpdateButton";

type SystemDataItemProps =
    | {
        text: "카테고리";
        data: Category;
    }
    | {
        text: "태그";
        data: Tag;
    };

export default function SystemDataItem({ text, data }: SystemDataItemProps) {
    const targetId = 'categoryId' in data ? data.categoryId : data.tagId;
    return (
        <div
            style={{ display: 'grid' }}
            className="grid grid-cols-14 px-6 text-white font-normal text-sm border-t border-[#364153] h-17.5 items-center"
        >
            <p className="col-span-4">{data.name}</p>
            <p className="col-span-3">{data.createdAt}</p>
            <p className="col-span-3 text-[#BFFF0B]">{data.usageCount}</p>
            <div className="col-span-2"><AdminUpdateButton mode={text} id={targetId} name={data.name} /></div>
            <div className="col-span-2"><AdminDeleteButton mode={text} id={targetId} /></div>
        </div>
    );
}