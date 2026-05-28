import { CloseButton, MypageMyActivity, PtFeedBackOnBoard, PtRecordVideo } from "@/components/ui/image";

interface TrainerRejectModal {
    isModal: boolean;
    closeModal: () => void;
}


export default function PtFeeBackCheckModal({ isModal, closeModal}: TrainerRejectModal) {
    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                className="bg-gradient-to-br from-[#101828] to-[#000] w-2xl rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex flex-col gap-2 ">
                        <div className="flex justify-between items-center pt-2">
                            <h3 className="font-bold text-xl text-[#E8EAF0]">트레이너 반려 사유 입력</h3>
                            <img src={CloseButton} onClick={closeModal} />
                        </div>
                        <p className="text-[14px] font-normal text-[#99A1AF] border-b-[#1E2939] border-b pb-8"> 2회차 - 벤치프레스 기초 </p>
                    </div>
                    <div className="flex flex-col gap-6 mt-6">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <img src={PtRecordVideo} alt="피드백 동영상"/>
                                <p className="text-[14px] font-extrabold text-[#BFFF0B]"> 동영상 피드백 </p>
                            </div>
                            <p className="text-[12px] font-normal text-[#6A7282]"> 2026-05-08 </p>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="
                            flex flex-col gap-3
                            bg-[#1E293980]
                            border border-[#364153] rounded-[10px]
                            p-6 ">
                                <div className="flex gap-3">
                                    <img src={PtFeedBackOnBoard} alt="피드백 녹화"/>
                                    <p className="text-[14px] font-extrabold text-[#D1D5DC]"> Before 영상 </p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <img src={PtRecordVideo} width={65} height={65} alt="피드백 동영상"/>
                                    <p className="text-[12px] font-normal text-[#99A1AF]"> 영상 피드백이 등록되었습니다. </p>
                                    <button className="px-5 py-2 bg-[#BFFF0B] rounded-[10px] text-[14px] font-extrabold text-black"> 동영상 보기 </button>
                                </div>
                            </div>
                            <div className="
                            flex flex-col gap-3
                            bg-[#1E293980]
                            border border-[#364153] rounded-[10px]
                            p-6 ">
                                <div className="flex gap-3">
                                    <img src={PtFeedBackOnBoard} alt="피드백 녹화"/>
                                    <p className="text-[14px] font-extrabold text-[#D1D5DC]"> After 영상 </p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <img src={PtRecordVideo} width={65} height={65} alt="피드백 동영상"/>
                                    <p className="text-[12px] font-normal text-[#99A1AF]"> 영상 피드백이 등록되었습니다. </p>
                                    <button className="px-5 py-2 bg-[#BFFF0B] rounded-[10px] text-[14px] font-extrabold text-black"> 동영상 보기 </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 mb-6">
                            <div className="flex gap-2 items-center">
                                <img src={MypageMyActivity} width={20} height={20} alt="피드백 텍스트 피드백"/>
                                <p className="text-[14px] font-extrabold text-[#BFFF0B]"> 텍스트 피드백 </p>
                            </div>
                            <div className="
                            border border-[#364153] rounded-[10px]
                            bg-[#1E293980]
                            p-6
                            ">
                                <p className="text-[14px] font-normal text-[#D1D5DC]"> 벤치프레스 자세가 많이 좋아졌습니다. 동영상을 참고하셔서 집에서도 연습해보세요. </p>
                            </div>
                        </div>
                    </div>
                </article>
                <article className='flex gap-3'>
                    <button
                        type="button"
                        onClick={closeModal}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-base bg-[#1E2939]'
                    >
                        닫기
                    </button>
                </article>
            </form>
        </section>
    );
}