import { CloseButton } from "@/components/ui/image";
import { createCategoryAction, createTagAction, updateCategoryAction, updateTagAction } from "../../action";
import { useActionState } from "react";
import Image from "next/image";

interface AdminAddModalProps {
    isModal: boolean;
    closeModal: () => void;
    mode: '카테고리' | '태그';
    system: 'update' | 'create'
    id?: number;
    name?: string
}


export default function AdminAddModal({ isModal, closeModal, mode, system, id = 0, name = '' }: AdminAddModalProps) {
    if (!isModal) return null;

    //여기 useAction사용해서 바꿔야함 
    //그리고 수정이랑 크리에이트 그냥 모달 따로 두는게 좋을 듯
    let systemAction;
    if (mode === '카테고리') {
        if (system === 'update') {
            systemAction = updateCategoryAction.bind(null, id)
        } else {
            systemAction = createCategoryAction
        }
    } else {
        if (system === 'update') {
            systemAction = updateTagAction.bind(null, id)
        } else {
            systemAction = createTagAction
        }
    }

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                action={systemAction}
                className="bg-gradient-to-br from-[#101828] to-[#000] w-md rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-xl text-[#E8EAF0]">{mode} {system === 'create' ? '추가' : '수정'}</h3>
                        <button onClick={closeModal} className="relative ml-auto w-5 h-5">
                            <Image
                                src={CloseButton}
                                alt="모달 닫기 버튼"
                                fill
                                priority
                                sizes="w-4 h-4"
                            />
                        </button>
                    </div>
                    <div className="flex justify-between items-center my-4">
                        <h3 className="font-bold text-xl text-[#E8EAF0] py-2">{mode}명</h3>
                    </div>
                    <input
                        name="name"
                        defaultValue={name}
                        placeholder="이름을 입력해주세요"
                        className="border-[#364153] border w-full mb-4 px-6 py-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white focus:outline-none"
                    ></input>
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
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B]'
                    >
                        {system === 'create' ? '저장' : '수정'}
                    </button>
                </article>
            </form>
        </section >
    );
}