import { MypageStyle } from "@/components/ui/image";
import MypageAccountSettings from "@/feature/mypage/components/MypageAccountSettings";
import MypageInbodyInformation from "@/feature/mypage/components/MypageInbodyInformation";
import MypageMyActivities from "@/feature/mypage/components/MypageMyActivities";
import MypageMyOrganization from "@/feature/mypage/components/MypageMyOrganization";
import MypageMyOrganizationApplication from "@/feature/mypage/components/MypageMyOrganizationApplication";
import MyPageProfile from "@/feature/mypage/components/MypageProfile";
import MypageUserProfileEdit from "@/feature/mypage/components/MyPageUserProfileEdit";
import { decodeJWT } from "@/lib/decode";
import { getMyPageInformation } from "@/service/mypage.service";
import Image from "next/image";

export default async function MyPage() {
  const userinf = await decodeJWT();
  const myPageResponse = await getMyPageInformation();

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

            <MypageAccountSettings socialUser={myPageResponse.data.socialUser}/>
          </>
        ) : (
          <div className="flex gap-6 items-start mt-8">

            <MyPageProfile data={myPageResponse.data} />

            <div className="flex flex-col gap-6 flex-[7.5]">
              <MypageUserProfileEdit userinf={userinf} socialUser={myPageResponse.data.socialUser}/>

              <MypageInbodyInformation />

              <MypageMyActivities />

              <MypageAccountSettings socialUser={myPageResponse.data.socialUser}/>

              <MypageMyOrganizationApplication />

            </div>
          </div>
        )}
    </div>
  );
}
