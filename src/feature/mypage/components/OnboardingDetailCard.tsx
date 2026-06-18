import { MyOnboardingPurpose } from "@/components/ui/image";

export default function OnboardingDetailCard({ title, content }: { title: string, content: string }) {
    return (
        <div className="
                    flex gap-3
                    p-8 
                    rounded-[16px]
                    border
                    border-[#36415380]
                    bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                    mb-4">
            <div className="bg-[#BFFF0B1A] w-10 h-10 rounded-[10px] p-2 flex justify-center items-center"><img src={MyOnboardingPurpose} alt="온보딩 개별 사진" /></div>
            <div className=" flex flex-col gap-5">
                <p className="text-xl flex items-center h-10 text-white font-extrabold ">{title}</p>
                <p className="font-black text-2xl text-[#BFFF0B]">{content}</p>
            </div>
        </div>
    );
}