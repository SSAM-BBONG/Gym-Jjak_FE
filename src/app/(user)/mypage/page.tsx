import { MypageStyle } from "@/components/ui/image";
import MypageAccountSettings from "@/feature/mypage/components/MypageAccountSettings";
import MypageInbodyInformation from "@/feature/mypage/components/MypageInbodyInformation";
import MypageMyActivities from "@/feature/mypage/components/MypageMyActivities";
import MypageMyOrganization from "@/feature/mypage/components/MypageMyOrganization";
import MypageMyOrganizationApplication from "@/feature/mypage/components/MypageMyOrganizationApplication";
import MyPageProfile from "@/feature/mypage/components/MypageProfile";
import MypageUserProfileEdit from "@/feature/mypage/components/MyPageUserProfileEdit";
import { decodeJWT } from "@/lib/decode";
import Image from "next/image";

export default async function MyPage() {

  // 사용자 정보 디코딩
  const userinf = await decodeJWT();

  return (
    <div className="flex flex-col gap-1 pt-8 px-40">
      <p className="text-[36px] font-black text-white"> 마이페이지</p>
      <p className="text-[14px] font-normal text-[#99A1AF]">
        나의 정보를 확인하고 관리하세요
      </p>

      {userinf?.role === "ORGANIZATION"
        ?
        (
          <>
            <MypageMyOrganization />

            <MypageAccountSettings />
          </>
        ) : (
          <div className="flex gap-6 items-start mt-8">

            <MyPageProfile />

            <div className="flex flex-col gap-6 flex-[7.5]">
              <MypageUserProfileEdit />

              <MypageInbodyInformation />

              <MypageMyActivities />

              <MypageAccountSettings />

              <div
                className="
                      flex flex-col
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border border-[#36415380]
            rounded-[16px]
            p-6
            gap-6
            opacity-50"
              >
                <div className="flex gap-2 items-center">
                  <div className="relative w-5 h-5">
                    <Image
                      src={MypageStyle}
                      alt="마이페이지 칭호"
                      fill
                      priority
                      sizes="w-10 h-10"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-[18px] font-extrabold text-white"> 칭호</p>
                </div>

                <div className="flex items-center justify-center py-8">
                  <p className="text-[#6A7282] text-[14px] font-normal ">

                    준비중인 기능입니다.
                  </p>
                </div>
              </div>

              <MypageMyOrganizationApplication />

            </div>
          </div>
        )}
    </div>
  );
}
