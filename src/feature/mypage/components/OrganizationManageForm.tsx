import { MypageMyActivity, OrganAddInf, OrganAddInfBlog, OrganAddInfInsta, OrganAddInfWebsite } from "@/components/ui/image";

export default function OrganManageForm() {
    return (
        <div className="flex flex-col gap-6">
            <button className="self-end bg-[#BFFF0B] rounded-[14px] px-6 py-3 text-[16px] text-black font-extrabold"> 수정하기 </button>
            <div className="
            flex flex-col gap-6
            bg-[linear-gradient(135deg,_#101828_0%,_#1E2939_100%)]
            border border-[#364153] rounded-[16px]
            p-8
            "
            >
                <div className="flex gap-3">
                    <img src={MypageMyActivity} width={24} height={24} alt="내 조직 관리 기본정보"/>
                    <p className="text-[24px] font-black text-white"> 기본 정보(수정 불가)</p>
                </div>
                <div className="flex gap-6">
                    <div className="flex flex-col flex-1 gap-2">
                        <p className="text-[14px] font-medium text-[#99A1AF]"> 아이디 </p>
                        <div className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-white font-normal"> fitgym001 </div>
                    </div>

                    <div className="flex flex-col flex-1 gap-2">
                        <p className="text-[14px] font-medium text-[#99A1AF]"> 사업자 등록번호 </p>
                        <div className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-white font-normal"> 123-45-67890 </div>
                    </div>                    
                </div>
                <div className="flex gap-6">
                    <div className="flex flex-col flex-1 gap-2">
                        <p className="text-[14px] font-medium text-[#99A1AF]"> 상호 </p>
                        <div className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-white font-normal"> 피트니스짐 </div>
                    </div>

                    <div className="flex flex-col flex-1 gap-2">
                        <p className="text-[14px] font-medium text-[#99A1AF]"> 대표자 이름 </p>
                        <div className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-white font-normal"> 김대표 </div>
                    </div>
                </div>

                <div className="flex gap-6">
                    <div className="flex flex-col flex-1 gap-2">
                        <p className="text-[14px] font-medium text-[#99A1AF]"> 대표자 전화번호 </p>
                        <div className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-white font-normal"> 010-1234-5678 </div>
                    </div>

                    <div className="flex flex-col flex-1 gap-2">
                        <p className="text-[14px] font-medium text-[#99A1AF]"> 개업일자</p>
                        <div className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-white font-normal"> 2021-01-15</div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-[14px] font-medium text-[#99A1AF]"> 사업장 주소 </p>
                    <div className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-white font-normal"> 서울시 강남구 테헤란로 123</div>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-[14px] font-medium text-[#99A1AF]"> 사업자 등록증 </p>
                    <div className="p-4 border border-[#364153] bg-[#1E293980] rounded-[10px] flex items-center justify-between">
                        <div className="flex gap-4">
                            <img src={MypageMyActivity} width={32} height={32} alt="조직 계정 신청 사업자 등록증 "/>
                            <div className="flex flex-col">
                                <p className="text-[16px] font-extrabold text-white"> 사업자등록증.pdf</p>
                                <p className="text-[14px] font-normal text-[#99A1AF]"> 파일 크기 1.2MB</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 text-[14px] font-extrabold text-black bg-[#BFFF0B] rounded-[10px]"> 다운로드</button>
                    </div>
                </div>
            </div>

            <div className="
            flex flex-col gap-6
            bg-[linear-gradient(135deg,_#101828_0%,_#1E2939_100%)]
            border border-[#364153] rounded-[16px]
            p-8
            mb-16
            "
            >
                <div className="flex gap-3 items-center">
                    <img src={OrganAddInf} alt="내 조직 관리 추가 정보"/>
                    <p className="text-[24px] font-black text-white"> 추가 정보(수정 가능) </p>
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
        </div>
    );
}