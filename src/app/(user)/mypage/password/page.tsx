import PasswordChangeForm from "@/feature/mypage/components/PasswordChangeForm";

export default function Page() {
    return (
        <div className="flex flex-col px-80 pt-10">
            <p className="text-[36px] font-black text-white"> 비밀번호 변경 </p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 새로운 비밀번호를 설정하세요 </p>
            <PasswordChangeForm/>
        </div>
    );
}