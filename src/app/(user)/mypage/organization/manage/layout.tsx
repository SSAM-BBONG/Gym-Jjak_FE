import { MypageOrganization, OrganManageActive, OrganManageTrainer, OrganManageTrainerActive } from "@/components/ui/image";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex flex-col px-20 pt-10 gap-8">
                <div className="flex flex-col gap-2">
                    <p className="text-[36px] font-black text-white"> 내 조직 관리 </p>
                    <p className="text-[14px] font-normal text-[#99A1AF]"> 운동시설 정보 및 트레이너를 관리하세요 </p>
                </div>

                <div className="flex gap-5">
                    <Link href="/mypage/organization/manage">
                        <div className="flex gap-3 items-center border-[2px] border-b-[#BFFF0B]">
                            <div className="relative w-5 h-5">
                                <Image
                                    src={MypageOrganization}
                                    alt="내 조직관리 운동시설"
                                    fill
                                    sizes="w-10 h-10"
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative w-5 h-5">
                                <Image
                                    src={OrganManageActive}
                                    alt="내 조직관리 운동시설"
                                    fill
                                    sizes="w-10 h-10"
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-[18px] font-extrabold text-[#BFFF0B]"> 운동시설 관리</p>
                            <p className="text-[18px] font-extrabold text-[#99A1AF]"> 운동시설 관리</p>
                        </div>
                    </Link>

                    <Link href="/mypage/organization/manage/trainer">
                        <div className="flex gap-3 items-center">
                            <div className="relative w-5 h-5">
                                <Image
                                    src={OrganManageTrainer}
                                    alt="내 조직관리 트레이너"
                                    fill
                                    sizes="w-10 h-10"
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative w-5 h-5">
                                <Image
                                    src={OrganManageTrainerActive}
                                    alt="내 조직관리 트레이너"
                                    fill
                                    sizes="w-10 h-10"
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-[18px] font-extrabold text-[#BFFF0B]">  트레이너 관리 </p>
                            <p className="text-[18px] font-extrabold text-[#99A1AF]">  트레이너 관리 </p>
                        </div>
                    </Link>
                </div>
                <hr className="border-[#1E2939]" />
            </div>
            <section className="pt-5 bg-[#0B0F19] px-20 min-h-screen">
                {children}
            </section>
        </>
    );
}