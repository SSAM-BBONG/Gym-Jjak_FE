'use client'
import { AlarmRead, AlarmRemove } from "@/components/ui/image";
import { deleteAlarmsAction, readAlarmsAction } from "../action";
import { useRouter } from "next/navigation";

export default function AlarmReadDeleteButton({ text, alarm }: { text: '읽음' | '삭제', alarm: number }) {
    const router = useRouter();

    const handleAlarmAction = async () => {
        if (text === '읽음') {
            await readAlarmsAction([alarm]);
        } else {
            await deleteAlarmsAction([alarm]);
        }

        router.refresh();
    };

    return (
        <div
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void handleAlarmAction();
            }}
            className="flex gap-2 items-center">
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
            <p className="text-[12px] font-normal text-[#6A7282] whitespace-nowrap"> {text}</p>
        </div>
    );
}
