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
    <main className="mx-auto w-full max-w-[1120px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-12">
      <header className="flex flex-col gap-4 border-b border-[#364153] pb-6 sm:gap-5 sm:pb-8">
        <div className="flex items-start justify-between gap-4 max-[360px]:flex-col max-[360px]:gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#364153] bg-[#1E2939] sm:h-11 sm:w-11">
              <Image
                src={AlarmAlarm}
                alt="알림"
                fill
                sizes="48px"
                className="p-3"
              />
            </div>
            <div>
              <h1 className="text-xl font-black text-white sm:text-2xl">알림</h1>
              <p className="mt-1 text-xs font-medium text-[#99A1AF] sm:text-sm">새로운 소식과 필요한 작업을 확인하세요.</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#BFFF0B4D] bg-[#BFFF0B]/10 px-3 py-2 max-[360px]:self-end sm:px-4">
            <span className="text-sm font-black text-[#BFFF0B] sm:text-base">{readAllFilter.length}</span>
            <span className="text-[10px] font-semibold text-[#D1D5DC] sm:text-xs">미읽음</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <AlarmReadDeleteAllButton text={'모두 읽음'} alarms={readAllFilter} />
          <AlarmReadDeleteAllButton text={'모두 삭제'} alarms={deleteAllFilter} />
        </div>
      </header>

      <section className="mt-8 sm:mt-10">
        <div className="mb-4 flex items-end justify-between sm:mb-5">
          <div>
            <h2 className="text-base font-extrabold text-white sm:text-lg">전체 알림</h2>
            <p className="mt-1 text-xs font-medium text-[#6A7282] sm:text-sm">최근 알림부터 확인할 수 있습니다.</p>
          </div>
          <span className="text-xs font-semibold text-[#99A1AF] sm:text-sm">총 {alarms.length}개</span>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {alarms.length > 0 ? (
            alarms.map((alarm) => <AlarmCard alarm={alarm} key={alarm.notificationId} />)
          ) : (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[#364153] bg-[#101828] px-5 py-14 text-center">
              <p className="text-base font-bold text-white">새로운 알림이 없습니다.</p>
              <p className="text-xs text-[#99A1AF] sm:text-sm">새로운 소식이 도착하면 이곳에서 확인할 수 있어요.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
