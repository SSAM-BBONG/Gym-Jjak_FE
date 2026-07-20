"use client";

import { useState } from "react";
import { getOrganizationPtStudentsAction } from "../actions";
import {
  OrganizationPtCourseData,
  OrganizationPtStudentData,
} from "../type";

interface GymPtStudentsModalProps {
  data: OrganizationPtCourseData;
}

export default function GymPtStudentsModal({
  data,
}: GymPtStudentsModalProps) {
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [students, setStudents] = useState<OrganizationPtStudentData[]>([]);

  const getProgressRate = (student: OrganizationPtStudentData) => {
    if (student.totalSessionCount <= 0) return 0;

        return Math.min(
            100,
            Math.round(
            (student.progressCount / student.totalSessionCount) * 100
            )
        );
    };

  const openModal = async () => {
    setIsModal(true);
    setIsLoading(true);
    setErrorMessage("");

    const response = await getOrganizationPtStudentsAction(data.ptCourseId);

    if (response.success) {
      setStudents(response.data);
    } else {
      setStudents([]);
      setErrorMessage(response.message);
    }

    setIsLoading(false);
  };

  const closeModal = () => {
    if (!isLoading) {
      setIsModal(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="w-fit whitespace-nowrap rounded-full border border-[#BFFF0B4D] px-3 py-1 text-[12px] font-bold text-[#BFFF0B]"
      >
        수강생 보기
      </button>

      {isModal && (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby={`pt-students-${data.ptCourseId}`}
          className="fixed left-0 top-0 z-[999] h-screen w-screen bg-black/50"
          onClick={closeModal}
        >
          <div
            className="fixed left-1/2 top-1/2 z-[1000] flex max-h-[80vh] w-4/5 -translate-x-1/2 -translate-y-1/2 flex-col gap-5 overflow-hidden rounded-2xl border border-[#1E2939] bg-gradient-to-br from-[#101828] to-[#000] p-6 sm:w-[560px]"
            onClick={(event) => event.stopPropagation()}
          >
            <article className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <h3
                  id={`pt-students-${data.ptCourseId}`}
                  className="mb-1 text-lg font-bold text-[#E8EAF0] md:text-xl"
                >
                  {data.title}
                </h3>
                <p className="text-[12px] font-normal text-[#6A7282]">
                  {data.trainerName} · {data.totalSessionCount}회 · {data.price.toLocaleString("ko-KR")}원
                </p>
              </div>
              <button
                type="button"
                aria-label="수강생 목록 닫기"
                onClick={closeModal}
                className="text-xl text-[#99A1AF]"
              >
                ×
              </button>
            </article>

            <div className="min-h-32 overflow-y-auto">
              {isLoading ? (
                <p className="py-10 text-center text-sm text-[#99A1AF]">
                  수강생 목록을 불러오는 중입니다.
                </p>
              ) : errorMessage ? (
                <p className="py-10 text-center text-sm text-red-400">
                  {errorMessage}
                </p>
              ) : students.length === 0 ? (
                <p className="py-10 text-center text-sm text-[#99A1AF]">
                  등록된 수강생이 없습니다.
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-[1.3fr_1fr_1fr] border-b border-[#364153] px-2 py-3 text-[11px] font-bold text-[#6A7282] mb-3">
                    <div>수강생</div>
                    <div>등록일</div>
                    <div>진행률</div>
                  </div>
                  {students.map((student) => (
                    <div
                      key={`${student.userName}-${student.enrolledAt}`}
                      className="grid grid-cols-[1.3fr_1fr_1fr] items-center border-b border-[#364153] px-4 py-3 last:border-b-0 bg-[#1E293966] rounded-[14px] mb-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#4A5565] bg-[#364153] text-[12px] font-bold text-[#D1D5DC]">
                          {student.userName.charAt(0)}
                        </span>
                        <span className="text-[14px] font-bold text-white">
                          {student.userName}
                        </span>
                      </div>
                      <div className="text-[12px] font-normal text-[#99A1AF]">
                        {(student.enrolledAt).split("T")[0]}
                      </div>
                      <div className="flex flex-col gap-1 text-[12px] font-bold text-[#BFFF0B] text-right">
                        {student.progressCount}/{student.totalSessionCount}회
                        <div className="w-full h-1.5 bg-[#364153] rounded-full">
                            <p className={`bg-[#BFFF0B] w-[${getProgressRate(student)}px]`}></p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={closeModal}
              className="flex w-full items-center justify-center rounded-lg bg-[#BFFF0B] py-3 text-center text-base font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              닫기
            </button>
          </div>
        </section>
      )}
    </>
  );
}
