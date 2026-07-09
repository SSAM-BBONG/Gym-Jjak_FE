import OrganizationDetailButton from "@/feature/admin/components/OrganizationDetailButton";

export default function OrganizationADataItem({ organization }: { organization: OrganizationApplications }) {
    return (
        <div
            style={{ display: 'grid' }}
            className="grid grid-cols-8 md:grid-cols-13 px-2 sm:px-3 md:px-4 lg:px-6 text-white font-normal text-[10px] sm:text-[11px] md:text-xs lg:text-sm border-t border-[#364153] h-14 sm:h-16 lg:h-17.5 items-center"
        >
            <p className="col-span-3 hidden md:block">{organization.requestedLoginId}</p>
            <p className="col-span-3">{organization.businessName}</p>
            <p className="col-span-2 hidden md:block">{organization.representativeName}</p>
            <p className="col-span-3">{organization.representativePhone}</p>
            <div className="col-span-2"><OrganizationDetailButton mode='organizationApprove' organizationId={organization.organizationApplicationId} /></div>
        </div>
    );
}
