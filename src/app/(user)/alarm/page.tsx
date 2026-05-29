import { AlarmAlarm, AlarmAllRead, AlarmAllRemove } from "@/components/ui/image";
import AlarmCard from "@/feature/alarm/components/AlarmCard";

export default function AlarmPage() {
  return (
    <div className="flex flex-col gap-6 px-60 pt-8">
      <div className="flex gap-[12px] items-center">
        <img src={AlarmAlarm} alt="알람 상단 알람 표시" />
        <p className="text-[20px] font-extrabold text-white"> 알림 </p>
        <p className="bg-[#BFFF0B] rounded-full px-[8px] py-[2px] font-extrabold text-[12px]"> 2 </p>
      </div>

      <div className="flex gap-[14px] justify-end">
        <div className="flex gap-[8px]"> 
            <img src={AlarmAllRead} alt="알람 모두 읽음 표시"/>
            <p className="text-[12px] text-[#99A1AF] font-medium whitespace-nowrap hover:cursor-pointer hover:text-[#BFFF0B]"> 모두 읽음 </p>
        </div>
        <div className="flex gap-[8px]"> 
            <img src={AlarmAllRemove} alt="알람 전체 삭제 표시"/>
            <p className="text-[12px] text-[#99A1AF] font-medium whitespace-nowrap hover:cursor-pointer hover:text-[#BFFF0B]"> 전체 삭제 </p>
        </div>
      </div>
      <AlarmCard />
    </div>
  );
}
