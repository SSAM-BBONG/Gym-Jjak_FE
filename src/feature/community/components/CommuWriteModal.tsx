import { CloseButton } from "@/components/ui/image";
import Image from "next/image";

interface TrainerDetailModal {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
}


export default function CommuWriteModal({ isModal, closeModal, activeModal }: TrainerDetailModal) {
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
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-xl text-[#E8EAF0]"> 새 게시글 작성 </h3>
                        <button onClick={closeModal} className="relative ml-auto w-5 h-5">
                            <Image
                                src={CloseButton}
                                alt="모달 닫기 버튼"
                                fill
                                priority
                                sizes="w-4 h-4"
                            />
                        </button>                    </div>
                </article>
                <div className="flex flex-col gap-2 items-baseline p-6">
                    <label className="text-[14px] font-medium text-white"> 카테고리</label>
                    <button className="text-black text-[14px] font-extrabold bg-[#BFFF0B] px-4 py-2 rounded-[10px] mb-3"> 자유게시판 </button>
                    <div className="flex flex-col w-full gap-3">
                        <label className="text-[14px] font-medium text-white"> 제목</label>
                        <input
                            type="text"
                            className="px-4 py-3 text-white text-[16px] flex-1 font-normal bg-[#1E2939] border-[1px] border-[#364153] rounded-[10px] outline-none"
                            placeholder="제목을 입력하세요" />
                    </div>
                    <div className="flex flex-col w-full gap-2 mt-2">
                        <label className="text-[14px] font-medium text-white"> 내용 </label>
                        <textarea
                            placeholder="내용을 입력하세요"
                            className="bg-[#1E2939] px-4 py-3 rounded-[10px] border-[1px] border-[#364153] text-white outline-none"
                            rows={15} cols={50} />
                    </div>
                    <div className="mt-4 flex items-center justify-center">
                        <p className="text-[14px] text-[#99A1AF] font-normal"> 작성자: <span className="text-white font-medium">작성자이름</span></p>
                    </div>
                </div>
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
                        저장
                    </button>
                </article>
            </form>
        </section>
    );
}