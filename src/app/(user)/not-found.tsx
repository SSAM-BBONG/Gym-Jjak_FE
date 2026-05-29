import Link from "next/link";
import PreButton from "./preButton";


export default function Page() {
    return (
        <div className="w-110 m-auto text-center">
            <p className="font-black text-9xl text-white mb-13">404</p>
            <p className="font-black text-4xl text-white mb-4">페이지를 찾을 수 없습니다</p>
            <p className="font-normal text-lg text-[#99A1AF] mb-12">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>

            <PreButton />
            <Link href="/"><button className="py-3 px-7 bg-[#BFFF0B] text-black font-bold text-sm rounded-md">메인 페이지</button></Link>
            <p className="font-normal text-sm text-[#6A7282] mt-18 mb-2">문제가 계속되시나요?</p>
            <p className="font-normal text-sm text-[#6A7282]"><span className="text-[#BFFF0B]">support@activepulse.kr</span>또는<span className="text-[#BFFF0B]">1588-0000</span>으로 문의해주세요</p>
        </div>
    );
}