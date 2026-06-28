import { MypageApplication, MypageOrganApplication, MypageOrganization } from "@/components/ui/image";
import Link from "next/link";

export default function MypageMyOrganizationApplication() {
    return (
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
                  <Link href="/mypage/organization">
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
                  <Link href="/mypage/organization/application">
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
    );
}