import { CloseButton } from "@/components/ui/image";

interface ChangeStateModalProps {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
    title: string;
}


export default function CheckDelteModal({ isModal, closeModal, activeModal, title }: ChangeStateModalProps) {
    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                className="bg-gradient-to-br from-[#101828] to-[#000] w-md h-114 rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-xl text-[#E8EAF0]">댓글 관리</h3>
                        <img src={CloseButton} onClick={closeModal} />
                    </div>
                    <div className="flex justify-between items-center my-4">
                        <h3 className="font-bold text-xl text-[#E8EAF0] py-2">이름</h3>
                    </div>
                    <div
                        className="border-[#364153] border w-full h-47 p-6 bg-[#1E2939] rounded-2xl resize-none focus:border-[#BFFF0B] text-white focus:outline-none"
                    >
                        댓글
                    </div>
                </article>
                <article className='flex gap-3'>
                    <button
                        onClick={activeModal}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B]'
                    >
                        삭제하기
                    </button>
                </article>
            </form>
        </section>
    );
}