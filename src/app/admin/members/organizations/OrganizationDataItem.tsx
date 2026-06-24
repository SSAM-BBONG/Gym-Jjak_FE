import DetailButton from "@/feature/admin/components/DetailButton";
import OrganizationDetailButton from "@/feature/admin/components/OrganizationDetailButton";

export default function OrgainzationDataItem({ organization }: { organization: Organizations }) {
    const date = new Date(organization.createdAt);

    return (
        <div
            style={{ display: 'grid' }}
            className="gird grid-cols-17 px-6 text-white font-normal text-sm border-t border-[#364153] h-17.5 items-center"
        >
            <p className="col-span-3">{organization.loginId}</p>
            <p className="col-span-3">{organization.businessName}</p>
            <p className="col-span-2">{organization.representativeName}</p>
            <p className="col-span-3">{organization.representativePhone}</p>
            <p className="col-span-2">{organization.trainerCount}명</p>
            <p className="col-span-2">{`${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`}</p>
            <div className="col-span-2"><OrganizationDetailButton mode='organizationView' organizationId={organization.organizationId} /></div>
        </div>
    );
}