import { MypageTrainerProfileFormValue } from "@/lib/mypageTrainerProfileEditSchema";
import { UseFormRegister } from "react-hook-form";
import { MyTrainerProfileData } from "../type";

interface MypageTrainerProfileSelfIntroductionProps {
  data: MyTrainerProfileData;
  mode: string;
  register: UseFormRegister<MypageTrainerProfileFormValue>;
  error?: string;
}

export default function MypageTrainerProfileSelfIntroduction({ data, mode, register, error}: MypageTrainerProfileSelfIntroductionProps) {
    
    const isReadOnly = mode === "read"

    return (
        <div className="
            flex flex-col gap-4
            p-8
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border
            border-[#36415380]
            rounded-[16px]">
                <p className="text-[20px] font-extrabold text-white"> 자기소개 </p>
                <textarea 
                    rows={10} 
                    cols={10} 
                    disabled={isReadOnly}
                    defaultValue={data.introduction}
                    placeholder="자신을 소개하고, 어떤 트레이닝을 제공할 수 있는지 설명해주세요."
                    className="bg-[#1E2939] border border-[#364153] p-4 text-white outline-none rounded-[10px]"
                    {...register("introduction")}    
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

    );
}