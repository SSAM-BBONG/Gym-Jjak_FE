"use client";

import Link from "next/link";
import { useState } from "react";
import { MyPtReservationList } from "../type";
import PtRecordCard from "./PtRecordCard";

const recordFilters = [
  { label: "전체", status: "ALL" },
  { label: "예약됨", status: "RESERVED" },
  { label: "수강중", status: "IN_PROGRESS" },
  { label: "완료됨", status: "COMPLETED" },
  { label: "취소됨", status: "CANCELLED" },
] as const;

type PtRecordFilter = (typeof recordFilters)[number]["status"];

interface PtRecordsListProps {
  ptReservations: MyPtReservationList[];
}

export default function PtRecordsList({ ptReservations }: PtRecordsListProps) {
  const [selectedFilter, setSelectedFilter] = useState<PtRecordFilter>("ALL");

  const filteredReservations = ptReservations.filter(
    (reservation) =>
      selectedFilter === "ALL" || reservation.status === selectedFilter
  );

  return (
    <>
      <div className="flex gap-3 my-5">
        {recordFilters.map((filter) => {
          const isSelected = selectedFilter === filter.status;

          return (
            <button
              key={filter.status}
              type="button"
              onClick={() => setSelectedFilter(filter.status)}
              className={`px-4 py-2 rounded-[10px] text-[16px] font-extrabold hover:cursor-pointer ${
                isSelected
                  ? "bg-[#BFFF0B] text-black"
                  : "bg-[#1E2939] text-[#99A1AF]"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-5">
        {filteredReservations.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-[16px] font-normal text-[#99A1AF]">
              아직 PT 기록이 없습니다.
            </p>
          </div>
        ) : (
          filteredReservations.map((item) => (
              <PtRecordCard 
                key={item.ptReservationId}
                data={item} />
          ))
        )}
      </div>
    </>
  );
}
