import { CloseButton } from "@/components/ui/image";
import { organizationRejectAction } from "../../action";
import Image from "next/image";

interface OrganizationRejectModal {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
    organizationId: number;
}


export default function OrganizationRejectModal({ isModal, closeModal, activeModal, organizationId }: OrganizationRejectModal) {
    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                action={organizationRejectAction.bind(null, organizationId)}
                className="bg-gradient-to-br from-[#101828] to-[#000] w-md rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-xl text-[#E8EAF0]">조직 반려 사유 입력</h3>
                        <Image
                            src={CloseButton}
                            alt="모달 닫기 버튼"
                            fill
                            sizes="w-4 h-4"
                        />
                    </div>

                    <textarea
                        name="reason"
                        placeholder="사유를 입력해주세요"
                        className="border-[#364153] border w-full h-47 p-6 bg-[#1E2939] rounded-2xl resize-none focus:border-[#BFFF0B] text-white focus:outline-none"
                    ></textarea>
                </article>
                <article className='flex gap-3 mt-5'>
                    <button
                        type="button"
                        onClick={closeModal}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-base bg-[#1E2939]'
                    >
                        취소
                    </button>
                    <button
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B]'
                    >
                        저장
                    </button>
                </article>
            </form>
        </section>
    );
}