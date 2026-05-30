import {
  MypageAccountSetting, MypageApplication, MypageContinuosDeclaration, MypageInbody, MypageMyActivity, MypageOnboarding,
  MypageOrganApplication, MypageOrganization, MypageProfile, MypageStyle, MypageUserEdit, MypageWritePost,
  Profile,
} from "@/components/ui/image";
import { decodeJWT } from "@/lib/decode";
import Link from "next/link";

export default async function MyPage() {

  // 사용자 정보 디코딩
  const userinf = await  decodeJWT();

  return (
    <div className="flex flex-col gap-1 pt-8 px-40">
      <p className="text-[36px] font-black text-white"> 마이페이지</p>
      <p className="text-[14px] font-normal text-[#99A1AF]">
        나의 정보를 확인하고 관리하세요
      </p>

    { userinf?.role === "TRAINER" 
      ?
      (
        <>
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
              <img src={MypageMyActivity} alt="마이페이지 나의 활동" />
              <p className="text-[18px] font-extrabold text-white">나의 조직</p>
            </div>
            <Link href="/mypage/organization/manage">
            <div className="flex justify-between bg-[#1E2939] rounded-[10px] p-4">
              <p className="text-[14px] font-medium text-white">
                내 조직 관리
              </p>
              <div className="flex gap-2">
                <p className="text-[12px] font-medium text-[#6A7282]"> 12개 </p>
                <p className="text-[12px] font-medium text-[#6A7282]"> 〉</p>
              </div>
            </div>
            </Link>
          </div>

          <div
            className="
            flex flex-col
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border border-[#82181A4D]
            rounded-[16px]
            p-6
            gap-6"
          >
            <div className="flex gap-2 items-center">
              <img src={MypageAccountSetting} alt="마이페이지 계정 설정" />
              <p className="text-[18px] font-extrabold text-[#FF6467]">
                계정 설정
              </p>
            </div>

            <Link href="/mypage/password">
            <div className=" flex justify-between items-center p-4 bg-[#1E293980] rounded-[10px]">
              <p className="text-[14px] font-medium text-[#99A1AF]">
                비밀번호 변경
              </p>
              <p className="text-[12px] font-medium text-[#6A7282]"> 〉 </p>
            </div>
            </Link>

            <div className=" flex justify-between items-center p-4 bg-[#1E293980] rounded-[10px]">
              <p className="text-[14px] font-medium text-[#99A1AF]">
                회원 탈퇴
              </p>
              <p className="text-[12px] font-medium text-[#6A7282]"> 〉 </p>
            </div>
          </div>
          </>
      ) : (
      <div className="flex gap-6 items-start mt-8">
        <div
          className="flex flex-col items-center p-6 flex-[2.5] rounded-[16px] gap-4
        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]"
        >
          <div className="relative flex items-center justify-center size-20 rounded-full  border-3 border-[#BFFF0B]">
            <div className="w-full overflow-hidden rounded-full">
            <img
              className="w-full"
              src={Profile}
              alt="마이페이지 프로필 이미지"
            />
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
            <p className="text-[20px] font-extrabold text-white">사용자 이름</p>
            <p className="text-[12px] font-normal text-[#99A1AF]">
              사용자 이메일
            </p>
          </div>

          <div className="flex w-full justify-between px-3 bg-[#1E293980] p-3 rounded-[10px]">
            <div className="flex gap-2 items-center">
              <img src={MypageWritePost} alt="마이페이지 작성한 글" />
              <p className="text-[14px] text-[#99A1AF] font-normal">
                작성한 게시글
              </p>
            </div>
            <p className="text-[16px] font-extrabold text-[#BFFF0B]"> 12 </p>
          </div>

          <div className="flex w-full justify-between bg-[#1E293980] p-3 rounded-[10px]">
            <div className="flex gap-2 items-center">
              <img
                src={MypageContinuosDeclaration}
                alt="마이페이지 연속 출석"
              />
              <p className="text-[14px] text-[#99A1AF] font-normal">
                연속 출석
              </p>
            </div>
            <p className="text-[16px] font-extrabold text-[#FF6900]"> 7일 </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 flex-[7.5]">
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
            <div className="flex gap-2">
              <img src={MypageUserEdit} alt="마이페이지 회원 프로필 수정" />
              <p className="text-white text-[18px] font-extrabold">
                회원 프로필 수정
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Link href="/mypage/trainerprofile">
              <div className="p-4 flex flex-col gap-2 bg-[#1E2939] rounded-[14px]">
                <div className="flex justify-between items-center">
                  <img src={MypageProfile} alt="마이페이지 트레이너 프로필" />
                  <p className="text-[#6A7282] text-[12px] font-black"> 〉 </p>
                </div>
                <p className="text-[14px] font-extrabold text-white">
                  트레이너 프로필
                </p>
                <p className="text-[12px] font-medium text-[#99A1AF]">
                  트레이너 프로필 수정
                </p>
              </div>
              </Link>
              <Link href="/mypage/profile">
              <div className="p-4 flex flex-col gap-2 bg-[#1E2939] rounded-[14px]">
                <div className="flex justify-between items-center">
                  <img src={MypageProfile} alt="마이페이지 회원 프로필" />
                  <p className="text-[#6A7282] text-[12px] font-black"> 〉 </p>
                </div>
                <p className="text-[14px] font-extrabold text-white">
                  회원 프로필
                </p>
                <p className="text-[12px] font-medium text-[#99A1AF]">
                  기본 프로필 수정
                </p>
              </div>
              </Link>
              <Link href="/mypage/onboarding">
              <div className="p-4 flex flex-col gap-2 bg-[#1E2939] rounded-[14px]">
                <div className="flex justify-between items-center">
                  <img src={MypageOnboarding} alt="마이페이지 온보딩 정보" />
                  <p className="text-[#6A7282] text-[12px] font-black"> 〉</p>
                </div>
                <p className="text-[14px] font-extrabold text-white">
                  온보딩 정보
                </p>
                <p className="text-[12px] font-medium text-[#99A1AF]">
                  온보딩 정보 확인/재설정
                </p>
              </div>
              </Link>
            </div>
          </div>

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
              <img src={MypageOnboarding} alt="마이페이지 인바디 정보" />
              <p className="text-[18px] font-extrabold text-white">
                인바디 정보
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 bg-[#1E2939] p-6 rounded-[14px]">
              <div className="flex items-center justify-center rounded-full bg-[#BFFF0B1A] p-3">
                <img src={MypageInbody} alt="마이페이지 인바디 입력하기" />
              </div>
              <p className="text-[16px] font-extrabold text-white">
                인바디 입력하기
              </p>
              <p className="text-[12px] font-medium text-[#99A1AF]">
                키, 몸무게, 체지방률 등을 기록하세요
              </p>
              <button className="px-4 py-2 text-[14px] font-bold text-black bg-[#BFFF0B] rounded-[16px]">
                입력하기
              </button>
            </div>
          </div>

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
              <img src={MypageMyActivity} alt="마이페이지 나의 활동" />
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

          <div
            className="
            flex flex-col
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border border-[#82181A4D]
            rounded-[16px]
            p-6
            gap-6"
          >
            <div className="flex gap-2 items-center">
              <img src={MypageAccountSetting} alt="마이페이지 계정 설정" />
              <p className="text-[18px] font-extrabold text-[#FF6467]">
                계정 설정
              </p>
            </div>

            <Link href="/mypage/password">
            <div className=" flex justify-between items-center p-4 bg-[#1E293980] rounded-[10px]">
              <p className="text-[14px] font-medium text-[#99A1AF]">
                비밀번호 변경
              </p>
              <p className="text-[12px] font-medium text-[#6A7282]"> 〉 </p>
            </div>
            </Link>

            <div className=" flex justify-between items-center p-4 bg-[#1E293980] rounded-[10px]">
              <p className="text-[14px] font-medium text-[#99A1AF]">
                회원 탈퇴
              </p>
              <p className="text-[12px] font-medium text-[#6A7282]"> 〉 </p>
            </div>
          </div>

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
              <img src={MypageStyle} alt="마이페이지 칭호" />
              <p className="text-[18px] font-extrabold text-white"> 칭호</p>
            </div>

            <div className="flex items-center justify-center py-8">
              <p className="text-[#6A7282] text-[14px] font-normal ">
                
                준비중인 기능입니다.
              </p>
            </div>
          </div>

          <div
            className="
            flex flex-col
            bg-[linear-gradient(135deg,rgba(191,255,11,0.10)0%,rgba(168,230,0,0.05)100%)]
            border border-[#BFFF0B4D]
            rounded-[16px]
            p-6
            gap-3
            mb-15
            "
          >
            <div className="flex gap-2 items-center">
              <img src={MypageOrganization} alt="마이페이지 조직 계정 신청" />
              <p className="text-[18px] font-extrabold text-white">
                조직 계정 신청
              </p>
            </div>

            <p className="text-[14px] font-normal text-[#D1D5DC]">
              헬스장, PT 센터 등 운동시설을 운영하시나요?
            </p>
            <p className="text-[12px] font-normal text-[#99A1AF]">
              조직 계정을 신청하여 더 많은 회원을 관리하고 비지니스를
              확장하세요.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/mypage/organization/application">
              <div className="flex flex-col bg-[#1E2939] rounded-[14px] p-4">
                <div className="flex justify-between mb-3">
                  <img
                    src={MypageApplication}
                    alt="마이페이지 조직 계정 신청 내역"
                  />
                  <p className="text-[12px] font-extrabold text-[#6A7282]">
                    
                    〉
                  </p>
                </div>
                <p className="text-[14px] font-extrabold text-white">
                  
                  신청내역
                </p>
                <p className="text-[12px] font-medium text-[#99A1AF]">
                  
                  조직 신청 목록 확인
                </p>
              </div>
              </Link>
              <Link href="/mypage/organization">
              <div className="flex flex-col bg-[#BFFF0B] rounded-[14px] p-4">
                <div className="flex justify-between mb-3">
                  <img
                    src={MypageOrganApplication}
                    alt="마이페이지 조직 신청하기"
                  />
                  <p className="text-[12px] font-extrabold text-black"> 〉</p>
                </div>
                <p className="text-[14px] font-extrabold text-black">
                  신청하기
                </p>
                <p className="text-[12px] font-medium text-black">
                  새로운 조직 신청
                </p>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
