'use client'

import SearchBar from "@/feature/admin/components/SearchBar";
import UserDataItem from "./UserDataItem";
import AdminPagination from "@/feature/admin/components/AdminPagination";

interface UserDataListProps {
    users: Users[];
    totalPage: number;
    page: string;
}

export default function UserDataList({ users, totalPage, page }: UserDataListProps) {
    return (
        <div>
            <SearchBar></SearchBar>
            <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 border mt-6 rounded-md w-full ">
                <div style={{ display: 'grid' }} className="grid grid-cols-11 px-6 text-[#99A1AF] font-bold text-sm border-0 h-13 items-center">
                    <p className="col-span-3">이메일</p>
                    <p className="col-span-2">이름</p>
                    <p className="col-span-2">닉네임</p>
                    <p className="col-span-2">상태</p>
                    <p className="col-span-2">관리</p>
                </div>
                {users?.map((user) => (
                    <UserDataItem user={user} key={user.userId} />
                ))}

                {users?.length === 0 && (
                    <div className="px-6 py-10 text-center text-sm text-muted-foreground">
                        유저가 없습니다.
                    </div>
                )}
            </section>
            <AdminPagination url={`members/users`} page={page} totalPage={totalPage} />

        </div>
    );
}