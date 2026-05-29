import { PasswordCloseEye, PasswordOpenEye } from "@/components/ui/image";

export default function PasswordChangeForm() {
  return (
    <div className="flex flex-col gap-6 mt-6">
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
        flex gap-3
        border
        border-[#364153]
        rounded-[10px]
        bg-[#1E2939]
        px-4 py-3
        ">
          <input 
            type="password"
            placeholder="새 비밀번호를 입력하세요"
            className="flex-1 outline-none text-white" />
          <img src={PasswordCloseEye} alt="비밀번호 보이기" />
          <img src={PasswordOpenEye}alt="비밀번호 숨기기" />
        </div>
      </div>

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
        flex gap-3
        border
        border-[#364153]
        rounded-[10px]
        bg-[#1E2939]
        px-4 py-3
        ">
          <input 
            type="password"
            placeholder="새 비밀번호를 입력하세요"
            className="flex-1 outline-none text-white" />
          <img src={PasswordCloseEye} alt="비밀번호 보이기" />
          <img src={PasswordOpenEye}alt="비밀번호 숨기기" />
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 py-4 rounded-[10px] bg-[#1E2939] text-[16px] font-extrabold text-white"> 취소 </button>
        <button className="flex-1 py-4 rounded-[10px] bg-[#BFFF0B] text-[16px] font-extrabold text-black"> 변경하기 </button>
      </div>
    </div>
  );
}
