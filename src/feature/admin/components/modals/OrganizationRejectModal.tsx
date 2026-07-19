'use client'

import { CloseButton } from "@/components/ui/image";
import { organizationRejectAction } from "../../action";
import Image from "next/image";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface OrganizationRejectModal {
    isModal: boolean;
    closeModal: () => void;
    organizationId: number;
}


export default function OrganizationRejectModal({ isModal, closeModal, organizationId }: OrganizationRejectModal) {

    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<{ rejectReason: string }>({
        mode: "onSubmit",
    });

    const onSubmit = async (data: { rejectReason: string }) => {
        const formData = new FormData();
        formData.set("reason", data.rejectReason);

        try {
            const response = await organizationRejectAction(organizationId, formData);

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            reset();
            toast.success(response.message);
            router.push("/admin/approvals/organizations?page=1");
        } catch (error) {
            toast.error("네트워크 오류입니다");
        }
    };
    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                onSubmit={() => handleSubmit(onSubmit)}
                className="bg-gradient-to-br from-[#101828] to-[#000] w-5/6 max-h-120 sm:w-4/5 sm:max-h-5/6 md:w-3/5 md:max-h-5/6 lg:w-md rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-base md:text-lg lg:text-xl text-[#E8EAF0]">조직 반려 사유 입력</h3>
                        <button type="button" onClick={closeModal} className="relative ml-auto w-5 h-5">
                            <Image
                                src={CloseButton}
                                alt="모달 닫기 버튼"
                                fill
                                sizes="w-4 h-4"
                            />
                        </button>
                    </div>

                    <textarea
                        {...register('rejectReason')}
                        placeholder="사유를 입력해주세요"
                        className="border-[#364153] border w-full h-36 md:h-47 p-3 md:p-6 bg-[#1E2939] rounded-2xl resize-none focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none"
                    ></textarea>
                </article>
                <article className='flex gap-3 mt-5'>
                    <button
                        type="button"
                        onClick={closeModal}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-sm md:text-base bg-[#1E2939]'
                    >
                        취소
                    </button>
                    <button
                        disabled={isSubmitting}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-sm md:text-base bg-[#BFFF0B]'
                    >
                        저장
                    </button>
                </article>
            </form>
        </section>
    );
}
