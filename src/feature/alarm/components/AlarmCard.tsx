import Link from "next/link";
import { Alarm } from "../type";
import AlarmReadDeleteButton from "./AlarmReadDeleteButton";

export default async function AlarmCard({ alarm }: { alarm: Alarm }) {

  const typeVariants = {
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

  return (
    <>
      <Link
        href={typeVariants[alarm.type]}
        className="flex flex-col gap-3 bg-[#101828] border-[1px] border-[#364153] rounded-[14px] pl-8 pr-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="flex items-center justify-center rounded-[4px] text-[10px] font-extrabold px-2 text-white bg-purple-400"> {alarm.categoryLabel} </div>
            <p className="text-[14px] font-semibold text-white"> {alarm.title} </p>
          </div>
          <p className="text-[10px] font-semibold text-[#4A5565]"> {alarm.eventAt}</p>
        </div>
        <p className="text-[14px] font-normal text-[#99A1AF]"> {alarm.content}</p>
        <div className="flex gap-3 mt-2">
          <AlarmReadDeleteButton text={'읽음'} alarm={alarm.notificationId} />
          <AlarmReadDeleteButton text={'삭제'} alarm={alarm.notificationId} />
        </div>
      </Link>
    </>
  );
}
