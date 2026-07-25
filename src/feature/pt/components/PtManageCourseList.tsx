"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PtManageListData } from "../type";
import PtManageCard from "./PtManageCard";
import PtManageIsActive from "./PtManageIsActive";

interface PtManageCourseListProps {
    ptCourses: PtManageListData[];
}

export default function PtManageCourseList({ ptCourses }: PtManageCourseListProps) {
    const router = useRouter();
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const filteredCourses = selectedStatus === "ALL"
        ? ptCourses
        : ptCourses.filter((item) => item.status === selectedStatus);

    return (
        <>
            <PtManageIsActive
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:gap-6 lg:grid-cols-2 lg:gap-4 2xl:grid-cols-3">
                {filteredCourses.map((item) => (
                    <PtManageCard
                        key={item.ptCourseId}
                        data={item}
                        onOpen={() => router.push(`/pt/manage/${item.ptCourseId}`)}
                    />
                ))}
            </div>
        </>
    );
}
