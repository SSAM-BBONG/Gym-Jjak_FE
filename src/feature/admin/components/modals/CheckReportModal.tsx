import { CloseButton } from "@/components/ui/image";
import ReportStatus from "../ReportStatus";
import ReportReason from "../ReportReason";

interface CheckReportModalProps {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
    noneActiveModal: () => void;
    title: string;
}


export default function CheckReportModal({ isModal, closeModal, activeModal, noneActiveModal, title }: CheckReportModalProps) {
    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                className="bg-gradient-to-br from-[#101828] to-[#000] w-md h-150 rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col 
                                overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"

                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-xl text-[#E8EAF0]">신고 사유 확인</h3>
                        <img src={CloseButton} onClick={closeModal} />
                    </div>

                    <div className="flex justify-between items-center my-4">
                        <h3 className="font-bold text-xl text-[#E8EAF0] py-2">이름</h3>
                        <div className="flex gap-2"><ReportReason text='음란물' /><ReportStatus text="대기" /></div>
                    </div>

                    <div
                        className="border-[#364153] border w-full h-47 p-6 bg-[#1E2939] rounded-2xl resize-none focus:border-[#BFFF0B] text-white focus:outline-none"
                    >
                        댓글
                    </div>
                    <p className="text-end p-2">신고 날짜</p>
                    <article className='flex gap-3'>
                        <button
                            type="button"
                            onClick={noneActiveModal}
                            className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-base bg-[#1E2939]'
                        >
                            반려
                        </button>
                        <button
                            onClick={activeModal}
                            className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B]'
                        >
                            승인
                        </button>
                    </article>


                    <div className="flex justify-between items-center my-4">
                        <h3 className="font-bold text-xl text-[#E8EAF0] py-2">이름</h3>
                        <div className="flex gap-2"><ReportReason text='음란물' /><ReportStatus text="대기" /></div>
                    </div>

                    <div
                        className="border-[#364153] border w-full h-47 p-6 bg-[#1E2939] rounded-2xl resize-none focus:border-[#BFFF0B] text-white focus:outline-none"
                    >
                        댓글
                    </div>
                    <p className="text-end p-2">신고 날짜</p>
                    <article className='flex gap-3'>
                        <button
                            type="button"
                            onClick={noneActiveModal}
                            className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-base bg-[#1E2939]'
                        >
                            반려
                        </button>
                        <button
                            onClick={activeModal}
                            className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B]'
                        >
                            승인
                        </button>
                    </article>
                </article>


            </form>
        </section>
    );
}