'use client'

import { AlarmAllRead, AlarmAllRemove } from "@/components/ui/image";
import { deleteAlarmsAction, readAlarmsAction } from "../action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AlarmReadDeleteAllButton({ text, alarms }: { text: '모두 읽음' | '모두 삭제', alarms: number[] }) {
    const router = useRouter();
    const isReadAction = text === '모두 읽음';

    const handleAlarmsAction = async () => {
        try {
            if (text === '모두 읽음') {
                await readAlarmsAction(alarms);
                toast.success('모든 알림을 읽음 처리했습니다.');
            } else {
                await deleteAlarmsAction(alarms);
                toast.success('모든 알림을 삭제했습니다.');
            }

            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : '알림 처리 중 오류가 발생했습니다.');
        }
    };

    return (
        <button
            onClick={() => {
                void handleAlarmsAction();
            }}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-colors sm:px-4 sm:py-2.5 sm:text-sm ${isReadAction
                ? 'bg-[#BFFF0B] text-black hover:bg-[#D4FF65]'
                : 'border border-[#364153] bg-[#1E2939] text-[#D1D5DC] hover:border-[#6A7282] hover:bg-[#364153]'}`}
        >
            <div className="relative h-4 w-4 sm:h-5 sm:w-5">
                <Image
                    src={text === '모두 읽음' ? AlarmAllRead : AlarmAllRemove}
                    alt={`알람 ${text} 표시`}
                    fill
                    sizes="w-8 h-8"
                    className="object-cover"
                />
            </div>
            <span className="whitespace-nowrap">{text}</span>
        </button>
    );
}
