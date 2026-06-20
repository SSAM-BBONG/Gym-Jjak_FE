import DetailButton from "@/feature/admin/components/DetailButton";

export default function OrgainzationDataItem({ organization }: { organization: Organizations }) {
    return (
        <div
            style={{ display: 'grid' }}
            className="!gird grid-cols-17 px-6 text-white font-normal text-sm border-t border-[#364153] h-17.5 items-center"
        >
            <p className="col-span-3">{organization.requestedLoginId}</p>
            <p className="col-span-3">{organization.businessName}</p>
            <p className="col-span-2">{organization.representativeName}</p>
            <p className="col-span-3">{organization.representativePhone}</p>
            <p className="col-span-2">트레이너 수</p>
            <p className="col-span-2">승인일</p>
            <div className="col-span-2"><DetailButton mode='organizationView' /></div>
        </div>
    );
}