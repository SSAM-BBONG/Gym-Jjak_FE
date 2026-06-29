import { TrainerProfileImgUpload } from "@/components/ui/image";

export default function MypageTrainerProfile( {data}) {
    return (
        <div className="
                    flex flex-col gap-4
                    p-8
                    bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                    border
                    border-[#36415380]
                    rounded-[16px]
                    ">
                        <p className="text-[20px] font-extrabold text-white"> 프로필 사진 </p>
                        <div className="flex gap-6 items-center">
                            <div className="flex items-center justify-center size-35 border-[3px] border-[#BFFF0B] rounded-full overflow-hidden">
                                <img 
                                    className="w-full h-full object-cover" 
                                    src={data.profileImageUrl} 
                                    alt="트레이너 프로필 수정 프로필 사진"/>
                            </div>
                            <label 
                                htmlFor="trainer-profile-img-upload"
                                className="flex gap-3 px-6 py-3 bg-[#BFFF0B] rounded-[10px]"
                            > 
                                <img src={TrainerProfileImgUpload} alt="트레이너 프로필 업로드 버튼"/>
                                <p className="text-[16px] font-extrabold text-black"> 프로필 업로드 </p> 
                            </label>
                            <input id="trainer-profile-img-upload" type="file" className="hidden" />
                        </div>
        </div>
    );
}