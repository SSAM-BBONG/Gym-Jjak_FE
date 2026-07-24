import { PtCourseListData } from "../type";
import PtFindCard from "./PtFindCard";
import Link from "next/link";
import { useRef } from "react";
import type { TouchEvent, WheelEvent } from "react";

interface PtFindListProps {
  response: PtCourseListData[];
  organizationId: number | null;
  isMobileSheet?: boolean;
  isExpanded?: boolean;
  onExpandedChange?: (isExpanded: boolean) => void;
}

export default function PtFindList({ response, organizationId, isMobileSheet = false, isExpanded = false, onExpandedChange }: PtFindListProps) {
    // 터치 위치 useRef로 저장 
    const touchStartY = useRef<number | null>(null);

    // 터치 시작 함수
    const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
        if (!isMobileSheet) return;

        // 터치 시작시 Y 좌표 useRef에 저장
        touchStartY.current = event.touches[0]?.clientY ?? null;
    };

    // 터치 종료 함수
    const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
        if (!isMobileSheet || !onExpandedChange) return;

        // 터치 시작했을 떄 Y 좌표 가져오기
        const startY = touchStartY.current;
        
        // 터치 종료시 Y 좌표 값
        const endY = event.changedTouches[0]?.clientY;
        touchStartY.current = null;

        if (startY === null || endY === undefined) return;

        // 터치 시작, 종료 값 기반으로 계산
        const swipeDistance = startY - endY;

        // 값이 음수일떄 위 -> 아래, 값이 양수일때 아래 -> 위
        // 설정한 값만큼 움직이면 확장 true -> 부모 요소로 전달
        if (!isExpanded && swipeDistance > 48) {
            onExpandedChange(true);
        }

        // 이미 확장된 상태일 떄 실수로 접히지 않게 scrollTop이 0일떄만 아래 방향으로 접히게 설정
        if (isExpanded && event.currentTarget.scrollTop === 0 && swipeDistance < -48) {
            onExpandedChange(false);
        }
    };

    // 데스크톱 마우스 휠 이벤트 함수
    const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
        // 모바일과 동작 흐름은 같음
        if (!isMobileSheet || !onExpandedChange || Math.abs(event.deltaY) < 48) return;

        if (!isExpanded && event.deltaY > 0) {
            onExpandedChange(true);
        }

        if (isExpanded && event.currentTarget.scrollTop === 0 && event.deltaY < 0) {
            onExpandedChange(false);
        }
    };

    // 모바일에서 하단 컨테이너 css 설정
    const containerClassName = isMobileSheet
        ? `absolute bottom-0 left-0 z-10 flex w-full flex-col gap-4 overflow-y-auto border border-b-0 border-[#36415380] bg-[linear-gradient(135deg,rgba(16,24,40,0.98)_0%,rgba(30,41,57,0.98)_100%)] p-4 shadow-[0_-12px_30px_rgba(0,0,0,0.35)] transition-[height] duration-300 scrollbar-none sm:gap-5 sm:p-5 ${isExpanded ? "h-[90%] rounded-t-3xl" : "h-[20%] rounded-t-3xl"}`
        : "flex h-full w-full flex-none flex-col gap-4 overflow-y-auto p-4 scrollbar-none sm:gap-5 sm:p-5 lg:h-auto lg:w-auto lg:flex-4 lg:gap-4 lg:p-4 xl:flex-3 xl:gap-5 xl:p-5 2xl:gap-6 2xl:p-6";

    return (
        <div
            className={containerClassName}
            onTouchEnd={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onWheel={handleWheel}
        >
            {/* 모바일에서만 나타나는 문구 */}
            {isMobileSheet && (
                <div className="flex flex-col gap-2">
                    <div className="mx-auto h-1.5 w-10 rounded-full bg-[#6A7282]" />
                    {!isExpanded && (
                        <p className="py-4 text-center text-xs font-medium text-[#99A1AF]">위로 밀어 PT 목록 보기</p>
                    )}
                </div>
            )}
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-3">
                    <p className="text-[20px] font-black text-white sm:text-[22px] lg:text-[24px]"> PT 목록 </p>
                    {organizationId && (
                        <Link
                            href={`/pt/organization/${organizationId}`}
                            className="shrink-0 rounded-lg border border-[#BFFF0B] px-3 py-2 text-sm font-bold text-[#BFFF0B] transition hover:bg-[#BFFF0B] hover:text-[#101828]"
                        >
                            헬스장 조회
                        </Link>
                    )}
                </div>
                <p className="text-[12px] font-normal text-[#6A7282] sm:text-[14px]"> 가까운 곳에서 마음에 드는 PT를 찾아보세요</p>
            </div>

        {response.map((item) => (
            <PtFindCard
                key={item.ptCourseId}
                response={item}
            />
        ))}

        {response.length === 0 && (
            <div className="flex items-center justify-center py-12 text-[`#6A7282`]">
                <p className="text-[16px] font-medium">
                    해당 헬스장의 PT 프로그램이 없습니다.
                </p>
            </div>
        )}
        </div>
    );
}