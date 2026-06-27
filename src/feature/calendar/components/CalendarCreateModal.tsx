import { CloseButton } from "@/components/ui/image";
import { getDiaryCategories } from "@/service/calendar.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CalendarCategories from "./CalendarCategories";
import { calendarPostAction } from "../action";
import { useActionState, useMemo } from "react";

interface CalendarCreateModalProps {
    isModal: boolean;
    closeModal: () => void;
    selectedSettingDate: string;
    data?: Diary;
    mode?: 'update' | 'create'
}

export default function CalendarCreateModal({ isModal, closeModal, selectedSettingDate, data, mode = 'create' }: CalendarCreateModalProps) {

    // 카테고리 조회
    const {
        data: categoryData,
        isLoading: isCategoryLoading,
        isError: isCategoryError,
    } = useQuery({
        queryKey: ["calendar", "diary-categories"],
        queryFn: getDiaryCategories,
        staleTime: Infinity,
    });

    // 일지 등록
    // 데이터를 변경하는 요청을 관리하는 mutation을 생성
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        // createMutation.mutate(formData)가 호출되면 실행되는 함수 
        mutationFn: ((formData: FormData) => calendarPostAction(selectedSettingDate, formData)),
        // 요청이 성공일 때
        onSuccess: (result) => {
            // 액션에서 넘어오는 return 값이 result
            // 리액트 쿼리는 리턴값을 넘겨주면 성공한걸로 생각하기 때문에 따로 if 문으로 false 반환될 시 처리 
            if (!result.success) {
                return;
            }

            void queryClient.invalidateQueries({
                queryKey: ["calendar-month"],
            });
            // "calendar-month"로 등록된 캐시 무효화

            void queryClient.invalidateQueries({
                queryKey: ["calendar-date", selectedSettingDate],
            });
            // 지금 날짜 캐시 무효화

            closeModal();
        },
    });

    const handleClose = () => {
        createMutation.reset();
        closeModal();
    };


    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={handleClose} >
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    createMutation.mutate(new FormData(event.currentTarget));
                }}
                className="bg-gradient-to-br from-[#101828] to-[#000] w-3xl h-150 rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between
                overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2 mb-8">
                        <h3 className="font-bold text-xl text-[#E8EAF0]">{mode === 'create' ? '일지 추가' : '일지 수정'}</h3>
                        <img src={CloseButton} onClick={handleClose} />
                    </div>
                    <label className="font-bold text-lg text-white ">제목</label>
                    <input
                        defaultValue={data?.title}
                        name="title"
                        placeholder="제목을 입력해주세요"
                        className="border-[#364153] border w-full py-3 px-6 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white focus:outline-none mb-6 mt-3"
                    />
                    <label className="font-bold text-lg text-white mt-6">내용</label>
                    <textarea
                        defaultValue={data?.content}
                        name="content"
                        placeholder="내용을 입력해주세요"
                        className="border-[#364153] border w-full h-47 p-6 bg-[#1E2939] rounded-2xl resize-none focus:border-[#BFFF0B] text-white focus:outline-none mb-6 mt-3"
                    ></textarea>
                    <label className="font-bold text-lg text-white mt-6">카테고리</label>
                    <div className="mt-3 flex gap-3 flex-wrap">
                        {
                            isCategoryLoading && <p>카테고리를 불러오는 중입니다..</p>
                        }
                        {
                            categoryData?.data?.map((category: Category) => {
                                return <CalendarCategories category={category} key={category.categoryId} isDefault={data?.category === category.name} />
                            })
                        }
                    </div>
                    {createMutation.data?.success === false && (
                        <p className="text-red-500 text-md m-2">{createMutation.data.message}</p>
                    )}
                </article>
                <article className='flex gap-3 mt-10'>
                    <button
                        type="button"
                        onClick={handleClose}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-base bg-[#1E2939]'
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B]'
                    >
                        {mode === 'create' ? '저장하기' : '수정하기'}
                    </button>
                </article>
            </form>
        </section>
    );
}