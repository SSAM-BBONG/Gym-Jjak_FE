"use client"

import * as React from "react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "lucide-react"
import { CalendarPtImg } from "./image"
import Image from "next/image"

function MainCalendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  daysData,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  daysData: Days[],
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar p-2 border-0 border-none shadow-none outline-none bg-[#0B0F19]",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-3/5 bg-[#0B0F19]  border-[#0B0F19]", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row  bg-[#0B0F19]",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-end gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          'text-white hover:text-gray-500 hover:bg-[#0B0F19]',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          'text-white hover:text-gray-500 hover:bg-[#0B0F19]',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size) justify-start",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative rounded-(--cell-radius)",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "font-medium select-none text-white ",
          captionLayout === "label"
            ? "text-2xl"
            : "flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        month_grid: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 rounded-(--cell-radius) text-[0.8rem] font-normal text-muted-foreground select-none",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] text-muted-foreground select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none",
          defaultClassNames.day
        ),
        range_start: cn(
          "relative isolate z-0  bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          "text-red-500 relative isolate z-0 bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted",
          defaultClassNames.range_end
        ),
        today: cn(
          "rounded-(--cell-radius) text-foreground data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn("border-0 border-none shadow-none outline-none bg-[#0B0F19]", className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon className={cn("size-4", className)} {...props} />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} daysData={daysData} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  daysData,
  ...props
}: React.ComponentProps<typeof DayButton> & { daysData: Days[], locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames()
  const isCurrentMonthDay = !modifiers.outside;

  day.date.toLocaleDateString('ko-KR');
  const dayOfWeek = day.date.getDay();
  const isSunday = dayOfWeek === 0;
  const isSaturday = dayOfWeek === 6;
  const year = day.date.getFullYear();
  const month = String(day.date.getMonth() + 1).padStart(2, '0');
  const date = String(day.date.getDate()).padStart(2, '0');

  const formatDay = `${year}-${month}-${date}`

  const todayData: Days | undefined = daysData?.find((dayData) => {
    return dayData.date === formatDay
  })

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "flex justify-start relative isolate z-10 p-1 aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-[50%] data-[range-end=true] data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-[50%] data-[range-start=true]:text-primary-foreground data-[selected-single=true]:border data-[selected-single=true]:border-[#BFFF0B] data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    >
      <div className="w-full flex justify-between items-center">
        <div
          className={cn(
            " border-0 rounded-[50%] w-5 h-5 leading-none font-medium text-sm data-[selected-single=true]:border-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70",
            "data-[selected-single=true]:border-[#BFFF0B] data-[selected-single=true]:border data-[selected-single=true]:text-[#BFFF0B]",
            isCurrentMonthDay && 'text-white',
            isSunday && "text-red-500",
            isSaturday && "text-blue-400",
            !isCurrentMonthDay && 'text-gray-500',
            modifiers.today && "bg-[#BFFF0B] text-black",
            defaultClassNames.day,
            className
          )}
        >{day.date.getDate()}</div>
        {todayData?.pt && (
          <div className="relative w-5 h-5">
            <Image
              src={CalendarPtImg}
              alt="헬스 이미지"
              fill
              sizes="w-10 h-10"
              className="object-cover"
            />
          </div>)}
      </div>
      {todayData?.diaryTitle && <div className="bg-[#BFFF0B] w-full p-0.5 text-black mt-auto">
        {todayData.diaryTitle.length > 4 ? `${todayData.diaryTitle.slice(0, 4)}...` : `${todayData.diaryTitle}`}
      </div>}
    </Button>
  )
}

export { MainCalendar, CalendarDayButton }
