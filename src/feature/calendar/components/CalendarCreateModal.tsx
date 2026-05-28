import { CloseButton } from "@/components/ui/image";

interface CalendarCreateModalProps {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
    title: string;
}


export default function CalendarCreateModal({ isModal, closeModal, activeModal, title }: CalendarCreateModalProps) {
    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                className="bg-gradient-to-br from-[#101828] to-[#000] w-3xl h-150 rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between
                overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2 mb-8">
                        <h3 className="font-bold text-xl text-[#E8EAF0]">일지 추가</h3>
                        <img src={CloseButton} onClick={closeModal} />
                    </div>
                    <label className="font-bold text-lg text-white ">제목</label>
                    <input
                        placeholder="제목을 입력해주세요"
                        className="border-[#364153] border w-full py-3 px-6 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white focus:outline-none mb-6 mt-3"
                    />
                    <label className="font-bold text-lg text-white mt-6">내용</label>
                    <textarea
                        placeholder="내용을 입력해주세요"
                        className="border-[#364153] border w-full h-47 p-6 bg-[#1E2939] rounded-2xl resize-none focus:border-[#BFFF0B] text-white focus:outline-none mb-6 mt-3"
                    ></textarea>
                    <label className="font-bold text-lg text-white mt-6">카테고리</label>
                    <div className="mt-3 flex gap-3 flex-wrap">
                        <label
                            htmlFor="근력"
                            className="py-3 px-6.5 bg-[#1E2939] text-[#99A1AF] text-base font-bold rounded-md has-checked:bg-[#BFFF0B] has-checked:text-black">
                            <input
                                hidden
                                type="radio"
                                name="category"
                                value="머지"
                                id="근력" />
                            근력
                        </label>
                        <label className="py-3 px-6.5 bg-[#1E2939] text-[#99A1AF] text-base font-bold rounded-md has-checked:bg-[#BFFF0B] has-checked:text-black">
                            <input
                                hidden
                                type="radio"
                                name="category"
                                value="머지" />
                            dlgldllgldldlldldldldldldldlldlddjlfskdjflskkdfjskldfsl
                        </label>
                        <label className="py-3 px-6.5 bg-[#1E2939] text-[#99A1AF] text-base font-bold rounded-md has-checked:bg-[#BFFF0B] has-checked:text-black">
                            <input
                                hidden
                                type="radio"
                                name="category"
                                value="머지" />
                            dsdfsdngjskldjfljskdjflksjdkfj
                        </label>
                    </div>
                </article>
                <article className='flex gap-3 mt-10'>
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
                        저장하기
                    </button>
                </article>
            </form>
        </section>
    );
}