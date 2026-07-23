'use client'
import { Dispatch, SetStateAction, useRef } from "react";

export default function MealAiCreate({ setSelectedImage, selectedImage }: { setSelectedImage: Dispatch<SetStateAction<string | null>>; selectedImage: string | null }) {
    const imgRef = useRef<HTMLImageElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setSelectedImage(null);
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setSelectedImage(event.target?.result as string);
        }
        reader.readAsDataURL(file);
    };

    return (
        <>
            <label className="font-medium text-base md:text-lg text-white">식사 유형</label>
            <div className="flex mb-6 mt-2">
                <select
                    defaultValue={'시간'}
                    name='mealType'
                    className={`border-[#364153] text-sm md:text-base border w-1/3 py-3 md:px-6 px-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white focus:outline-none `}>
                    <option disabled hidden>시간</option>
                    <option value='아침'>아침</option>
                    <option value='점심'>점심</option>
                    <option value='저녁'>저녁</option>
                    <option value='간식'>간식</option>
                </select>
            </div>
            <div className="flex w-full md:gap-3 flex-col md:flex-row">
                <div className="w-full">
                    <label className="font-medium text-base md:text-lg text-white">날짜</label>
                    <input defaultValue={''} name='date' type='date' className="border-[#364153] mt-2 border w-full mb-4 px-4 md:px-6 py-2.5 md:py-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none" />
                </div>
                <div className="w-full">
                    <label className="font-medium text-base md:text-lg text-white">시간</label>
                    <input defaultValue={''} name='time' type='time' className="border-[#364153] mt-2 border w-full mb-4 px-4 md:px-6 py-2.5 md:py-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none" />
                </div>
            </div>

            <div className="my-5">
                <label htmlFor='mealImageFile'
                    className=" px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-bold bg-[#BFFF0B]">파일 선택</label>
                <input
                    hidden
                    type="file"
                    id="mealImageFile"
                    name="mealImageFile"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>

            {selectedImage && (
                <div className="mb-4 flex flex-col gap-3">
                    <img
                        ref={imgRef}
                        src={selectedImage}
                        alt="분류할 이미지"
                        className="max-h-64 w-auto rounded-lg border border-zinc-200 object-contain dark:border-zinc-600"
                    />
                </div>
            )}

        </>
    );
}