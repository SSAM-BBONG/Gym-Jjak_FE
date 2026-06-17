"use client";

import { OrganApplicationUpload} from "@/components/ui/image";
import { createPtCourseAction } from "@/feature/pt/action";
import { useActionState } from "react";

export default function PtRegistForm() {
    const [state, formAction, isPending] = useActionState(createPtCourseAction, {
        success: false,
        message: "",
        errors: {},
    });

    return (
        <form action={formAction} className="flex flex-col gap-6 mt-6">
            {state.message && <p className="text-sm text-red-400">{state.message}</p>}
            <div className="
            flex flex-col gap-4
            bg-[#101828]
            border border-[#1E2939] rounded-[16px]
            p-6
            ">
                <p className="text-[18px] font-extrabold text-white"> 썸네일 이미지 </p>
                <div className="flex gap-4 items-center">
                    <div className="px-13 py-9 border border-[#364153] bg-[#1E2939] rounded-[10px]"> 
                        <img src={OrganApplicationUpload} alt="PT 등록 썸네일 이미지 업로드"/> 
                    </div>
                    <label
                        className="px-7 py-3 rounded-[10px] bg-[#BFFF0B] text-[16px] font-extrabold text-black cursor-pointer" 
                        htmlFor="ptregist-img-upload"> 이미지 업로드 </label>
                    <input type="file" name="thumbnail" className="hidden" id="ptregist-img-upload"/>
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
                        <label className="text-[14px] font-medium text-white"> 강습명 </label>
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
                        <label className="text-[14px] font-medium text-white"> 강습 소개 </label>
                        <textarea 
                            name="description"
                            placeholder="강습의 목적, 진행 방식, 준비물, 대상자 등을 작성해주세요"
                            className="
                            px-4 py-3
                            bg-[#1E2939]
                            border border-[#364153] rounded-[10px]
                            text-[16px] font-normal text-white"
                            rows={8}/>
                    </div>
                    <div className="flex gap-4">
                    <div className="flex flex-col flex-1 gap-2">
                        <label className="text-[14px] font-medium text-white"> 총 회차 </label>
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
                        <label className="text-[14px] font-medium text-white"> 1회 시간 </label>
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
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-white"> 가격 (1회당)</label>
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
                </div>
            </div>

            <div className="
            flex flex-col gap-6
            bg-[#101828]
            border border-[#1E2939] rounded-[16px]
            p-6
            ">
                <p className="text-[18px] font-extrabold text-white"> 카테고리 및 태그 </p>
                <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-medium text-white"> 카테고리 </p>
                    <div className="flex gap-3">
                        <label className="px-4 py-2 bg-[#BFFF0B] rounded-[10px] text-black text-[16px] font-extrabold"><input className="hidden" name="categoryId" type="radio" value="1" defaultChecked /> 다이어트 </label>
                        <label className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[16px] font-medium"><input className="hidden" name="categoryId" type="radio" value="2" /> 벌크업 </label>
                        <label className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[16px] font-medium"><input className="hidden" name="categoryId" type="radio" value="3" /> 체력증진 </label>
                        <label className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[16px] font-medium"><input className="hidden" name="categoryId" type="radio" value="4" /> 재활 </label>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-medium text-white"> 태그 (복수 선택) </p>
                    <div className="flex gap-1">
                        <label className="px-4 py-2 bg-[#BFFF0B] rounded-[10px] text-black text-[14px] font-extrabold"><input className="hidden" name="tagId" type="radio" value="1" defaultChecked /> 어깨 </label>
                        <label className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"><input className="hidden" name="tagId" type="radio" value="2" /> 가슴 </label>
                        <button className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"> 등 </button>
                        <button className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"> 하체 </button>
                        <button className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"> 허벅지 </button>
                        <button className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"> 팔 </button>
                        <button className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"> 복근 </button>
                        <button className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"> 전신 </button>
                        <button className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"> 유산소 </button>
                        <button className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"> 전체 </button>
                    </div>
                </div>
            </div>

            <div className="
            flex flex-col
            bg-[#101828]
            border border-[#1E2939] rounded-[16px]
            p-6
            ">
                <p className="text-[18px] font-extrabold text-white"> 강습 장소</p>
                <div className="flex gap-3 mt-6">
                        <input 
                            type="text" 
                            placeholder="강습 장소를 입력해주세요"
                            className="
                            flex-8
                            px-4 py-3
                            bg-[#1E2939]
                            border border-[#364153] rounded-[10px]
                            text-[16px] font-normal text-white"/>
                    <button className="flex-2 px-4 py-2 bg-[#BFFF0B] rounded-[10px] text-black text-[16px] font-extrabold">  지도에서 선택</button>
                </div>
                <p className="text-[12px] font-normal text-[#6A7282] mt-1"> 지도에서 위치를 클릭하여 주소를 선택하세요 </p>
            </div>

            <div className="
            flex flex-col gap-6
            bg-[#101828]
            border border-[#1E2939] rounded-[16px]
            p-6
            ">
                <div className="flex justify-between items-center"> 
                    <p className="text-[18px] font-extrabold text-white"> 커리큘럼 </p>
                    <button className="px-4 py-2 bg-[#364153] rounded-[10px] text-white text-[14px] font-medium">  + 회차 추가</button>
                </div>
                <div className="
                flex flex-col gap-6
                bg-[#1E2939]
                rounded-[10px]
                p-4"> 
                    <p className="text-[14px] font-extrabold text-[#BFFF0B]"> 1회차 </p>
                    <div className="flex flex-col gap-4">
                        <input 
                            className="
                            bg-[#101828]
                            border border-[#364153] rounded-[10px]
                            px-3 py-2
                            text-[14px] font-normal text-white"
                            type="text" 
                            placeholder="회차 제목"/>
                        <textarea 
                            className="
                            bg-[#101828]
                            border border-[#364153] rounded-[10px]
                            px-3 py-2
                            text-[14px] font-normal text-white"    
                            placeholder="회차 설명"/>
                    </div>
                </div>
            </div>

            <div className="
            flex flex-col gap-6
            bg-[#101828]
            border border-[#1E2939] rounded-[16px]
            p-6
            ">
                <div className="flex justify-between items-center"> 
                    <p className="text-[18px] font-extrabold text-white"> 수업 시간 </p>
                    <button className="px-4 py-2 bg-[#364153] rounded-[10px] text-white text-[14px] font-medium">  + 시간 추가</button>
                </div>
                <div className="flex gap-3">
                        <select className="
                    bg-[#1E2939]
                    border border-[#364153] rounded-[10px]
                    py-2
                    px-8
                    text-white
                    ">
                            <option> 웙</option>
                            <option> 화</option>
                            <option> 수</option>
                            <option> 목</option>
                            <option> 금</option>
                            <option> 토</option>
                            <option> 일</option>
                        </select>
                        <select className="
                        flex-1
                      bg-[#1E2939]
                        border border-[#364153] rounded-[10px]
                        py-2
                        px-4
                    text-white">
                            <option> 01:00</option>
                            <option> 02:00</option>
                            <option> 03:00</option>
                            <option> 04:00</option>
                            <option> 05:00</option>
                            <option> 06:00</option>
                            <option> 07:00</option>
                            <option> 08:00</option>
                            <option> 09:00</option>
                            <option> 10:00</option>
                            <option> 11:00</option>
                            <option> 12:00</option>
                            <option> 13:00</option>
                            <option> 14:00</option>
                            <option> 15:00</option>
                            <option> 16:00</option>
                            <option> 17:00</option>
                            <option> 18:00</option>
                            <option> 19:00</option>
                            <option> 20:00</option>
                            <option> 21:00</option>
                            <option> 22:00</option>
                            <option> 23:00</option>
                            <option> 24:00</option>
                        </select>
                </div>
            </div>

            <div className="flex gap-3">
                <button type="button" className="flex-1 rounded-[10px] bg-[#1E2939] py-4 text-white text-[16px] font-extrabold"> 취소 </button>
                <button disabled={isPending} className="flex-1 rounded-[10px] bg-[#BFFF0B] py-4 text-black text-[16px] font-extrabold"> {isPending ? "등록 중" : "등록하기"} </button>
            </div>
        </form>
    );
}
