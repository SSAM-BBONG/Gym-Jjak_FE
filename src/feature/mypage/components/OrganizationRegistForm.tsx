import { OrganApplicationDanger, OrganApplicationUpload } from "@/components/ui/image";

export default function OrganizationRegistForm() {
    return (
        <div className="flex flex-col px-40 pt-10 gap-8">
            <div className="flex flex-col gap-2">
                <p className="text-[36px] font-black text-white"> 조직 계정 신청 </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 운동시설 정보를 입력하여 조직 계정을 신청하세요 </p>
            </div>
            <div className="
            border border-[#2B7FFF4D] rounded-[16px]
            bg-[linear-gradient(135deg,rgba(28,57,142,0.20)0%,rgba(25,60,184,0.10)100%)]
            p-6">
                <div className="flex gap-3 items-start">
                    <img src={OrganApplicationDanger} alt="조직 계정 신청 절차"/>
                    <div className="flex flex-col">
                        <p className="text-[18px] font-extrabold text-[#51A2FF] self-start"> 신청 절차 안내</p>
                        <p className="text-[14px] font-normal text-[#D1D5DC]"> 1. 아래 정보를 입력하고 신청 </p>
                        <p className="text-[14px] font-normal text-[#D1D5DC]"> 2. 관리자가 제출된 정보 검증 (영업일 기준 2-3일) </p>
                        <p className="text-[14px] font-normal text-[#D1D5DC]"> 3. 승인 시 신청자 이메일로 조직 계정 정보 발송 </p>
                    </div>
                </div>
            </div>

            <div className="
            flex flex-col gap-4
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            p-8
            rounded-[16px]
            ">
                <p className="text-[20px] text-white font-extrabold"> 조직 아이디</p>
                <p className="text-[14px] text-[#99A1AF] font-normal "> 조직의 고유 아이디로 사용됩니다. (영문, 숫자, 하이픈만 가능) </p>
                <div className="flex gap-3">
                    <input 
                        type="text"
                        placeholder="ex)organization-id"
                        className="flex-1 border border-[#364153] px-4 py-3 outline-none rounded-[10px] bg-[#1E2939] text-[#FFFFFF80]"    
                    />
                    <button className="px-7 py-3 text-[16px] font-medium text-white bg-[#364153] opacity-50 rounded-[10px]"> 중복 확인 </button>
                </div>
            </div>

            <div className="
            flex flex-col gap-4
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            p-8
            rounded-[16px]
            ">
                <p className="text-[20px] text-white font-extrabold"> 사업자등록증</p>
                <input id="organ-application" type="file" className="hidden"/>
                <label htmlFor="organ-application" className="
                flex flex-col gap-3 items-center 
                bg-[#1E2939] border border-[#364153] rounded-[10px]
                p-8"> 
                    <img src={OrganApplicationUpload} alt="조직 계정 신청 사업자 등록증"/>
                    <p className="text-[14px] font-extrabold text-white"> 사업자 등록증 업로드</p>
                    <p className="text-[12px] font-medium text-[#6A7282]"> PDF, JPG, PNG 파일 (최대 10MB) </p>
                </label>
            </div>

            <div className="
            flex flex-col gap-6
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            p-8
            rounded-[16px]
            ">
                <p className="text-[20px] text-white font-extrabold"> 사업자 정보</p>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-white"> 사업자등록번호 </label>
                        <input 
                            className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                            type="text"
                            placeholder="0000000000 (10자리)"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-white"> 상호(사업자 이름) </label>
                        <input 
                            className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                            type="text"
                            placeholder="ex) 엑티브펄스 PT센터"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-white"> 대표자 이름 </label>
                        <input 
                            className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                            type="text"
                            placeholder="ex) 홍길동"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-white"> 개업 일자 </label>
                        <input 
                            className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                            type="text"
                            placeholder="ex) 20000000"/>
                    </div>
                </div>
                <button className="bg-[#BFFF0B] opacity-50 rounded-[10px] py-3 text-[16px] font-extrabold text-black"> 사업자 정보 검증하기 </button>
            </div>

            <div className="
            flex flex-col gap-6
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            p-8
            rounded-[16px]
            ">
                <p className="text-[20px] text-white font-extrabold">  사업장 정보 </p>
                <div className="flex flex-col gap-6"> 
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-white"> 사업장 주소</label>
                        <input 
                            className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                            type="text"
                            placeholder="ex) 예: 서울특별시 강남구 테헤란로 123"/>
                        <p className="text-[12px] font-normal text-[#6A7282]"> 사업자등록증 상 주소와 실제 운영 중인 오프라인 매장 주소를 입력해주세요 </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-white"> 대표자 전화번호 </label>
                        <input 
                            className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                            type="text"
                            placeholder="ex) 010-0000-0000"/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-white"> 운동시설 번호 </label>
                        <input 
                            className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                            type="text"
                            placeholder="ex) 체육시설업 신고번호 (선택)"/>
                    </div>
                </div>
            </div>

            <div className="
            flex flex-col gap-6
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            p-8
            rounded-[16px]
            ">
                <p className="text-[20px] text-white font-extrabold"> 웹사이트 & SNS </p>
                <p className="text-[14px] text-[#99A1AF] font-normal "> 운영 중인 웹사이트나 SNS가 있다면 입력해주세요 (선택) </p>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3 justify-center">
                        <p className="text-[14px] font-medium text-white"> 🔗 인스타그램 </p>
                        <input 
                            className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                            type="text"
                            placeholder="ex) https://instagram.com/yourpage"/>
                    </div>
                    <div className="flex flex-col gap-3 justify-center">
                        <p className="text-[14px] font-medium text-white"> 🔗 블로그 </p>
                        <input 
                            className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                            type="text"
                            placeholder="ex) https://blog.naver.com/yourpage"/>
                    </div>
                    <div className="flex flex-col gap-3 justify-center">
                        <p className="text-[14px] font-medium text-white"> 🔗 웹사이트 </p>
                        <input 
                            className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                            type="text"
                            placeholder="ex) https://yourwebsite.com"/>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mb-15">
                <button className="py-4 text-[16px] font-extrabold text-white flex-1 bg-[#1E2939] rounded-[10px]"> 취소 </button>
                <button className="py-4 text-[16px] font-extrabold text-black flex-1 bg-[#BFFF0B] rounded-[10px]"> 신청하기 </button>
            </div>
        </div>
    );
}