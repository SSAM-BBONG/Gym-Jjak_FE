'use client'

import { useRouter } from "next/navigation";
import { MypageUserProfileData } from "../type";
import { ChangeEvent, useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { MyapgeProfileEditFormValue, myapgeProfileEditSchema } from "@/lib/mypageProfileEditSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { editMyProfileInformationAction, organizationIdDuplicationCheckAction } from "../action";

interface MyProfileEditProps {
    data: MypageUserProfileData
}

interface DuplicationId {
  success: boolean;
  message?: string;
}

export default function MyProfileEditForm( { data }: MyProfileEditProps) {
    const router = useRouter();

    const [nickname, setNickname] = useState(data.nickname);
    const [nicknameCheckState, setNicknameCheckState] =
        useState<DuplicationId>({
        success: false,
        message: "",
        });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<MyapgeProfileEditFormValue>({
        resolver: zodResolver(
        myapgeProfileEditSchema
        ) as Resolver<MyapgeProfileEditFormValue>,
        defaultValues: {
        name: data.name,
        nickname: data.nickname,
        phone: data.phone,
        },
        mode: "onSubmit",
    });

    const nicknameRegister = register("nickname");
    const isNicknameChanged = nickname !== data.nickname;

    const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
        nicknameRegister.onChange(e);
        setNickname(e.target.value);
        setNicknameCheckState({
        success: false,
        message: "",
        });
    };

    const handleNicknameDuplicationCheck = async () => {
        const result = await organizationIdDuplicationCheckAction(nickname);
        setNicknameCheckState(result);
    };

    const onSubmit: SubmitHandler<MyapgeProfileEditFormValue> = async (values) => {
        if (isNicknameChanged && !nicknameCheckState.success) {
        setNicknameCheckState({
            success: false,
            message: "닉네임 중복 확인을 먼저 진행해주세요.",
        });
        return;
        }

        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("nickname", values.nickname);
        formData.append("phone", values.phone);

        const result = await editMyProfileInformationAction(formData);

        if (!result.success) {
        return;
        }

        router.push("/mypage");
    };
    
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-[36px] font-black text-white"> 프로필 수정</p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 회원 정보를 수정하세요</p>
            
            <div className="
            flex flex-col gap-8
            p-8 
            rounded-[16px]
            border
            border-[#36415380]
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            my-8">
                <p className="text-[20px] text-white font-extrabold"> 기본 정보</p>
                <div className="flex flex-col gap-2">
                    <label htmlFor="profile-name" className="text-[14px] text-white font-medium"> 이름 </label>
                    <input 
                        {...register("name")}
                        type="text"
                        defaultValue={data.name}
                        id="profile-name"
                        placeholder="정지훈"
                        className="bg-[#1E2939] border border-[#364153] px-4 py-3 rounded-[10px] text-white outline-none"/>
                        {errors.name?.message && <p className="my-3 text-[12px] text-[#FF6467]">{errors.name.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[14px] text-white font-medium"> 닉네임 </label>
                    <div className="flex gap-2">
                    <input 
                        {...nicknameRegister}
                        onChange={handleNicknameChange}
                        type="text"
                        defaultValue={data.nickname}
                        id="profile-name"
                        placeholder="biyuns"
                        className="flex-1 bg-[#1E2939] border border-[#364153] px-4 py-3 rounded-[10px] text-white outline-none"/>
                    <button 
                        onClick={handleNicknameDuplicationCheck}
                        className="text-[16px] font-medium text-white px-4 py-3 bg-[#364153] rounded-[10px]"> 
                        중복 확인 
                    </button>
                    </div>
                    {nicknameCheckState.message && (
                         <p className="my-3 text-[12px] text-white">{nicknameCheckState.message}</p>
                        )}
                        
                        {errors.nickname?.message && <p className="my-3 text-[12px] text-[#FF6467]">{errors.nickname.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="profile-number" className="text-[14px] text-white font-medium"> 전화번호 </label>
                    <input 
                        {...register("phone")}
                        type="text"
                        id="profile-number"
                        defaultValue={data.phone}
                        placeholder="010-1111-2222"
                        className="bg-[#1E2939] border border-[#364153] px-4 py-3 rounded-[10px] text-white outline-none"/>
                        {errors.phone?.message && <p className="my-3 text-[12px] text-[#FF6467]">{errors.phone.message}</p>}
                </div>
            </div>
            <div className="flex gap-4">
                <button 
                    type="button" 
                    onClick={() => router.back()}
                    className="flex-1 bg-[#1E2939] text-white text-[16px] font-extrabold py-3 mb-20 rounded-[10px]"> 취소 </button>
                <button 
                    type="submit"
                    className="flex-1 bg-[#BFFF0B] text-black text-[16px] font-extrabold py-3 mb-20 rounded-[10px]"> 수정하기 </button>
           </div>
           </form>
    );
}