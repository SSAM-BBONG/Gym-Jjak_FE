import { AlarmRead, AlarmRemove } from "@/components/ui/image";
// import { getAlarms } from "@/service/alarm.service";

export default async function AlarmCard() {

  // const data = await getAlarms();

  return (
    <>
    {/* {data.map((alram) => ( */}
    <div className="flex flex-col gap-3 bg-[#101828] border-[1px] border-[#364153] rounded-[14px] pl-8 pr-4 py-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="flex items-center justify-center rounded-[4px] text-[10px] font-extrabold px-2 text-white bg-purple-400"> 카테고리 </div>
          <p className="text-[14px] font-semibold text-white"> 알람 제목 </p>
        </div>
        <p className="text-[10px] font-semibold text-[#4A5565]"> 알림 시간(1분전)</p>
      </div>
      <p className="text-[14px] font-normal text-[#99A1AF]"> 알람 내용</p>
      <div className="flex gap-3 mt-2">
        <div className="flex gap-2 items-center">
          <img src={AlarmRead} alt="알람 읽음 표시" />
          <p className="text-[12px] font-normal text-[#6A7282] whitespace-nowrap"> 읽음 표시</p>
        </div>
        <div className="flex gap-2 items-center">
          <img src={AlarmRemove} alt="알람 삭제 표시" />
          <p className="text-[12px] font-normal text-[#6A7282] whitespace-nowrap"> 삭제</p>
        </div>
      </div>
    </div>
    {/* ))} */}
    </>
  );
}
