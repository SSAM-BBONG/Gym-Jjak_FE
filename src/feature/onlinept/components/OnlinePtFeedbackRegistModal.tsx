import { CloseButton, MypageMyActivity, PtFeedBackOnBoard, PtRecordVideo } from "@/components/ui/image";
import Image from "next/image";

interface TrainerRejectModal {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
    type: '피드백' | '질문';
}


export default function OnlinePtFeeBackRegistModal({ isModal, closeModal, activeModal, type }: TrainerRejectModal) {
    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                className="bg-gradient-to-br from-[#101828] to-[#000] h-150 w-2xl rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between
                overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex flex-col gap-2 ">
                        <div className="flex justify-between items-center pt-2">
                            <h3 className="font-bold text-xl text-[#E8EAF0]">{type} 확인</h3>
                            <button onClick={closeModal} className="relative ml-auto w-5 h-5">
                                <Image
                                    src={CloseButton}
                                    alt="모달 닫기 버튼"
                                    fill
                                    sizes="w-4 h-4"
                                />
                            </button>                        </div>
                        <p className="text-[14px] font-normal text-[#99A1AF] border-b-[#1E2939] border-b pb-8"> 1주차 </p>
                    </div>
                    <div className="flex flex-col gap-6 mt-6">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <img src={PtRecordVideo} alt="운동 동영상" />
                                <p className="text-[14px] font-extrabold text-[#BFFF0B]"> 동영상 </p>
                            </div>
                            <p className="text-[12px] font-normal text-[#6A7282]"> 2026-05-08 </p>
                        </div>
                        <div className="grid grid-cols-1">
                            <div className="
                            flex flex-col gap-3
                            bg-[#1E293980]
                            border border-[#364153] rounded-[10px]
                            p-6 ">
                                <div className="flex gap-3">
                                    <img src={PtFeedBackOnBoard} alt="동영상 녹화" />
                                    <p className="text-[14px] font-extrabold text-[#D1D5DC]"> 운동 영상 </p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <img src={PtRecordVideo} width={65} height={65} alt="운동 동영상" />
                                    <p className="text-[12px] font-normal text-[#99A1AF]"> 운동 영상을 업로드 해주세요 </p>
                                    <label
                                        htmlFor="ptmanage-feedback-regist"
                                        className="
                                    px-5 py-2 bg-[#BFFF0B] rounded-[10px] text-[14px] font-extrabold text-black">
                                        업로드
                                    </label>
                                    <input id="ptmanage-feedback-regist" type="file" className="hidden" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 mb-6">
                            <div className="flex gap-2 items-center">
                                <img src={MypageMyActivity} width={20} height={20} alt="텍스트 피드백" />
                                <p className="text-[14px] font-extrabold text-[#BFFF0B]"> 텍스트 {type} </p>
                            </div>
                            <div className="
                            flex
                            border border-[#364153] rounded-[10px]
                            bg-[#1E293980]
                            p-6
                            ">
                                <textarea
                                    className="flex-1 text-[14px] font-normal text-[#D1D5DC] resize-none focus:outline-0"
                                    placeholder={`${type}을 작성해주세요`}
                                    rows={10}
                                />
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
                        취소
                    </button>
                    <button
                        onClick={activeModal}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B]'
                    >
                        등록
                    </button>
                </article>
            </form>
        </section>
    );
}