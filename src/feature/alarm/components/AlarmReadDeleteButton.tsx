'use client'
import { AlarmRead, AlarmRemove } from "@/components/ui/image";
import { deleteAlarmsAction, readAlarmsAction } from "../action";

export default function AlarmReadDeleteButton({ text, alarm }: { text: '읽음' | '삭제', alarm: number }) {
    return (
        <div
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); text === '읽음' ? readAlarmsAction([alarm]) : deleteAlarmsAction([alarm]); }}
            className="flex gap-2 items-center">
            <img src={text === '읽음' ? AlarmRead : AlarmRemove} alt={`알람 ${text} 표시`} />
            <p className="text-[12px] font-normal text-[#6A7282] whitespace-nowrap"> {text}</p>
        </div>
    );
}