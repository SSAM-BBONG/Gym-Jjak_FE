import { MyOnboardingPurpose } from "@/components/ui/image";
import Image from "next/image";

export default function OnboardingDetailCard({ title, content }: { title: string, content: string }) {
    return (
        <div className="
                    flex gap-2 sm:gap-3
                    p-5 sm:p-6 lg:p-8
                    rounded-[12px] sm:rounded-[14px] lg:rounded-[16px]
                    border
                    border-[#36415380]
                    bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                    mb-3 sm:mb-4">
            <div className="bg-[#BFFF0B1A] w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-[10px] p-1.5 sm:p-2 flex justify-center items-center">
                <div className="relative w-4 h-4 lg:w-5 lg:h-5">
                    <Image
                        src={MyOnboardingPurpose}
                        alt="온보딩 개별 사진"
                        fill
                        sizes="w-10 h-10"
                        className="object-cover hover:cursor-pointer"
                    />
                </div>
            </div>
            <div className=" flex flex-col gap-3 sm:gap-4 lg:gap-5">
                <p className="text-base sm:text-lg lg:text-xl flex items-center h-8 sm:h-9 lg:h-10 text-white font-extrabold ">{title}</p>
                <p className="font-black text-xl sm:text-[22px] lg:text-2xl text-[#BFFF0B]">{content}</p>
            </div>
        </div>
    );
}
