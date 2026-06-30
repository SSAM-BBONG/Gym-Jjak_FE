import SocialRegistForm from "./SocialRegistForm";


export default function Page() {
    return (
        <div
            className="flex gap-2 flex-col m-auto w-md items-center mt-20">
            <h1 className="font-black text-4xl text-white mb-2.5">회원가입</h1>
            <p className="text-[#99A1AF] text-sm font-normal mb-8">ACTIVE PULSE와 함께 시작하세요</p>
            <SocialRegistForm />
        </div>
    );
}