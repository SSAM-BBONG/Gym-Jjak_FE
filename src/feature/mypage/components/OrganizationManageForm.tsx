import { MypageMyActivity, OrganAddInf, OrganAddInfBlog, OrganAddInfInsta, OrganAddInfWebsite, OrganizationManageEditButton } from "@/components/ui/image";

export default function OrganizationManageForm() {
    return (
            <div className="
            flex flex-col gap-6
            bg-[linear-gradient(135deg,_#101828_0%,_#1E2939_100%)]
            border border-[#364153] rounded-[16px]
            p-8
            mb-16
            "
            >
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <img src={OrganAddInf} alt="내 조직 관리 추가 정보"/>
                        <p className="text-[24px] font-black text-white"> 추가 정보(수정 가능) </p>
                    </div>
                    <button 
                        className="flex items-center  gap-3 bg-[#BFFF0B] rounded-[14px] px-5 py-3 text-[16px] text-black font-extrabold"
                    > 
                        <img src={OrganizationManageEditButton} alt="내 조직 관리 - 수정하기 버튼"/>
                        <p>수정하기</p>  
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-medium text-[#99A1AF]"> 운동 시설 전화번호</p>
                    <div className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-white font-normal"> 02-1234-5678 </div>
                </div>

                <div className="flex flex-col gap-4 ">
                    <p className="text-[14px] font-medium text-[#99A1AF]"> 웹사이트 링크</p>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2"> 
                            <img src={OrganAddInfInsta} alt="내 조직 관리 인스타"/>
                            <p className="text-[12px] font-medium text-[#6A7282]"> 인스타그램 </p>   
                        </div>
                        <input 
                            type="text"
                            className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-[#BFFF0B] font-normal "
                            value="https://instagram.com/fitgym"/> 
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2"> 
                            <img src={OrganAddInfBlog} alt="내 조직 관리 블로그"/>
                            <p className="text-[12px] font-medium text-[#6A7282]"> 블로그 </p>   
                        </div>
                        <input 
                            type="text"
                            className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-[#BFFF0B] font-normal "
                            value="https://blog.naver.com/fitgym"/> 
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2"> 
                            <img src={OrganAddInfWebsite} alt="내 조직 관리 웹사이트"/>
                            <p className="text-[12px] font-medium text-[#6A7282]"> 웹사이트 </p>   
                        </div>
                        <input 
                            type="text"
                            className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-[#BFFF0B] font-normal "
                            value="https://fitgym.com"/> 
                    </div>
                </div>
            </div>
    );
}