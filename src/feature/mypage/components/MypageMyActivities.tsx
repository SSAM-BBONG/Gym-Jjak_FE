import { MypageMyActivity } from "@/components/ui/image";
import Image from "next/image";
import Link from "next/link";

export default function MypageMyActivities() {
  return (
    <div
      className="
            flex flex-col
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border border-[#36415380]
            rounded-[16px]
            p-6
            gap-6
            "
    >
      <div className="flex gap-2 items-center">
        <div className="relative w-5 h-5">
          <Image
            src={MypageMyActivity}
            alt="마이페이지 나의 활동"
            fill
            priority
            sizes="w-10 h-10"
            className="object-cover"
          />
        </div>
        <p className="text-[18px] font-extrabold text-white">나의 활동</p>
      </div>
      <Link href="/mypage/mypost">
        <div className="flex justify-between bg-[#1E2939] rounded-[10px] p-4">
          <p className="text-[14px] font-medium text-white">
            내가 작성한 게시글
          </p>
          <div className="flex gap-2">
            <p className="text-[12px] font-medium text-[#6A7282]"> 12개 </p>
            <p className="text-[12px] font-medium text-[#6A7282]"> 〉</p>
          </div>
        </div>
      </Link>
    </div>

  );
}