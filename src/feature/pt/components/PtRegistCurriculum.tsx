"use client";

import { PtRegistFormValue } from "@/lib/ptRegistSchema";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

interface PtRegistCurriculumProps {
  setValue: UseFormSetValue<PtRegistFormValue>;
  error?: string;
  initialCurriculums?: CurriculumItem[];
}

interface CurriculumItem {
  id?: number;
  title: string;
  content: string;
}

export default function PtRegistCurriculum({
  setValue,
  error,
  initialCurriculums = [],
}: PtRegistCurriculumProps) {
  const [curriculumTitleInput, setCurriculumTitleInput] = useState("");
  const [curriculumContentInput, setCurriculumContentInput] = useState("");
  const [curriculums, setCurriculums] = useState<CurriculumItem[]>(initialCurriculums);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const syncCurriculums = (nextCurriculums: CurriculumItem[]) => {
    setCurriculums(nextCurriculums);
    setValue("curriculums", nextCurriculums, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const clearEditor = () => {
    setEditingIndex(null);
    setCurriculumTitleInput("");
    setCurriculumContentInput("");
  };

  const handleSaveCurriculum = () => {
    const title = curriculumTitleInput.trim();
    const content = curriculumContentInput.trim();

    if (!title || !content) return;

    const nextCurriculums = editingIndex === null
      ? [...curriculums, { title, content }]
      : curriculums.map((curriculum, index) => (
        index === editingIndex ? { ...curriculum, title, content } : curriculum
      ));

    syncCurriculums(nextCurriculums);
    clearEditor();
  };

  const handleEditCurriculum = (index: number) => {
    const curriculum = curriculums[index];
    setEditingIndex(index);
    setCurriculumTitleInput(curriculum.title);
    setCurriculumContentInput(curriculum.content);
  };

  const handleRemoveCurriculum = (removeIndex: number) => {
    syncCurriculums(curriculums.filter((_, index) => index !== removeIndex));

    if (editingIndex === removeIndex) clearEditor();
    if (editingIndex !== null && editingIndex > removeIndex) setEditingIndex(editingIndex - 1);
  };

  return (
    <div className="flex flex-col gap-6 rounded-[16px] border border-[#1E2939] bg-[#101828] p-6">
      <div className="flex items-center justify-between">
        <p className="text-[18px] font-extrabold text-white">커리큘럼</p>
        <span className="text-[14px] font-medium text-[#99A1AF]">{curriculums.length}개 등록됨</span>
      </div>

      <div className="flex flex-col gap-4 rounded-[10px] bg-[#1E2939] p-4">
        <p className="text-[14px] font-bold text-white">
          {editingIndex === null ? "새 커리큘럼 작성" : `${editingIndex + 1}회차 커리큘럼 수정`}
        </p>
        <input
          value={curriculumTitleInput}
          onChange={(event) => setCurriculumTitleInput(event.target.value)}
          className="rounded-[10px] border border-[#364153] bg-[#101828] px-3 py-2 text-[14px] font-normal text-white"
          type="text"
          placeholder="커리큘럼 제목"
        />
        <textarea
          value={curriculumContentInput}
          onChange={(event) => setCurriculumContentInput(event.target.value)}
          className="min-h-[96px] rounded-[10px] border border-[#364153] bg-[#101828] px-3 py-2 text-[14px] font-normal text-white"
          placeholder="커리큘럼 설명"
        />
        <div className="flex justify-end gap-2">
          {editingIndex !== null && (
            <button type="button" onClick={clearEditor} className="rounded-[10px] bg-[#364153] px-4 py-2 text-[14px] font-medium text-white">취소</button>
          )}
          <button
            type="button"
            disabled={!curriculumTitleInput.trim() || !curriculumContentInput.trim()}
            onClick={handleSaveCurriculum}
            className="rounded-[10px] bg-[#BFFF0B] px-4 py-2 text-[14px] font-extrabold text-black disabled:cursor-not-allowed disabled:bg-[#364153] disabled:text-[#99A1AF]"
          >
            {editingIndex === null ? "커리큘럼 추가" : "수정 완료"}
          </button>
        </div>
      </div>

      {curriculums.length === 0 ? (
        <p className="rounded-[10px] border border-dashed border-[#364153] px-4 py-6 text-center text-[14px] text-[#99A1AF]">
          회차별 제목과 설명을 입력한 뒤 커리큘럼을 추가해 주세요.
        </p>
      ) : (
        curriculums.map((curriculum, index) => (
          <div key={curriculum.id ?? `${curriculum.title}-${index}`} className="flex flex-col gap-4 rounded-[10px] bg-[#1E2939] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-extrabold text-[#BFFF0B]">{index + 1}회차</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => handleEditCurriculum(index)} className="rounded-[10px] bg-[#364153] px-3 py-1 text-[14px] font-extrabold text-white">수정</button>
                <button type="button" onClick={() => handleRemoveCurriculum(index)} className="rounded-[10px] bg-[#82181A4D] px-3 py-1 text-[14px] font-extrabold text-[#FF6467]">삭제</button>
              </div>
            </div>
            <p className="rounded-[10px] border border-[#364153] bg-[#101828] px-3 py-2 text-[14px] font-normal text-white">{curriculum.title}</p>
            <p className="whitespace-pre-wrap rounded-[10px] border border-[#364153] bg-[#101828] px-3 py-2 text-[14px] font-normal text-white">{curriculum.content}</p>
          </div>
        ))
      )}
      {error && <p className="text-[14px] text-red-400">{error}</p>}
    </div>
  );
}
