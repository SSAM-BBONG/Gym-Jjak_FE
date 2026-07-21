'use client'

import SearchBar from "@/feature/admin/components/SearchBar";
import OrganizationADataItem from "./OrganizationADataItem";
import AdminPagination from "@/feature/admin/components/AdminPagination";

interface OrganizationApplicationDataListProps {
    organizations: OrganizationApplications[]
    totalPage: number;
    page: string;
}

export default function OrganizationADataList({ organizations, totalPage, page }: OrganizationApplicationDataListProps) {
    return (
        <div>
            <SearchBar></SearchBar>
            <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 md:border mt-4 sm:mt-5 lg:mt-6 md:rounded-md w-full ">
                <div style={{ display: 'grid' }} className="grid grid-cols-8 md:grid-cols-13 px-2 sm:px-3 md:px-4 lg:px-6 text-[#99A1AF] font-bold text-[10px] sm:text-[11px] md:text-xs lg:text-sm border-0 h-11 sm:h-12 lg:h-13 items-center">
                    <p className="col-span-3 hidden md:block">아이디</p>
                    <p className="col-span-3">상호</p>
                    <p className="col-span-2 hidden md:block">대표자</p>
                    <p className="col-span-3">전화번호</p>
                    <p className="col-span-2">상세</p>
                </div>
                {organizations.map(organization => <OrganizationADataItem organization={organization} key={organization.organizationApplicationId} />)}
                {organizations.length === 0 && (
                    <div className="px-3 sm:px-4 lg:px-6 py-8 lg:py-10 text-center text-xs sm:text-sm text-muted-foreground">
                        조직 신청이 없습니다.
                    </div>
                )}
            </section>
            <AdminPagination url={`approvals/organizations`} page={page} totalPage={totalPage} />
        </div>
    );
}
