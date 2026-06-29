// "use client";

// import { useAlarmSocket } from "@/components/hooks/useAlarmSocket";
// import { useEffect, useState } from "react";
// import { Alarm } from "../type";
// import { useRouter } from "next/navigation";


// export default function AlarmSocket() {
//     const [alarm, setAlarm] = useState<Alarm | null>(null);
//     const router = useRouter();

//     useAlarmSocket({
//         enabled: true,

//         onNotification: (alarm) => {
//             setAlarm(alarm);
//         },

//         onError: (error) => {
//             console.error("알림 오류:", error);
//         },
//     });

//     useEffect(() => {
//         if (!alarm) return;

//         const timer = setTimeout(() => {
//             setAlarm(null);
//         }, 5000);

//         return () => {
//             clearTimeout(timer);
//         };
//     }, [alarm]);

//     if (!alarm) {
//         return null;
//     }

//     return (
//         <div>
//             <div
//                 onClick={() => { router.push('/alarm'); setAlarm(null); }}
//                 className="flex justify-center items-center fixed top-22 left-1/2 -translate-x-1/2 z-[10000] shadow-[0_0_8px_2px_rgba(191,255,11,0.5)] font-semibold text-sm rounded-full border-[#BFFF0B66] border bg-[#BFFF0B40] text-[#000000] w-50 h-8">
//                 {alarm.title}
//             </div>
//         </div>
//     )
// }