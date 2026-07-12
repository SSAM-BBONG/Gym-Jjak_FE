import { CloseButton } from "@/components/ui/image";
import Image from "next/image";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

interface ReportModalProps {
    isModal: boolean;
    closeModal: () => void;
    title: string;
    reportState: { success: boolean, message: string }
    onSubmit: (data: {
        detail: string;
        reason: "SPAM" | "ADVERTISEMENT" | "ABUSE" | "SEXUAL_CONTENT" | "FRAUD" | "PRIVACY_EXPOSURE" | "ETC";
    }) => Promise<void>;
    handleSubmit: UseFormHandleSubmit<{
        detail: string;
        reason: "SPAM" | "ADVERTISEMENT" | "ABUSE" | "SEXUAL_CONTENT" | "FRAUD" | "PRIVACY_EXPOSURE" | "ETC";
    }, {
        detail: string;
        reason: "SPAM" | "ADVERTISEMENT" | "ABUSE" | "SEXUAL_CONTENT" | "FRAUD" | "PRIVACY_EXPOSURE" | "ETC";
    }>;
    register: UseFormRegister<{
        detail: string;
        reason: "SPAM" | "ADVERTISEMENT" | "ABUSE" | "SEXUAL_CONTENT" | "FRAUD" | "PRIVACY_EXPOSURE" | "ETC";
    }>;
    isSubmitting: boolean;
}


export default function ReportModal({ isModal, closeModal, title, reportState, onSubmit, handleSubmit, register, isSubmitting }: ReportModalProps) {

    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gradient-to-br from-[#101828] to-[#000] w-5/6 mix-h-114 sm:w-md  rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-base md:text-lg lg:text-xl text-[#E8EAF0]">신고 접수</h3>
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
                        <h3 className="font-bold text-base md:text-lg lg:text-xl text-[#E8EAF0]">{title}</h3>
                        <select
                            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#BFFF0B] transition disabled:opacity-50 disabled:cursor-not-allowed"
                            defaultValue='default'
                            {...register('reason')}>
                            <option value='default' disabled hidden>신고 사유</option>
                            <option value='SPAM'>도배</option>
                            <option value='ADVERTISEMENT'>광고</option>
                            <option value='ABUSE'>욕설</option>
                            <option value='SEXUAL_CONTENT'>음란물</option>
                            <option value='FRAUD'>사기</option>
                            <option value='PRIVACY_EXPOSURE'>개인정보</option>
                            <option value='ETC'> 기타</option>
                        </select>
                    </div>
                    <textarea
                        {...register('detail')}
                        placeholder={`사유를 입력해주세요`}
                        className="border-[#364153] border w-full h-36 md:h-47 p-3 md:p-6 bg-[#1E2939] rounded-2xl resize-none focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none"
                    ></textarea>
                </article>
                {!reportState.success && <p className="text-red-400 text-sm md:text-base m-1 mb-5">{reportState.message}</p>}
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
                        신고
                    </button>
                </article>
            </form>

        </section>
    );
}
