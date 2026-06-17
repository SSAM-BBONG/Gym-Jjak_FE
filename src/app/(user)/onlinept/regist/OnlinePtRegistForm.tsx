'use client'
import { OrganApplicationUpload } from "@/components/ui/image";
import { useActionState } from "react";


export default function OnlineptRegistForm() {
    // const [state, formAction, isPending] = useActionState(createPtCourseAction, {
    //     success: false,
    //     message: "",
    //     errors: {},
    // });

    return (
        <form
            // action={formAction} 
            className="flex flex-col gap-6 mt-6">
            {/* {state.message && <p className="text-sm text-red-400">{state.message}</p>} */}
            <div className="
                    flex flex-col gap-4
                    bg-[#101828]
                    border border-[#1E2939] rounded-[16px]
                    p-6
                    ">
                <p className="text-[18px] font-extrabold text-white"> 썸네일 이미지 </p>
                <div className="flex gap-4 items-center">
                    <div className="px-13 py-9 border border-[#364153] bg-[#1E2939] rounded-[10px]">
                        <img src={OrganApplicationUpload} alt="온라인 PT 등록 썸네일 이미지 업로드" />
                    </div>
                    <label
                        className="px-7 py-3 rounded-[10px] bg-[#BFFF0B] text-[16px] font-extrabold text-black cursor-pointer"
                        htmlFor="ptregist-img-upload"> 이미지 업로드 </label>
                    <input type="file" name="thumbnail" className="hidden" id="ptregist-img-upload" />
                </div>
            </div>

            <div className="
                    flex flex-col gap-4
                    bg-[#101828]
                    border border-[#1E2939] rounded-[16px]
                    p-6
                    ">
                <p className="text-[18px] font-extrabold text-white"> 기본 정보</p>
                <div className="flex flex-col gap-6 mt-3">
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-white"> 강습명 *</label>
                        <input
                            name="title"
                            type="text"
                            placeholder="예: 체계적인 가슴 집중 PT"
                            className="
                                    px-4 py-3
                                    bg-[#1E2939]
                                    border border-[#364153] rounded-[10px]
                                    text-[16px] font-normal text-white"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-white"> 강습 소개 *</label>
                        <textarea
                            name="description"
                            placeholder="강습의 목적, 진행 방식, 준비물, 대상자 등을 작성해주세요"
                            className="
                                    px-4 py-3
                                    bg-[#1E2939]
                                    border border-[#364153] rounded-[10px]
                                    text-[16px] font-normal text-white"
                            rows={8} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-white"> 가격 *</label>
                        <input
                            name="price"
                            type="text"
                            placeholder="PT 1회당 가격을 입력해주세요"
                            className="
                                    px-4 py-3
                                    bg-[#1E2939]
                                    border border-[#364153] rounded-[10px]
                                    text-[16px] font-normal text-white"/>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col flex-1 gap-2">
                            <label className="text-[14px] font-medium text-white"> 수강신청 인원 * </label>
                            <input
                                name="totalSessionCount"
                                type="text"
                                placeholder="총 회차를 입력해주세요"
                                className="
                                    px-4 py-3
                                    bg-[#1E2939]
                                    border border-[#364153] rounded-[10px]
                                    text-[16px] font-normal text-white"/>
                        </div>
                        <div className="flex flex-col flex-1 gap-2">
                            <label className="text-[14px] font-medium text-white"> 진행 기간 * </label>
                            <input
                                type="text"
                                placeholder="PT 1회당 진행하는 시간을 입력해주세요"
                                className="
                                    px-4 py-3
                                    bg-[#1E2939]
                                    border border-[#364153] rounded-[10px]
                                    text-[16px] font-normal text-white"/>
                        </div>
                    </div>

                </div>
            </div>


            <div className="flex gap-3">
                <button type="button" className="flex-1 rounded-[10px] bg-[#1E2939] py-4 text-white text-[16px] font-extrabold"> 취소 </button>
                <button
                    // disabled={isPending}
                    className="flex-1 rounded-[10px] bg-[#BFFF0B] py-4 text-black text-[16px] font-extrabold">
                    {/* {isPending ? "등록 중" : "등록하기"} */}
                </button>
            </div>
        </form>
    );
}