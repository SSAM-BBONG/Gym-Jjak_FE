'use client'

import SearchBar from "@/feature/admin/components/SearchBar";
import OrgainzationDataItem from "./OrganizationDataItem";
import AdminPagination from "@/feature/admin/components/AdminPagination";

interface OrganizationDataListProps {
    organizations: Organizations[]
    totalPage: number;
    page: string;
}

export default function OrganizationDataList({ organizations, totalPage, page }: OrganizationDataListProps) {
    return (
        <div>
            <SearchBar></SearchBar>
            <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 md:border mt-4 sm:mt-5 lg:mt-6 md:rounded-md w-full ">
                <div style={{ display: 'grid' }} className="gird grid-cols-8 md:grid-cols-17 px-1.5 sm:px-2 md:px-4 lg:px-6 text-[#99A1AF] font-bold text-[10px] sm:text-[11px] md:text-xs lg:text-sm border-0 h-11 sm:h-12 lg:h-13 items-center">
                    <p className="col-span-3 hidden md:block">아이디</p>
                    <p className="col-span-3">상호</p>
                    <p className="col-span-2 hidden md:block">대표자</p>
                    <p className="col-span-3">전화번호</p>
                    <p className="col-span-2 hidden md:block">트레이너 수</p>
                    <p className="col-span-2 hidden md:block">승인일</p>
                    <p className="col-span-2">상세</p>
                </div>

                {organizations?.map((organization) => (
                    <OrgainzationDataItem organization={organization} key={organization.organizationId} />
                ))}

                {organizations?.length === 0 && (
                    <div className="px-3 sm:px-4 lg:px-6 py-8 lg:py-10 text-center text-xs sm:text-sm text-muted-foreground">
                        조직이 없습니다.
                    </div>
                )}
            </section>
            <AdminPagination url={'members/organizations'} page={page} totalPage={totalPage} />

        </div>
    );
}
