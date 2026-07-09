import { CloseButton } from "@/components/ui/image";
import StatusSelector from "../StatusSelector";
import Image from "next/image";

interface ChangeStateModalProps {
    isModal: boolean;
    closeModal: () => void;
    changeUserStatusFormAction: (formData: FormData) => void;
    status: 'ETERNAL' | 'ACTIVE' | 'DAY_7' | 'WITHDRAWN';
    name: string;
    state: {
        success: boolean;
        message: string;
    }
}


export default function ChangeStateModal({ isModal, closeModal, changeUserStatusFormAction, status, name, state }: ChangeStateModalProps) {

    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                action={changeUserStatusFormAction}
                className="bg-gradient-to-br from-[#101828] to-[#000] w-5/6 h-114 sm:w-md  rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-base md:text-lg lg:text-xl text-[#E8EAF0]">회원 관리 사유 입력</h3>
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
                        <h3 className="font-bold text-base md:text-lg lg:text-xl text-[#E8EAF0]">{name}</h3>
                        <StatusSelector status={status} />
                    </div>
                    <textarea
                        name="reason"
                        placeholder={`사유를 입력해주세요(활성으로 변경 시 선택 입력)`}
                        className="border-[#364153] border w-full h-36 md:h-47 p-3 md:p-6 bg-[#1E2939] rounded-2xl resize-none focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none"
                    ></textarea>
                    {!state.success && <p className="text-red-400 text-sm md:text-base m-1 mb-5">{state.message}</p>}
                </article>
                <article className='flex gap-3'>
                    <button
                        type="button"
                        onClick={closeModal}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-sm md:text-base bg-[#1E2939]'
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-sm md:text-base bg-[#BFFF0B]'
                    >
                        저장
                    </button>
                </article>
            </form>

        </section>
    );
}
