import { MypageInbody, TrainerProfileImgUpload } from "@/components/ui/image";

export default function TrainerRegistForm () {
    return (
        <div className="flex flex-col px-40 pt-10">
            <p className="text-[36px] font-black text-white"> 트레이너 신청</p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 트레이너로 활동하기 위한 정보를 입력하세요</p>

            <div className="flex flex-col gap-6 mt-6">
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
                    <div className="flex items-center justify-center size-35 border-[3px] border-[#BFFF0B] rounded-full">
                        <img className="object-cover" src={MypageInbody} alt="트레이너 프로필 수정 프로필 사진"/>
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

            <div className="
            flex flex-col gap-4
            p-8
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border
            border-[#36415380]
            rounded-[16px]">
                <div className="flex justify-between items-center">
                <p className="text-[20px] font-extrabold text-white"> 자격증 </p>
                    <button className="bg-[#364153] px-4 py-2 rounded-[10px] text-[16px] text-white font-medium"> + &nbsp; 추가 </button>
                </div>

                <div className="flex gap-3">
                    <p className="bg-[#1E2939] px-4 py-3 border border-[#364153] flex-1 rounded-[10px] text-[#FFFFFF80]"> 생활지도사 체육 2급 </p>
                    <button className="px-4 py- bg-[#82181A4D] rounded-[10px] text-[#FF6467] font-extrabold"> ✕ </button>
                </div>

                <div className="flex gap-3">
                    <p className="bg-[#1E2939] px-4 py-3 border border-[#364153] flex-1 rounded-[10px] text-[#FFFFFF80]"> 생활지도사 체육 2급 </p>
                </div>
            </div>

            <div className="
            flex flex-col gap-4
            p-8
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border
            border-[#36415380]
            rounded-[16px]">
                <div className="flex justify-between items-center">
                <p className="text-[20px] font-extrabold text-white"> 대회 경력 </p>
                    <button className="bg-[#364153] px-4 py-2 rounded-[10px] text-[16px] text-white font-medium"> + &nbsp; 추가 </button>
                </div>

                <div className="flex">
                    <p className="bg-[#1E2939] px-4 py-3 border border-[#364153] flex-1 rounded-[10px] text-[#FFFFFF80]"> 2023 대회 </p>
                </div>
            </div>
            <div className="
            flex flex-col gap-4
            p-8
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border
            border-[#36415380]
            rounded-[16px]">
                <p className="text-[20px] font-extrabold text-white"> 자기소개 </p>
                <textarea 
                    rows={10} cols={10} 
                    placeholder="자신을 소개하고, 어떤 트레이닝을 제공할 수 있는지 설명해주세요."
                    className="bg-[#1E2939] border border-[#364153] p-4 text-white outline-none rounded-[10px]"/>
            </div>
            <div className="flex gap-4">
            <button className="flex-1 bg-[#1E2939] text-white text-[16px] font-extrabold py-3 mb-20 rounded-[10px]"> 취소 </button>
            <button className="flex-1 bg-[#BFFF0B] text-black text-[16px] font-extrabold py-3 mb-20 rounded-[10px]"> 신청하기 </button>
            </div>
            </div>
        </div>
    );
}