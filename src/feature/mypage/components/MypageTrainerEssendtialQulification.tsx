import { TrainerEssentialQulificationIcon } from "@/components/ui/image";
import { MyTrainerProfileData } from "../type";
import Image from "next/image";

interface MypageTrainerEssentialQUlificationProps {
    data: MyTrainerProfileData
    isReadOnly: boolean;
}

export default function MypageTrainerEssentialQUlification({ data, isReadOnly }: MypageTrainerEssentialQUlificationProps) {
    return (
        <div className="
                        flex flex-col gap-4
                        p-8
                        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                        opacity-50
                        border
                        border-[#36415380]
                        rounded-[16px]
                        ">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-3">
                    <p className="text-[20px] font-extrabold text-white"> 필수 자격증 </p>
                    <p className="text-[12px] text-[#6A7282] font-medium"> 필수 자격증은 수정이 불가능합니다.</p>
                </div>
            </div>
            <div className="flex gap-3 justify-between items-center">
                <div className="flex flex-1 gap-2 px-3 py-2 border border-[#364153] bg-[#1E293980] items-center rounded-[10px]">
                    <div className="relative w-4 h-4">
                        <Image
                            src={TrainerEssentialQulificationIcon}
                            alt="자격증 업로드시 나오는 아이콘"
                            fill
                            priority
                            sizes="w-8 h-8"
                            className="object-cover"
                        />
                    </div>
                    <p className="text-[#99A1AF] text-[12px] font-medium"> {data.certifications[0].fileOriginalName} </p>
                </div>

                {data?.certifications[0].fileUrl
                    ?
                    (
                        <a
                            href={data?.certifications[0].fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            download={data?.certifications[0].fileOriginalName ?? undefined}
                            className="text-[#BFFF0B] text-[14px] font-medium hover:underline"
                        >
                            파일 다운로드
                        </a>
                    )
                    :
                    (
                        <p className="text-[#99A1AF] text-[12px] font-medium">
                            등록된 필수 자격증 파일이 없습니다.
                        </p>
                    )}
            </div>


        </div>
    );
}