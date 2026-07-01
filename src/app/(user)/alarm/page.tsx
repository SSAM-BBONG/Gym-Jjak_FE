import { AlarmAlarm, AlarmAllRead, AlarmAllRemove } from "@/components/ui/image";
import AlarmCard from "@/feature/alarm/components/AlarmCard";
import AlarmReadDeleteAllButton from "@/feature/alarm/components/AlarmReadDeleteAllButton";
import { Alarm } from "@/feature/alarm/type";
import { getAlarms } from "@/service/alarm.service";
import Image from "next/image";

export default async function AlarmPage() {

  const response = await getAlarms();
  const alarms: Alarm[] = response.data.content;

  const deleteAllFilter = alarms.map((alarm) => alarm.notificationId)
  const readAllFilter = alarms.filter((alarm) => !alarm.read).map((alarm) => alarm.notificationId)

  return (
    <div className="flex flex-col gap-6 px-60 pt-8">
      <div className="flex gap-[12px] items-center">
        <div className="relative w-6 h-6">
          <Image
            src={AlarmAlarm}
            alt="알람 상단 알람 표시"
            fill
            priority
            sizes="w-20 h-20"
            className="object-cover"
          />
        </div>
        <p className="text-[20px] font-extrabold text-white"> 알림 </p>
        <p className="bg-[#BFFF0B] rounded-full px-[8px] py-[2px] font-extrabold text-[12px]"> {readAllFilter.length} </p>
      </div>

      <div className="flex gap-[14px] justify-end">
        <AlarmReadDeleteAllButton text={'모두 읽음'} alarms={deleteAllFilter} />
        <AlarmReadDeleteAllButton text={'모두 삭제'} alarms={readAllFilter} />
      </div>
      {alarms.map((alarm) => {
        return <AlarmCard alarm={alarm} key={alarm.notificationId} />
      })}

    </div>
  );
}
