'use client'
import { AlarmRead, AlarmRemove } from "@/components/ui/image";
import { deleteAlarmsAction, readAlarmsAction } from "../action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AlarmReadDeleteButton({ text, alarm }: { text: '읽음' | '삭제', alarm: number }) {
    const router = useRouter();

    const handleAlarmAction = async () => {
        try {
            if (text === '읽음') {
                await readAlarmsAction([alarm]);
                toast.success('알림을 읽음 처리했습니다.');
            } else {
                await deleteAlarmsAction([alarm]);
                toast.success('알림을 삭제했습니다.');
            }

            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : '알림 처리 중 오류가 발생했습니다.');
        }
    };

    return (
        <div
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void handleAlarmAction();
            }}
            className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold transition-colors sm:gap-2 sm:px-2.5 ${text === '읽음'
                ? 'text-[#BFFF0B] hover:bg-[#BFFF0B]/10'
                : 'text-[#99A1AF] hover:bg-[#364153] hover:text-white'}`}>
            <img src={text === '읽음' ? AlarmRead : AlarmRemove} alt={`알람 ${text} 표시`} />
            {/* <div className="relative w-4 h-4">
                <Image
                    src={text === '읽음' ? AlarmRead : AlarmRemove}
                    alt={`알람 ${text} 표시`}
                    fill
                    sizes="w-8 h-8"
                    className="object-cover"
                />
            </div> */}
            <span className="whitespace-nowrap">{text}</span>
        </div>
    );
}
