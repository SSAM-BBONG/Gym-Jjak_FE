"use client";

import OneButtonModal from "@/components/ui/OneButtonModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { cancelMyPtSessionReservationAction } from "@/feature/pt/actions";
import { PtCourseSessionReservation } from "@/feature/pt/type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface PtCourseSessionReservationListProps {
  sessions: PtCourseSessionReservation[];
  errorMessage?: string;
}

const formatDateTime = (value: string) => value.replace("T", " ").slice(0, 16);

export default function PtCourseSessionReservationList({
  sessions,
  errorMessage,
}: PtCourseSessionReservationListProps) {
  const router = useRouter();
  const [selectedSession, setSelectedSession] = useState<PtCourseSessionReservation | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    if (!selectedSession || isCancelling) return;

    setIsCancelling(true);
    const result = await cancelMyPtSessionReservationAction(selectedSession.ptReservationId);
    setIsCancelling(false);

    if (!result.success) {
      setSelectedSession(null);
      toast.error(result.message);
      return;
    }

    setSelectedSession(null);
    toast.success(result.message);
    router.refresh();
  };

  if (errorMessage) {
    return (
      <OneButtonModal
        isModal
        closeModal={() => router.back()}
        title="내 PT 세션 목록"
        content={errorMessage}
      />
    );
  }

  return (
    <>
      {sessions.length === 0 ? (
        <div className="rounded-[18px] border border-dashed border-[#364153] bg-[#101828] px-6 py-16 text-center">
          <p className="text-[18px] font-extrabold text-white">등록된 세션이 없습니다.</p>
          <p className="mt-2 text-[14px] text-[#99A1AF]">예약한 PT 세션이 이곳에 표시됩니다.</p>
        </div>
      ) : (
        <ol className="relative flex flex-col gap-4 border-l border-[#364153] pl-5 sm:pl-7">
          {sessions.map((session, index) => (
            <li key={session.ptReservationId} className="relative rounded-[16px] border border-[#364153] bg-[linear-gradient(135deg,rgba(30,41,57,0.95),rgba(16,24,40,0.95))] p-5 sm:p-6">
              <span className="absolute -left-[31px] top-7 flex h-5 w-5 items-center justify-center rounded-full border-4 border-[#101828] bg-[#BFFF0B] sm:-left-[39px]">
                <span className="h-1.5 w-1.5 rounded-full bg-black" />
              </span>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[12px] font-extrabold text-[#BFFF0B]">SESSION {index + 1}</p>
                  <h2 className="mt-1 text-[20px] font-black text-white">{session.ptCourseTitle}</h2>
                  <p className="mt-1 text-[14px] text-[#99A1AF]">{session.trainerName} 트레이너</p>
                  <p className="mt-4 text-[16px] font-extrabold text-white">
                    {formatDateTime(session.reservedStartAt)} ~ {formatDateTime(session.reservedEndAt).slice(11)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSession(session)}
                  className="shrink-0 rounded-[10px] border border-[#FB2C3666] bg-[#82181A4D] px-4 py-2 text-[14px] font-extrabold text-[#FF6467] transition-colors hover:bg-[#FB2C36] hover:text-white"
                >
                  세션 취소
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}

      <TwoButtonModal
        isModal={Boolean(selectedSession)}
        closeModal={() => !isCancelling && setSelectedSession(null)}
        activeModal={handleCancel}
        title="PT 세션 예약 취소"
        content="선택한 PT 세션 예약을 취소하시겠습니까?"
      />
    </>
  );
}
