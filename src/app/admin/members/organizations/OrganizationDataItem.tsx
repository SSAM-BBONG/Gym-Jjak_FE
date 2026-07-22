import OrganizationDetailButton from "@/feature/admin/components/OrganizationDetailButton";
import { format } from "date-fns";

export default function OrgainzationDataItem({ organization }: { organization: Organizations }) {
    return (
        <div
            style={{ display: 'grid' }}
            className="gird grid-cols-8 md:grid-cols-17 px-1.5 sm:px-2 md:px-4 lg:px-6 text-white font-normal text-[10px] sm:text-[11px] md:text-xs lg:text-sm border-t border-[#364153] h-14 sm:h-16 lg:h-17.5 items-center"
        >
            <p className="col-span-3 hidden md:block">{organization.loginId}</p>
            <p className="col-span-3">{organization.businessName}</p>
            <p className="col-span-2 hidden md:block">{organization.representativeName}</p>
            <p className="col-span-3">{organization.representativePhone}</p>
            <p className="col-span-2 hidden md:block">{organization.trainerCount}명</p>
            <p className="col-span-2 hidden md:block">{format(organization.createdAt, 'yyyy-MM-dd')}</p>
            <div className="col-span-2" > <OrganizationDetailButton mode='organizationView' organizationId={organization.organizationId} /></div>
        </div >
    );
}
