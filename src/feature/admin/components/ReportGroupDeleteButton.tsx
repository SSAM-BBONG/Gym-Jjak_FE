'use client'

import { AdminDeleteImg } from "@/components/ui/image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteReportGroupAction } from "../action";
import { toast } from "sonner";

export default function ReportGroupDeleteButton({ reportGroupId }: { reportGroupId: number }) {
    const router = useRouter();

    async function handleDelete() {
        try {
            const response = await deleteReportGroupAction(reportGroupId);
            if (!response.success) {
                toast.error(response.message)
                return;
            }
            toast.success(response.message)
            router.refresh();
        } catch (error) {
            toast.error('네트워크 오류입니다')
        }
    }

    return (
        <button onClick={handleDelete} className="flex items-center gap-1 sm:gap-1.5 lg:gap-2.5 text-[10px] sm:text-xs lg:text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-1.5 sm:py-2 px-2 lg:px-3">
            <div className="relative ml-auto w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5">
                <Image
                    src={AdminDeleteImg}
                    alt="삭제하기 버튼"
                    fill
                    sizes="w-4 h-4"
                />
            </div>삭제
        </button>
    );
}