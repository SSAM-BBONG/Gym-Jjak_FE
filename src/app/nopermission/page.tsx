import Link from "next/link";
import PreButton from "../(user)/preButton";

export default function page() {
    return (
        <div className="w-110 m-auto text-center">
            <p className="font-black text-9xl text-white mt-20 mb-13">403</p>
            <p className="font-black text-4xl text-white mb-4">접근이 거부되었습니다</p>
            <p className="font-normal text-lg text-[#99A1AF] mb-12">이 페이지에 접근할 권한이 없습니다.</p>

            {/* <PreButton /> */}
            <Link href="/"><button className="py-3 px-7 bg-[#BFFF0B] text-black font-bold text-sm rounded-md">메인 페이지</button></Link>
            <p className="font-normal text-sm text-[#6A7282] mt-18 mb-2">문제가 계속되시나요?</p>
            <p className="font-normal text-sm text-[#6A7282]"><span className="text-[#BFFF0B]">support@activepulse.kr</span>또는<span className="text-[#BFFF0B]">1588-0000</span>으로 문의해주세요</p>
        </div>
    );
}