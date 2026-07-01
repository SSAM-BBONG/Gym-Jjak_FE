import { CloseButton } from "@/components/ui/image";
import Image from "next/image";


interface TrainerRejectModal {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
}


export default function PtReviewModal({ isModal, closeModal, activeModal }: TrainerRejectModal) {
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
                            <h3 className="font-bold text-xl text-[#E8EAF0]"> 수강평 작성 </h3>
                            <button onClick={closeModal} className="relative ml-auto w-5 h-5">
                                <Image
                                    src={CloseButton}
                                    alt="모달 닫기 버튼"
                                    fill
                                    priority
                                    sizes="w-4 h-4"
                                />
                            </button>                        </div>
                        <p className="text-[14px] font-normal text-[#99A1AF] border-b-[#1E2939] border-b pb-8"> 체계적인 가슴 집중 PT </p>
                    </div>
                    <div className="flex flex-col gap-4 my-8">
                        <div className="flex flex-col">
                            <p className="text-[14px] font-medium text-white"> 별점</p>
                            <p className="text-[#364153] text-[40px]"> ☆☆☆☆☆</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <p className="text-[14px] font-medium text-white"> 수강평</p>
                            <textarea
                                placeholder="트레이너와 커리큘럼에 대한 솔직한 후기를 남겨주세요."
                                className="border-[#364153] border w-full h-47 p-6 bg-[#1E2939] rounded-2xl resize-none focus:border-[#BFFF0B] text-white focus:outline-none"
                            ></textarea>
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
                        수강평 등록
                    </button>
                </article>
            </form>
        </section>
    );
}