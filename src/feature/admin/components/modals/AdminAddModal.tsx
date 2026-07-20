import { CloseButton } from "@/components/ui/image";
import Image from "next/image";
import { createExerciseAction, updateExerciseAction } from "../../action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface AdminAddModalProps {
    isModal: boolean;
    closeModal: () => void;
    system: 'update' | 'create'
    id?: number;
    exercise?: Exercise
}


export default function AdminAddModal({ isModal, closeModal, system, id = 0, exercise }: AdminAddModalProps) {
    const route = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<{ exerciseName: string, part: PartKo | '부위' }>({
        defaultValues: {
            exerciseName: exercise?.exerciseName,
            part: '부위'
        },
        mode: 'onSubmit',
    });

    const onSubmit = async (data: { exerciseName: string, part: PartKo | '부위' }) => {
        try {
            const formData = new FormData();
            formData.set("exerciseName", data.exerciseName);
            formData.set("part", data.part);

            let result;
            if (system === 'update') {
                result = await updateExerciseAction(id, formData)
            } else {
                if (data.part === '부위') {
                    toast.error('운동 부위를 선택해주세요')
                    return;
                }
                result = await createExerciseAction(formData)
            }

            if (result.success) {
                reset();
                closeModal();
                if (system === 'create') {
                    result.success && route.push(`/admin/systems/exercises?part=${data.part}`)
                } else {
                    result.success && route.refresh();
                }
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error('네트워크 연결이 원활하지 않습니다.')
        }
    }

    const clickClose = () => {
        reset();
        closeModal();
    }

    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={clickClose} >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gradient-to-br from-[#101828] to-[#000] w-5/6 max-h-120 sm:w-md rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-base md:text-lg lg:text-xl text-[#E8EAF0]">운동 종류 {system === 'create' ? '추가' : '수정'}</h3>
                        <button type="button" onClick={clickClose} className="relative ml-auto w-5 h-5">
                            <Image
                                src={CloseButton}
                                alt="모달 닫기 버튼"
                                fill
                                sizes="w-4 h-4"
                            />
                        </button>
                    </div>
                    <div className="flex justify-between items-center my-4">
                        <h3 className="font-bold text-base md:text-lg lg:text-xl text-[#E8EAF0]">운동 종류명</h3>
                        <select
                            {...register('part')}
                            className={`border-[#364153] text-sm md:text-base border w-1/3 py-3 md:px-6 px-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white focus:outline-none ${system === 'create' ? '' : 'invisible'}`}>
                            <option disabled hidden>부위</option>
                            <option value='가슴'>가슴</option>
                            <option value='등'>등</option>
                            <option value='어깨'>어깨</option>
                            <option value='팔'>팔</option>
                            <option value='복근'>복근</option>
                            <option value='코어'>코어</option>
                            <option value='하체'>하체</option>
                            <option value='둔근'>둔근</option>
                            <option value='전신'>전신</option>
                        </select>
                    </div>
                    <input
                        {...register('exerciseName')}
                        placeholder="운동 종류를 입력해주세요"
                        className="border-[#364153] border w-full mb-4 px-4 md:px-6 py-2.5 md:py-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none"
                    ></input>
                </article>
                <article className='flex gap-3'>
                    <button
                        type="button"
                        onClick={clickClose}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-sm md:text-base bg-[#1E2939]'
                    >
                        취소
                    </button>
                    <button
                        disabled={isSubmitting}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-sm md:text-base bg-[#BFFF0B]'
                    >
                        {system === 'create' ? '저장' : '수정'}
                    </button>
                </article>
            </form>
        </section >
    );
}
