import { PtfindTestImg, PtManageUsers } from "@/components/ui/image";

export default function OnlinePtManageCard() {
    return (
        <div className="
        overflow-hidden
        relative
        flex flex-col
        bg-[#101828]
        border border-[#1E2939] rounded-[16px]
        ">
            <div className="absolute right-3 top-3 bg-[#BFFF0B] px-3 py-1 rounded-full text-[12px] font-extrabold text-black"> 활성화 </div>
            <div
                style={{ backgroundImage: `url(${PtfindTestImg})` }}
                className="h-40 bg-no-repeat bg-cover bg-center"></div>
            <div className="flex flex-col p-5 gap-2">
                <p className="text-[18px] font-black text-white"> 체계적인 가슴 집중 PT </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 김철수 트레이너 </p>
                <div className="
                flex flex-col gap-3
                bg-[#1E293980]
                rounded-[10px]
                p-3
                mt-3
                ">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 whitespace-nowrap items-center">
                            <img src={PtManageUsers} alt="PT 관리 수강생" />
                            <p className="text-[12px] font-normal text-[#99A1AF]"> 수강생 </p>
                        </div>
                        <p className="text-[14px] font-extrabold text-[#6A7282]"> <span className="text-[#BFFF0B]">8</span> /10</p>
                    </div>
                    <div className="flex h-2 rounded-full bg-[#364153]">
                        <p className="w-[30%] rounded-full bg-[#BFFF0B]"></p>
                    </div>
                </div>
            </div>
        </div>
    );
}