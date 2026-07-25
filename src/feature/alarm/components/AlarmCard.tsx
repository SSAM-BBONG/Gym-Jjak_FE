import Link from "next/link";
import { format } from "date-fns";
import { Alarm } from "../type";
import AlarmReadDeleteButton from "./AlarmReadDeleteButton";

export default async function AlarmCard({ alarm }: { alarm: Alarm }) {

  const typeVariants: Partial<Record<Alarm["type"], string>> = {
    'TRAINER_APPLICATION_APPROVED': '/mypage/trainerprofile',
    'TRAINER_APPLICATION_REJECTED': '/mypage/trainerprofile',
    'ORGANIZATION_APPLICATION_APPROVED': '/mypage/organization',
    'ORGANIZATION_APPLICATION_REJECTED': '/mypage/organization',
    'PT_RESERVATION_REQUESTED': `/pt/manage/${alarm.targetId}`,
    'PT_RESERVATION_APPROVED': `/pt/records/${alarm.targetId}`,
    'PT_RESERVATION_REJECTED': '',
    'PT_RESERVATION_CANCELED': '',
    'PT_REMINDER': `/pt/records/${alarm.targetId}`,
    'FEEDBACK_CREATED': `/pt/records/${alarm.targetId}`,
  };

  const alarmHref = typeVariants[alarm.type];
  const formattedEventAt = alarm.eventAt
    ? format(new Date(alarm.eventAt), 'yyyy-MM-dd HH:mm')
    : '';
  const isUnread = !alarm.read;
  const categoryClassNames: Record<string, string> = {
    PT: 'bg-[#BFFF0B]/15 text-[#BFFF0B]',
    FEEDBACK: 'bg-[#A78BFA]/15 text-[#C4B5FD]',
    ORGANIZATION: 'bg-[#60A5FA]/15 text-[#93C5FD]',
    TRAINER: 'bg-[#F472B6]/15 text-[#F9A8D4]',
  };
  const categoryClassName =
    categoryClassNames[alarm.category] ?? 'bg-[#1E2939] text-[#D1D5DC]';
  const cardContent = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3 sm:gap-4">
          <span
            aria-hidden="true"
            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${isUnread ? 'bg-[#BFFF0B] shadow-[0_0_10px_rgba(191,255,11,0.75)]' : 'bg-[#4A5565]'}`}
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold sm:text-xs ${categoryClassName}`}>{alarm.categoryLabel}</span>
              {isUnread && <span className="text-[10px] font-bold text-[#BFFF0B] sm:text-xs">새 알림</span>}
            </div>
            <p className="mt-2 text-sm font-extrabold text-white sm:text-base">{alarm.title}</p>
          </div>
        </div>
        {formattedEventAt && <time dateTime={alarm.eventAt ?? undefined} className="shrink-0 text-[10px] font-semibold text-[#6A7282] sm:text-xs">{formattedEventAt}</time>}
      </div>
      <p className="pl-5 text-xs font-normal text-[#99A1AF] sm:pl-6 sm:text-sm">{alarm.content}</p>
      <div className="ml-5 flex gap-2 border-t border-[#364153] pt-3 sm:ml-6 sm:gap-3 sm:pt-4">
        <AlarmReadDeleteButton text={'읽음'} alarm={alarm.notificationId} />
        <AlarmReadDeleteButton text={'삭제'} alarm={alarm.notificationId} />
      </div>
    </>
  );

  const cardClassName = `group flex flex-col gap-3 rounded-2xl border p-4 transition-colors sm:gap-4 sm:p-5 ${isUnread
    ? 'border-[#BFFF0B4D] bg-gradient-to-r from-[#19210F] via-[#101828] to-[#101828] hover:border-[#BFFF0B99]'
    : 'border-[#364153] bg-[#101828] hover:border-[#6A7282] hover:bg-[#17213A]'}`;

  return (
    alarmHref ? (
      <Link
        href={alarmHref}
        className={cardClassName}>
        {cardContent}
      </Link>
    ) : (
      <div className={cardClassName}>{cardContent}</div>
    )
  );
}
