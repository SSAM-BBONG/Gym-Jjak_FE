"use client";

import { useState } from "react";
import Link from "next/link";
import { PtManageListData } from "../type";
import PtManageCard from "./PtManageCard";
import PtManageIsActive from "./PtManageIsActive";

interface PtManageCourseListProps {
    ptCourses: PtManageListData[];
}

export default function PtManageCourseList({ ptCourses }: PtManageCourseListProps) {
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
            <div className="grid grid-cols-3 gap-4">
                {filteredCourses.map((item) => (
                    <Link key={item.ptCourseId} href={`/pt/manage/${item.ptCourseId}`}>
                        <PtManageCard data={item} />
                    </Link>
                ))}
            </div>
        </>
    );
}
