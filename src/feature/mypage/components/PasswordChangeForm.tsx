'use client'

import { PasswordCloseEye, PasswordOpenEye } from "@/components/ui/image";
import { PasswordChangeFormValue, passwordChangeSchema } from "@/lib/passwordChangeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { updatePasswordAction } from "../action";
import Image from "next/image";

export default function PasswordChangeForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordChangeFormValue>({
    resolver: zodResolver(passwordChangeSchema) as Resolver<PasswordChangeFormValue>,
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<PasswordChangeFormValue> = async (values) => {
    const formData = new FormData();

    formData.append("newPassword", values.newPassword);
    formData.append("checkNewPassword", values.checkNewPassword);

    const result = await updatePasswordAction(formData);

    if (!result.success) {
      return;
    }

    router.push("/mypage");
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-6">
      <div className="
            flex flex-col gap-4
            p-6 
            rounded-[16px]
            border
            border-[#36415380]
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]"
      >
        <label className="text-[14px] text-white font-medium"> 새비밀번호 </label>
        <div className="
        flex gap-3 items-center
        border
        border-[#364153]
        rounded-[10px]
        bg-[#1E2939]
        px-4 py-3
        ">
          <input
            type="password"
            placeholder="새 비밀번호를 입력하세요"
            className="flex-1 outline-none text-white"
            {...register("newPassword")}
          />
          <div className="relative w-5 h-5">
            <Image
              src={PasswordCloseEye}
              alt="비밀번호 보이기"
              fill
              priority
              sizes="w-10 h-10"
              className="object-cover hover:cursor-pointer"
            />
          </div>
          <div className="relative w-5 h-5">
            <Image
              src={PasswordOpenEye}
              alt="비밀번호 숨기기"
              fill
              priority
              sizes="w-10 h-10"
              className="object-cover hover:cursor-pointer"
            />
          </div>
        </div>
        {errors.newPassword?.message && (
          <p className="my-3 text-[12px] text-[#FF6467]">{errors.newPassword.message}</p>
        )}
      </div>

      <div className="
            flex flex-col gap-4
            p-6 
            rounded-[16px]
            border
            border-[#36415380]
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]"
      >
        <label className="text-[14px] text-white font-medium"> 비밀번호 확인 </label>
        <div className="
        flex gap-3 items-center
        border
        border-[#364153]
        rounded-[10px]
        bg-[#1E2939]
        px-4 py-3
        ">
          <input
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            className="flex-1 outline-none text-white"
            {...register("checkNewPassword")}
          />
          <div className="relative w-5 h-5">
            <Image
              src={PasswordCloseEye}
              alt="비밀번호 보이기"
              fill
              priority
              sizes="w-10 h-10"
              className="object-cover hover:cursor-pointer"
            />
          </div>
          <div className="relative w-5 h-5">
            <Image
              src={PasswordOpenEye}
              alt="비밀번호 숨기기"
              fill
              priority
              sizes="w-10 h-10"
              className="object-cover hover:cursor-pointer"
            />
          </div>
        </div>
        {errors.checkNewPassword?.message && (
          <p className="my-3 text-[12px] text-[#FF6467]">{errors.checkNewPassword.message}</p>
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => router.back()}
          type="button"
          className="flex-1 py-4 rounded-[10px] bg-[#1E2939] text-[16px] font-extrabold text-white"> 취소 </button>

        <button
          type="submit"
          className="flex-1 py-4 rounded-[10px] bg-[#BFFF0B] text-[16px] font-extrabold text-black"> 변경하기 </button>
      </div>
    </form>
  );
}
