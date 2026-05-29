import DetailButton from "@/feature/admin/components/DetailButton";

export default function OrgainzationDataItem() {
    return (
        <div
            style={{ display: 'grid' }}
            className="!gird grid-cols-17 px-6 text-white font-normal text-sm border-t border-[#364153] h-17.5 items-center"
        >
            <p className="col-span-3">아이디</p>
            <p className="col-span-3">상호</p>
            <p className="col-span-2">대표자</p>
            <p className="col-span-3">전화번호</p>
            <p className="col-span-2">트레이너 수</p>
            <p className="col-span-2">승인일</p>
            <div className="col-span-2"><DetailButton mode='organizationView' /></div>
        </div>
    );
}