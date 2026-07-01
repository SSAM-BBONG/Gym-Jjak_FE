import { CloseButton } from "@/components/ui/image";
import Image from "next/image";

interface ChangeStateModalProps {
    isModal: boolean;
    closeModal: () => void;
    mode: string;
    nickname: string;
    content: string;
}


export default function CheckViewModal({ isModal, closeModal, mode, nickname, content }: ChangeStateModalProps) {
    if (!isModal) return null;

    const modalTitle = mode === 'report' ? '신고 사유 확인' : mode === 'review' ? '리뷰 확인' : mode === 'comment' ? '댓글 확인' : ''

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                className="bg-gradient-to-br from-[#101828] to-[#000] w-md rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-xl text-[#E8EAF0]">{modalTitle}</h3>
                        <button onClick={closeModal} className="relative ml-auto w-5 h-5">
                            <Image
                                src={CloseButton}
                                alt="모달 닫기 버튼"
                                fill
                                sizes="w-4 h-4"
                            />
                        </button>
                    </div>
                    <div className="flex justify-between items-center my-4">
                        <h3 className="font-bold text-xl text-[#E8EAF0] py-2">{nickname}</h3>
                    </div>
                    <div
                        className="border-[#364153] border w-full h-47 p-6 bg-[#1E2939] rounded-2xl resize-none focus:border-[#BFFF0B] text-white focus:outline-none"
                    >
                        {content}
                    </div>
                </article>
            </form>
        </section>
    );
}