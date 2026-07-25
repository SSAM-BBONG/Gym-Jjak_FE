"use client";

import OneButtonModal from "@/components/ui/OneButtonModal";
import { PtSessionReservation } from "@/feature/pt/type";
import { useRouter } from "next/navigation";

const statusStyle = {
  RESERVED: { label: "예약 완료", className: "bg-[#2B7FFF33] text-[#51A2FF]" },
  COMPLETED: { label: "수강 완료", className: "bg-[#6A728233] text-[#99A1AF]" },
  CANCELLED: { label: "취소", className: "bg-[#FB2C3633] text-[#FF6467]" },
} as const;

interface PtSessionReservationListProps {
  sessions: PtSessionReservation[];
  errorMessage?: string;
}

const formatDateTime = (value: string) => value.replace("T", " ").slice(0, 16);

export default function PtSessionReservationList({
  sessions,
  errorMessage,
}: PtSessionReservationListProps) {
  const router = useRouter();

  if (errorMessage) {
    return (
      <OneButtonModal
        isModal
        closeModal={() => router.back()}
        title="PT 세션 예약 목록"
        content={errorMessage}
      />
    );
  }

  return (
    <>
      <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:gap-4">
        {sessions.length === 0 ? (
          <div className="rounded-[16px] border border-[#1E2939] bg-[#101828] py-12 text-center text-[#99A1AF]">
            예약된 PT 세션이 없습니다.
          </div>
        ) : (
          sessions.map((session) => {
            const status = statusStyle[session.sessionStatus];

            return (
              <article
                key={session.ptReservationId}
                className="flex flex-col items-center justify-between gap-3 rounded-[16px] border border-[#1E2939] bg-[#101828] p-4 sm:flex-row sm:gap-6 sm:p-5 lg:p-6"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <h2 className="text-[20px] font-black text-white">{session.ptCourseTitle}</h2>
                    <span className={`rounded-full px-3 py-1 text-[12px] font-extrabold ${status.className}`}>
                      {status.label}
                    </span>
                  </div>
                  <p className="text-[14px] text-[#99A1AF]">{session.trainerName} 트레이너</p>
                  <p className="text-[14px] font-bold text-white">
                    {formatDateTime(session.reservedStartAt)} ~ {formatDateTime(session.reservedEndAt)}
                  </p>
                </div>

              </article>
            );
          })
        )}
      </div>

    </>
  );
}
