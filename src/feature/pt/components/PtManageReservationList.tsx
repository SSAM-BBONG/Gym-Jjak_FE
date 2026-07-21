"use client";

import { useState } from "react";
import { PtReservationStudent } from "../type";
import PtManageStatusFileter from "./PtManageStatusFileter";
import PtManageUserCard from "./PtManageUserCard";

interface PtManageReservationListProps {
    id: number;
    title: string;
    ptReservations: PtReservationStudent[];
}

export default function PtManageReservationList({
    id,
    title,
    ptReservations,
}: PtManageReservationListProps) {
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const filteredReservations = selectedStatus === "ALL"
        ? ptReservations
        : ptReservations.filter((item) => item.status === selectedStatus);

    console.log(ptReservations);

    return (
        <>
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-[36px] font-black text-white">{title}</p>
                    <p className="text-[14px] font-normal text-[#99A1AF]">신청자 관리 및 피드백 제공</p>
                </div>
                <PtManageStatusFileter
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                />
            </div>
            <div className="flex flex-col gap-4 mt-6">
                {ptReservations.length === 0 ? (
                    <p className="py-10 text-center text-[16px] font-normal text-[#99A1AF]">
                        등록한 수강생이 없습니다.
                    </p>
                ) : (
                    filteredReservations.map((item) => (
                        <PtManageUserCard
                            key={item.ptReservationId}
                            data={item}
                            id={id}
                        />
                    ))
                )}
            </div>
        </>
    );
}
