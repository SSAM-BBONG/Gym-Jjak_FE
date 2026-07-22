"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useEffect, useMemo, useRef, useState } from "react"

interface MealCalendarProps {
  selectDate?: Date
  setSelectDate?: (date: Date) => void
  className?: string
}

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1)

const isSameDay = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate()

const isSameMonth = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth()

function MealCalendar({ selectDate, setSelectDate, className }: MealCalendarProps) {

  const today = useMemo(() => new Date(), [])
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(selectDate && selectDate <= today ? selectDate : today)
  )
  const datesRef = useRef<HTMLDivElement>(null)

  const dates = useMemo(() => {
    const lastDate = isSameMonth(visibleMonth, today)
      ? today.getDate()
      : new Date(
        visibleMonth.getFullYear(),
        visibleMonth.getMonth() + 1,
        0
      ).getDate()

    return Array.from(
      { length: lastDate },
      (_, index) =>
        new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), index + 1)
    )
  }, [today, visibleMonth])

  const isCurrentMonth = isSameMonth(visibleMonth, today)

  const moveMonth = (amount: number) => {
    const nextMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() + amount,
      1
    )

    if (nextMonth > startOfMonth(today)) return

    setVisibleMonth(nextMonth)
  }

  useEffect(() => {
    const container = datesRef.current
    if (!container) return

    if (isCurrentMonth) {
      container.scrollTo({ left: container.scrollWidth, behavior: "smooth" })
      return
    }

    container.scrollTo({ left: 0, behavior: "smooth" })
  }, [isCurrentMonth, visibleMonth])


  return (
    <section
      aria-label="식단 날짜 선택"
      className={cn(
        "w-full min-w-0 bg-[#0B0F19] px-1 py-3 text-white sm:px-2 sm:py-4 lg:px-0",
        className
      )}
    >
      <header className="grid grid-cols-[36px_1fr_36px] items-center gap-2 sm:grid-cols-[40px_1fr_40px] sm:gap-3 lg:grid-cols-[44px_1fr_44px]">
        <button
          type="button"
          aria-label="이전 달"
          onClick={() => moveMonth(-1)}
          className="flex size-9 items-center justify-center rounded-xl border border-[#364153] bg-[#1E2939] text-[#99A1AF] transition-colors hover:text-white sm:size-10 sm:rounded-2xl lg:size-11"
        >
          <ChevronLeftIcon className="size-5 sm:size-5.5 lg:size-6" />
        </button>

        <h2 className="text-center text-lg font-black sm:text-xl lg:text-2xl">
          {visibleMonth.getFullYear()}.
          {String(visibleMonth.getMonth() + 1).padStart(2, "0")}
        </h2>

        <button
          type="button"
          aria-label="다음 달"
          disabled={isCurrentMonth}
          onClick={() => moveMonth(1)}
          className="flex size-9 items-center justify-center rounded-xl border border-[#364153] bg-[#1E2939] text-[#99A1AF] transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-[#99A1AF] sm:size-10 sm:rounded-2xl lg:size-11"
        >
          <ChevronRightIcon className="size-5 sm:size-5.5 lg:size-6" />
        </button>
      </header>

      <div
        ref={datesRef}
        className="mt-5 flex w-full touch-pan-x snap-x snap-mandatory gap-2 overflow-x-auto pb-2 sm:mt-6 sm:gap-2.5 lg:mt-8 lg:gap-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {dates.map((date) => {
          const isselectDate = selectDate ? isSameDay(date, selectDate) : false

          return (
            <button
              key={date.toISOString()}
              type="button"
              aria-pressed={isselectDate}
              onClick={() => setSelectDate?.(date)}
              className={cn(
                "shrink-0 snap-start rounded-full border px-4 py-1.5 text-sm font-bold transition-colors sm:px-5 sm:py-2 sm:text-[15px] lg:px-6 lg:text-base",
                isselectDate
                  ? "border-[#BFFF0B] bg-[#BFFF0B] text-black"
                  : "border-[#364153] bg-[#1E2939] text-[#99A1AF] hover:border-[#BFFF0B] hover:text-white"
              )}
            >
              {String(date.getMonth() + 1).padStart(2, "0")}.
              {String(date.getDate()).padStart(2, "0")}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export { MealCalendar }
