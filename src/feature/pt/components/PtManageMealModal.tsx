import { CloseButton } from "@/components/ui/image";
import { trainerMealGetAction } from "@/feature/Meal/action";
import { Meal } from "@/feature/Meal/type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface PtManageMealDetailModalProps {
    mealId: number;
    targetUserId: number;
    isModal: boolean,
    closeModal: () => void;
}


export default function PtManageMealModal({
    mealId,
    targetUserId,
    isModal,
    closeModal,
}: PtManageMealDetailModalProps) {
    const {
        data: mealData,
    } = useQuery<{ data: Meal }, Error, Meal>({
        queryKey: ["trainer", "meals", "detail", targetUserId, mealId],
        queryFn: () => trainerMealGetAction(mealId, targetUserId),
        enabled: !!mealId && !!targetUserId,
        select: (response) => response.data,
    });

    if (!isModal) return;
    return (
        <section
            className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 px-4"
            onClick={closeModal}
        >
            <article
                role="dialog"
                aria-modal="true"
                aria-labelledby="trainer-meal-view-modal-title"
                className="flex max-h-[80dvh] w-4/5 flex-col overflow-y-auto rounded-2xl border border-[#1E2939] bg-linear-to-br from-[#101828] to-black p-6 [scrollbar-width:none] sm:w-md md:w-lg [&::-webkit-scrollbar]:hidden"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="mb-6 flex items-center justify-between border-b border-b-[#1E2939] pb-6 md:mb-8 md:pt-2 md:pb-8">
                    <h3
                        id="trainer-meal-view-modal-title"
                        className="text-base font-bold text-[#E8EAF0] md:text-lg"
                    >
                        식단 상세
                    </h3>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="relative ml-auto size-5"
                    >
                        <Image src={CloseButton} alt="모달 닫기 버튼" fill sizes="20px" />
                    </button>
                </header>


                <div className="flex flex-1 flex-col gap-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <span className="inline-flex rounded-sm bg-[#364153] px-3 py-1 text-xs font-extrabold text-[#D1D5DC]">
                                {mealData?.mealType}
                            </span>
                            <h4 className="mt-3 text-lg font-bold text-white md:text-xl">
                                {mealData?.menu}
                            </h4>
                            <p className="mt-1 text-sm text-[#99A1AF]">
                                {mealData?.mealTime}
                            </p>
                        </div>
                        <strong className="shrink-0 text-lg text-[#BFFF0B] md:text-xl">
                            {mealData?.kcal || 0} kcal
                        </strong>
                    </div>

                    {mealData?.imageUrl && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[#1E2939]">
                            <Image
                                src={mealData.imageUrl}
                                alt='식단 사진'
                                fill
                                sizes="(max-width: 640px) 80vw, 512px"
                                className="object-cover"
                            />
                        </div>
                    )}
                    {(mealData?.carbohydrate || mealData?.protein || mealData?.fat) && (
                        <div>
                            <h4 className="mb-3 text-base font-bold text-white md:text-lg">
                                영양 정보
                            </h4>
                            <div className="grid grid-cols-3 gap-2 md:gap-3">
                                <div className="rounded-lg border border-[#364153] bg-[#1E2939] px-3 py-4 text-center">
                                    <div className="text-xs text-[#99A1AF] md:text-sm">탄수화물</div>
                                    <div className="mt-1 text-sm font-bold text-white md:text-base">
                                        {mealData?.carbohydrate || 0}
                                    </div>
                                </div>
                                <div className="rounded-lg border border-[#364153] bg-[#1E2939] px-3 py-4 text-center">
                                    <div className="text-xs text-[#99A1AF] md:text-sm">단백질</div>
                                    <div className="mt-1 text-sm font-bold text-white md:text-base">
                                        {mealData?.protein || 0}
                                    </div>
                                </div>
                                <div className="rounded-lg border border-[#364153] bg-[#1E2939] px-3 py-4 text-center">
                                    <div className="text-xs text-[#99A1AF] md:text-sm">지방</div>
                                    <div className="mt-1 text-sm font-bold text-white md:text-base">
                                        {mealData?.fat || 0}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </section>
    );
}