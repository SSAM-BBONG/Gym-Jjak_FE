import { OrganizationApplicationDetail } from "../type";

interface OrganizationRegistFormProps {
    // 신청 & 조회 모드
    isReadOnly : boolean;
    application?: OrganizationApplicationDetail;
}

export default function OrganizationRegistLink({ application, isReadOnly }: OrganizationRegistFormProps) {
    
    return (
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
                            name="instagramUrl"
                            defaultValue={application?.instagramUrl}
                            disabled={isReadOnly}
                            placeholder="ex) https://instagram.com/yourpage"/>
                    </div>
                    <div className="flex flex-col gap-3 justify-center">
                        <p className="text-[14px] font-medium text-white"> 🔗 블로그 </p>
                        <input 
                            className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                            type="text"
                            name="blogUrl"
                            defaultValue={application?.blogUrl}
                            disabled={isReadOnly}
                            placeholder="ex) https://blog.naver.com/yourpage"/>
                    </div>
                    <div className="flex flex-col gap-3 justify-center">
                        <p className="text-[14px] font-medium text-white"> 🔗 웹사이트 </p>
                        <input 
                            className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                            type="text"
                            name="websiteUrl"
                            defaultValue={application?.websiteUrl}
                            disabled={isReadOnly}
                            placeholder="ex) https://yourwebsite.com"/>
                    </div>
                </div>
            </div>
    );
}