import DetailButton from "@/feature/admin/components/DetailButton";

export default function OrganizationADataItem() {
    return (
        <div
            style={{ display: 'grid' }}
            className="!gird grid-cols-13 px-6 text-white font-normal text-sm border-t border-[#364153] h-17.5 items-center"
        >
            <p className="col-span-3">아이디</p>
            <p className="col-span-3">상호</p>
            <p className="col-span-2">대표자</p>
            <p className="col-span-3">전화번호</p>
            <div className="col-span-2"><DetailButton mode='organizationApprove' /></div>
        </div>
    );
}