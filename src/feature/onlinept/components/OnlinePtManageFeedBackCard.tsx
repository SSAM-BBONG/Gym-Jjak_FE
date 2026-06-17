import OnlinePtFeedbackCt from "./OnlinePtFeedbackCt";
import OnlinePtPeedbackStatus from "./OnlinePtPeedback";

export default function OnlinePtManageFeedBackCard() {
    return (
        <div className="
        flex gap-2 flex-col
                p-5
                border border-[#1E2939] rounded-[16px]
                bg-[#101828]
                ">
            <div className="flex items-center gap-3 w-full mb-6">
                <p className="px-4 py-2 text-[14px] font-extrabold text-[#99A1AF] bg-[#364153] rounded-full"> 1 </p>
                <div>
                    <p className="text-[18px] font-extrabold text-white"> 1주차 </p>
                    <p className="font-normal text-xs text-[#99A1AF]"> 1주차 </p>
                </div>
                <div className="ml-auto">
                    <OnlinePtPeedbackStatus text='대기' />
                </div>
            </div>
            <OnlinePtFeedbackCt type='질문' active={true} />
            <OnlinePtFeedbackCt type='피드백' active={false} />
        </div>
    );
}