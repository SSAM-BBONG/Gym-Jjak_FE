import { CloseButton, OrganTrainerAdd } from "@/components/ui/image";

interface TrainerDetailModal {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
}


export default function OrganizationTrainerAddForm({ isModal, closeModal, activeModal}: TrainerDetailModal) {
    if (!isModal) return null;

    return (
       <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                className="bg-gradient-to-br from-[#101828] to-[#000] w-md rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-6 pt-2">
                        <h3 className="font-bold text-xl text-[#E8EAF0]">트레이너 추가</h3>
                        <img src={CloseButton} onClick={closeModal} />
                    </div>

                    <div className="flex flex-col gap-3 py-6">   
                        <p className="text-[18px] font-extrabold text-white"> 사용자 ID 검색</p>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="사용자 ID를 입력하세요"
                            className="flex-1 border border-[#364153] rounded-[10px] px-4 py-3 bg-[#1E2939] text-[16px] text-white font-normal"
                            />
                        <button className="px-6 py-3 rounded-[10px] bg-[#BFFF0B]"> <img src={OrganTrainerAdd} alt="조직 트레이너 추가"/> </button>
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
                        추가
                    </button>
                </article>
            </form>
        </section>
    );
}