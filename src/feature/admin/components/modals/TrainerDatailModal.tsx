import { CloseButton } from "@/components/ui/image";
import ActiveStatus from "../ActiveStatus";

interface TrainerDetailModal {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
    title: string;
}


export default function TrainerDetailModal({ isModal, closeModal, activeModal, title }: TrainerDetailModal) {
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
                        <h3 className="font-bold text-xl text-[#E8EAF0]">트레이너 상세 정보</h3>
                        <img src={CloseButton} onClick={closeModal} />
                    </div>
                    <div className="flex items-center my-4 gap-6">
                        <img className="w-30 h-30" />
                        <div>
                            <h3 className="font-bold text-xl text-[#E8EAF0] py-2">이름</h3>
                            <p className="font-normal text-base text-[#E8EAF0]">닉네임</p>
                            <p className="font-normal text-base text-[#E8EAF0]">이메일</p>
                            <ActiveStatus text='활성' />
                        </div>
                    </div>
                    <section className="flex flex-col gap-6">
                        <article>
                            <p className="text-white font-bold text-lg mb-3.5">자기소개</p>
                            <div
                                className="flex items-center gap-4 border-[#364153] border w-full p-4 mt-2 bg-[#1E2939] rounded-md text-[#D1D5DC] text-base font-normal"
                            >
                                <p>안녕하세요</p>
                            </div>
                        </article>
                        <article>
                            <p className="text-white font-bold text-lg mb-3.5">자격증</p>
                            <div
                                className="flex items-center gap-4 border-[#364153] border w-full p-4 mt-2 bg-[#1E2939] rounded-md text-[#D1D5DC] text-base font-normal"
                            >
                                <div className="bg-[#BFFF0B] w-2 h-2 rounded-full"></div><p>안녕하세요</p>
                            </div>
                            <div
                                className="flex items-center gap-4 border-[#364153] border w-full p-4 mt-2 bg-[#1E2939] rounded-md text-[#D1D5DC] text-base font-normal"
                            >
                                <div className="bg-[#BFFF0B] w-2 h-2 rounded-full"></div><p>안녕하세요</p>
                            </div>
                        </article>
                        <article>
                            <p className="text-white font-bold text-lg mb-3.5">대회 경력</p>
                            <div
                                className="flex items-center gap-4 border-[#364153] border w-full p-4 mt-2 bg-[#1E2939] rounded-md text-[#D1D5DC] text-base font-normal"
                            >
                                <div className="bg-[#BFFF0B] w-2 h-2 rounded-full"></div><p>안녕하세요</p>
                            </div>
                        </article>
                    </section>
                </article>
                <article className='flex gap-3 mt-10'>
                    <button
                        type="button"
                        onClick={closeModal}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-base bg-[#1E2939]'
                    >
                        아니오
                    </button>
                    <button
                        onClick={activeModal}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B]'
                    >
                        예
                    </button>
                </article>
            </form>
        </section>
    );
}