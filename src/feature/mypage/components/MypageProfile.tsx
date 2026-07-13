import { MypageContinuosDeclaration, MypageWritePost, Profile } from "@/components/ui/image";
import { MyPageDetailData } from "@/feature/mypage/type";
import Image from "next/image";

interface MyPageProfileProps {
  data: MyPageDetailData;
}

export default function MyPageProfile({ data }: MyPageProfileProps) {
  return (
    <div
      className="flex flex-col items-center p-6 flex-[2.5] rounded-[16px] gap-4
        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]"
    >
      <div className="relative flex items-center justify-center size-20 rounded-full  border-3 border-[#BFFF0B]">
        <div className="w-full overflow-hidden rounded-full">
          <div className="relative w-19 h-19">
            <Image
              src={Profile}
              alt="마이페이지 프로필 이미지"
              fill
              sizes="w-10 h-10"
              className="object-cover"
            />
          </div>
        </div>
        <p
          className="
            px-3 py-1 
            bg-[#BFFF0B] rounded-[20px] 
            font-extrabold text-[12px] text-black
            absolute
            -bottom-2
            "
        >
          LV. 5
        </p>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-[20px] font-extrabold text-white">{data.nickname}</p>
        <p className="text-[12px] font-normal text-[#99A1AF]">
          {data.username}
        </p>
      </div>

      <div className="flex w-full justify-between px-3 bg-[#1E293980] p-3 rounded-[10px]">
        <div className="flex gap-2 items-center">
          <div className="relative w-4 h-4">
            <Image
              src={MypageWritePost}
              alt="마이페이지 작성한 글"
              fill
              sizes="w-8 h-8"
              className="object-cover"
            />
          </div>
          <p className="text-[14px] text-[#99A1AF] font-normal">
            작성한 게시글
          </p>
        </div>
        <p className="text-[16px] font-extrabold text-[#BFFF0B]"> 12 </p>
      </div>

      <div className="flex w-full justify-between bg-[#1E293980] p-3 rounded-[10px]">
        <div className="flex gap-2 items-center">
          <div className="relative w-3 h-4">
            <Image
              src={MypageContinuosDeclaration}
              alt="마이페이지 작성한 글"
              fill
              sizes="w-6 h-8"
              className="object-cover"
            />
          </div>
          <p className="text-[14px] text-[#99A1AF] font-normal">
            연속 출석
          </p>
        </div>
        <p className="text-[16px] font-extrabold text-[#FF6900]"> 7일 </p>
      </div>
    </div >
  );
}
