import { PtRegistFormValue } from "@/lib/ptRegistSchema";
import { PtRegistOrganizationData } from "../type";
import { UseFormRegister } from "react-hook-form";

interface PtRegistSelectGymProps {
    organizations: PtRegistOrganizationData[];
    register: UseFormRegister<PtRegistFormValue>;
    error?: string;
}

export default function PtRegistSelectGym({ organizations, register, error }: PtRegistSelectGymProps) {
    return (
        <section className="flex flex-col gap-4 rounded-[16px] border border-[#36415380] bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)] p-8">
            <div className="flex flex-col gap-1">
                <p className="text-[20px] font-extrabold text-white">소속 헬스장 선택</p>
                <p className="text-[12px] font-normal text-[#6A7282]">PT 등록할 헬스장을 선택해주세요.</p>
            </div>

            {organizations.length > 0 ? (
                <div className="flex flex-col gap-3">
                    {organizations.map((organization) => (
                        <label key={organization.organizationId} className="cursor-pointer">
                            <input
                                type="radio"
                                value={organization.organizationId}
                                className="peer sr-only"
                                {...register("organizationId")}
                            />
                            <span className="block rounded-[10px] border border-[#364153] bg-[#1E2939] px-4 py-3 peer-checked:border-[#BFFF0B] peer-checked:bg-[#BFFF0B]/10">
                                <strong className="block text-[16px] text-white peer-checked:text-[#BFFF0B]">{organization.businessName}</strong>
                                <span className="mt-1 block text-[13px] text-[#99A1AF]">{organization.roadAddress}</span>
                            </span>
                        </label>
                    ))}
                </div>
            ) : (
                <p className="text-[14px] text-[#99A1AF]">소속된 헬스장이 없습니다. 소속 헬스장 등록 후 PT를 등록할 수 있습니다.</p>
            )}

            {error && <p className="text-[14px] text-red-400">{error}</p>}
        </section>
    );
}
