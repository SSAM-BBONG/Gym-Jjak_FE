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
            className="grid grid-cols-8 sm:grid-cols-11 md:grid-cols-14 px-2 sm:px-3 md:px-4 lg:px-6 text-white font-normal text-[10px] sm:text-[11px] md:text-xs lg:text-sm border-t border-[#364153] h-14 sm:h-16 lg:h-17.5 items-center"
        >
            <p className="md:col-span-4 col-span-2">{data.name}</p>
            <p className="col-span-2 sm:col-span-3">{data.createdAt}</p>
            <p className="md:col-span-3 col-span-2 hidden sm:block text-[#BFFF0B]">{data.usageCount}</p>
            <div className="col-span-2"><AdminUpdateButton mode={text} id={targetId} name={data.name} /></div>
            <div className="col-span-2"><AdminDeleteButton mode={text} id={targetId} /></div>
        </div>
    );
}
