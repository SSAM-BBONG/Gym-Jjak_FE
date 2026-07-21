"use client";

import { organizationSearchAction } from "../actions";
import { OrganizationSearchItem } from "../type";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { TrainerRegistFormValue } from "@/lib/trainerRegistSchema";

interface TrainerAffiliatedGymProps {
    setValue: UseFormSetValue<TrainerRegistFormValue>;
    error?: string;
}

export default function TrainerAffiliatedGym({
    setValue,
    error,
}: TrainerAffiliatedGymProps) {
    const [keyword, setKeyword] = useState("");
    const [organizations, setOrganizations] = useState<OrganizationSearchItem[]>([]);
    const [selectedOrganizations, setSelectedOrganizations] = useState<OrganizationSearchItem[]>([]);
    const [isSearchOpen, setIsSearchOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [searchError, setSearchError] = useState("");

    useEffect(() => {
        const trimmedKeyword = keyword.trim();

        if (!trimmedKeyword) {
            setOrganizations([]);
            setSearchError("");
            setIsLoading(false);
            return;
        }

        let isCurrentRequest = true;
        const timer = window.setTimeout(async () => {
            setIsLoading(true);
            const result = await organizationSearchAction(trimmedKeyword);

            if (!isCurrentRequest) return;

            if (result.success) {
                setOrganizations(result.data);
                setSearchError("");
            } else {
                setOrganizations([]);
                setSearchError(result.message);
            }
            setIsLoading(false);
        }, 300);

        return () => {
            isCurrentRequest = false;
            window.clearTimeout(timer);
        };
    }, [keyword]);

    const handleSelectOrganization = (organization: OrganizationSearchItem) => {
        if (selectedOrganizations.some(({ organizationId }) => organizationId === organization.organizationId)) {
            return;
        }

        const nextOrganizations = [...selectedOrganizations, organization];

        setSelectedOrganizations(nextOrganizations);
        setKeyword("");
        setOrganizations([]);
        setSearchError("");
        setIsSearchOpen(false);
        setValue("organizationIds", nextOrganizations.map(({ organizationId }) => organizationId), {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    const handleRemoveOrganization = (organizationId: number) => {
        const nextOrganizations = selectedOrganizations.filter(
            (organization) => organization.organizationId !== organizationId
        );

        setSelectedOrganizations(nextOrganizations);
        if (nextOrganizations.length === 0) {
            setIsSearchOpen(true);
        }
        setValue("organizationIds", nextOrganizations.map((organization) => organization.organizationId), {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    return (
        <div className="
            flex flex-col gap-4
            p-8
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border
            border-[#36415380]
            rounded-[16px]">
            <div className="flex flex-col gap-1">
                <p className="text-[20px] font-extrabold text-white"> 소속 헬스장 </p>
                <p className="text-[12px] font-normal text-[#6A7282]"> 신청할 헬스장을 검색하여 여러 곳을 선택할 수 있습니다. </p>
            </div>
        
        <div className="w-full">
            {selectedOrganizations.length > 0 && (
                <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-[13px] font-medium text-[#99A1AF]">선택한 헬스장 {selectedOrganizations.length}곳</p>
                    {!isSearchOpen && (
                        <button
                            type="button"
                            onClick={() => setIsSearchOpen(true)}
                            className="rounded-[8px] bg-[#364153] px-3 py-2 text-[13px] font-bold text-white hover:bg-[#4b5563]"
                        >
                            헬스장 추가
                        </button>
                    )}
                </div>
            )}
            {isSearchOpen && (
                <>
            <input
                value={keyword}
                onChange={(event) => {
                    setKeyword(event.target.value);
                }}
                placeholder="헬스장 상호명 또는 대표자명을 입력하세요"
                aria-label="소속 헬스장 검색"
                className="w-full bg-[#1E2939] px-4 py-3 border border-[#364153] flex-1 rounded-[10px] text-white placeholder:text-[#FFFFFF80]"
            />
            {isLoading && <p className="mt-2 text-sm text-[#99A1AF]">조직을 검색하고 있습니다.</p>}
            {searchError && <p className="mt-2 text-sm text-red-500">{searchError}</p>}
            {!isLoading && keyword.trim() && organizations.length === 0 && !searchError && (
                <p className="mt-2 text-sm text-[#99A1AF]">검색된 조직이 없습니다.</p>
            )}
            {organizations.length > 0 && (
                <div className="mt-2 overflow-hidden rounded-[10px] border border-[#364153] bg-[#1E2939]">
                    {organizations.map((organization) => (
                        <button
                            key={organization.organizationId}
                            type="button"
                            onClick={() => handleSelectOrganization(organization)}
                            disabled={selectedOrganizations.some(({ organizationId }) => organizationId === organization.organizationId)}
                            className="flex w-full flex-col gap-1 border-b border-[#364153] px-4 py-3 text-left last:border-b-0 hover:bg-[#364153] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <strong className="text-[16px] text-white">{organization.businessName}</strong>
                            <span className="text-[13px] text-[#99A1AF]">
                                {organization.roadAddress}{organization.detailAddress ? ` ${organization.detailAddress}` : ""}
                            </span>
                        </button>
                    ))}
                </div>
            )}
                </>
            )}
            {selectedOrganizations.length > 0 && (
                <div className="mt-3 flex flex-col gap-2">
                    {selectedOrganizations.map((organization) => (
                        <div key={organization.organizationId} className="flex items-center justify-between gap-3 rounded-[10px] border border-[#BFFF0B] bg-[#BFFF0B]/10 px-4 py-3">
                            <div>
                                <p className="text-[16px] font-extrabold text-[#BFFF0B]">{organization.businessName}</p>
                                <p className="mt-1 text-[13px] text-[#99A1AF]">
                                    {organization.roadAddress}{organization.detailAddress ? ` ${organization.detailAddress}` : ""}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveOrganization(organization.organizationId)}
                                className="rounded-[8px] bg-[#364153] px-3 py-2 text-[13px] font-bold text-white hover:bg-[#4b5563]"
                            >
                                선택 해제
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          </div>
    </div>
    );
}
