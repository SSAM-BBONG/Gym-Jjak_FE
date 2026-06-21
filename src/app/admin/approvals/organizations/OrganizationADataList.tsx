'use client'

import SearchBar from "@/feature/admin/components/SearchBar";
import OrganizationADataItem from "./OrganizationADataItem";

export default function OrganizationADataList({ organizations }: { organizations: OrganizationApplications[] }) {
    return (
        <div>
            <SearchBar></SearchBar>
            <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 border mt-6 rounded-md w-full ">
                <div style={{ display: 'grid' }} className="!gird grid-cols-13 px-6 text-[#99A1AF] font-bold text-sm border-0 h-13 items-center">
                    <p className="col-span-3">아이디</p>
                    <p className="col-span-3">상호</p>
                    <p className="col-span-2">대표자</p>
                    <p className="col-span-3">전화번호</p>
                    <p className="col-span-2">상세</p>
                </div>
                {organizations.map(organization => <OrganizationADataItem organization={organization} key={organization.organizationApplicationId} />)}
                {organizations.length === 0 && (
                    <div className="px-6 py-10 text-center text-sm text-muted-foreground">
                        조직 신청이 없습니다.
                    </div>
                )}
            </section>
        </div>
    );
}