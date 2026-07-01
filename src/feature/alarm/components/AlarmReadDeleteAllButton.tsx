'use client'

import { AlarmAllRead, AlarmAllRemove } from "@/components/ui/image";
import { deleteAlarmsAction, readAlarmsAction } from "../action";
import Image from "next/image";

export default function AlarmReadDeleteAllButton({ text, alarms }: { text: '모두 읽음' | '모두 삭제', alarms: number[] }) {

    return (
        <button
            onClick={text === '모두 읽음' ? () => readAlarmsAction(alarms) : () => deleteAlarmsAction(alarms)}
            className="flex gap-[8px]"
        >
            <div className="relative w-4 h-4">
                <Image
                    src={text === '모두 읽음' ? AlarmAllRead : AlarmAllRemove}
                    alt={`알람 ${text} 표시`}
                    fill
                    priority
                    sizes="w-8 h-8"
                    className="object-cover"
                />
            </div>
            <p className="text-[12px] text-[#99A1AF] font-medium whitespace-nowrap hover:cursor-pointer hover:text-[#BFFF0B]"> {text} </p>
        </button>
    );
}