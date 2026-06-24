import OrganizationDetailButton from "@/feature/admin/components/OrganizationDetailButton";

export default function OrganizationADataItem({ organization }: { organization: OrganizationApplications }) {
    return (
        <div
            style={{ display: 'grid' }}
            className="!gird grid-cols-13 px-6 text-white font-normal text-sm border-t border-[#364153] h-17.5 items-center"
        >
            <p className="col-span-3">{organization.requestedLoginId}</p>
            <p className="col-span-3">{organization.businessName}</p>
            <p className="col-span-2">{organization.representativeName}</p>
            <p className="col-span-3">{organization.representativePhone}</p>
            <div className="col-span-2"><OrganizationDetailButton mode='organizationApprove' organizationId={organization.organizationApplicationId} /></div>
        </div>
    );
}