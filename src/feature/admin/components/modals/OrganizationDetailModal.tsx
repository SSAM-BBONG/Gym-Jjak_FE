'use client'

import { AdminDocument, CloseButton } from "@/components/ui/image";
import AdminModalP from "./AdminModalP";
import AdminModalDiv from "./AdminModalDiv";
import { useEffect, useState } from "react";
import { OrganizationAdminDetailAction, OrganizationApplicationAdminDetailAction } from "../../action";
import OrganizationTrainerList from "@/app/admin/members/organizations/OrganizationTrainersList";
import UrlCt from "../UrlCt";
import Image from "next/image";

interface OrganizationDetailModalProps {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
    noneActiveModal: () => void;
    mode: string;
    organizationId: number;
}

const emptyOrganizationApplicationInstance: OrganizationApplicationsDetail = {
    organizationApplicationId: 0,
    requestedLoginId: '',
    businessRegistrationNumber: '',
    businessName: '',
    representativeName: '',
    representativePhone: '',
    openingDate: '',
    roadAddress: '',
    jibunAddress: '',
    detailAddress: '',
    latitude: 0,
    longitude: 0,
    websiteUrl: '',
    instagramUrl: '',
    blogUrl: '',
    facilityPhone: '',
    businessLicenseFileUrl: '',
    businessLicenseOriginalName: ''
}

const emptyOrganizationInstance: OrganizationDetail = {
    organizationId: 0,
    requestedLoginId: '',
    businessLicenseFileUrl: '',
    businessLicenseOriginalName: '',
    businessRegistrationNumber: '',
    businessName: '',
    representativeName: '',
    representativePhone: '',
    openingDate: '',
    roadAddress: '',
    detailAddress: '',
    latitude: 0,
    longitude: 0,
    facilityPhone: '',
    instagramUrl: '',
    blogUrl: '',
    websiteUrl: '',
    status: 'ACTIVE',
    approvedAt: '',
    trainerCount: 0,
    trainers: []
}


export default function OrganizationDetailModal({ isModal, closeModal, activeModal, noneActiveModal, mode, organizationId }: OrganizationDetailModalProps) {

    const [organizationInfo, setOrganizationInfo] = useState<OrganizationDetail>(emptyOrganizationInstance);
    const [organizationApplicationInfo, setOrganizationApplicationInfo] = useState<OrganizationApplicationsDetail>(emptyOrganizationApplicationInstance);

    useEffect(() => {
        if (!isModal) return;
        const fetchOrganizationApplication = async () => {
            const response = await OrganizationApplicationAdminDetailAction(organizationId);
            setOrganizationApplicationInfo(response);
        }

        const fetchOrganization = async () => {
            const response = await OrganizationAdminDetailAction(organizationId);
            setOrganizationInfo(response);
        }

        if (mode === 'organizationView') {
            fetchOrganization();
        } else {
            fetchOrganizationApplication();
        }
    }, [isModal, organizationId])


    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <div
                className="bg-gradient-to-br from-[#101828] to-[#000] w-5/6 max-h-120 sm:w-4/5 sm:max-h-5/6 md:w-3/5 md:max-h-5/6 lg:w-3xl lg:h-150 rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between
                overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-base md:text-lg lg:text-xl text-[#E8EAF0]">조직 상세 정보</h3>
                        <button onClick={closeModal} className="relative ml-auto w-5 h-5">
                            <Image
                                src={CloseButton}
                                alt="모달 닫기 버튼"
                                fill
                                sizes="w-4 h-4"
                            />
                        </button>
                    </div>
                    <section className="flex flex-col gap-6">
                        <article>
                            <AdminModalP title='아이디' />
                            <AdminModalDiv content={organizationApplicationInfo.requestedLoginId || organizationInfo.requestedLoginId} />
                        </article>
                        <article>
                            <AdminModalP title='사업자 등록증' />
                            <div
                                className="flex items-center gap-2 md:gap-4 border-[#364153] border w-full p-3 md:p-4 mt-2 bg-[#1E2939] rounded-md text-[#D1D5DC] text-sm md:text-base font-normal"
                            >
                                <div className="relative ml-auto w-4 h-4 lg:w-5 lg:h-5">
                                    <Image
                                        src={AdminDocument}
                                        alt="문서 버튼"
                                        fill
                                        sizes="w-4 h-4"
                                    />
                                </div>
                                <div>
                                    <p className="text-white">{organizationApplicationInfo.businessLicenseOriginalName || organizationInfo.businessLicenseOriginalName}</p>
                                </div>
                                <a target="_blank" rel="noopener noreferrer" href={organizationApplicationInfo.businessLicenseFileUrl || organizationInfo.businessLicenseFileUrl} className="px-3 md:px-4.5 py-1.5 md:py-2 text-black bg-[#BFFF0B] rounded-md font-bold text-[10px] md:text-sm lg:text-base ml-auto">자세히 보기</a>

                            </div>
                        </article>
                        <article>
                            <AdminModalP title='사업자 등록 번호' />
                            <AdminModalDiv content={organizationApplicationInfo.businessRegistrationNumber || organizationInfo.businessRegistrationNumber} />
                        </article>
                        <article>
                            <AdminModalP title='사업장 주소' />
                            <AdminModalDiv content={organizationApplicationInfo.roadAddress || organizationInfo.roadAddress} />
                        </article>
                        <article>
                            <AdminModalP title='상호' />
                            <AdminModalDiv content={organizationApplicationInfo.businessName || organizationInfo.businessName} />
                        </article>
                        <div className="flex gap-6 md:gap-4 flex-col md:flex-row">
                            <article className="w-full">
                                <AdminModalP title='대표자 이름' />
                                <AdminModalDiv content={organizationApplicationInfo.representativeName || organizationInfo.representativeName} />
                            </article>
                            <article className="w-full">
                                <AdminModalP title='대표자 전화번호' />
                                <AdminModalDiv content={organizationApplicationInfo.representativePhone || organizationInfo.representativePhone} />
                            </article>
                        </div>
                        <article>
                            <AdminModalP title='운동시설 전화번호' />
                            <AdminModalDiv content={organizationApplicationInfo.facilityPhone || organizationInfo.facilityPhone} />
                        </article>
                        <article>
                            <AdminModalP title='개업일자' />
                            <AdminModalDiv content={organizationApplicationInfo.openingDate || organizationInfo.openingDate} />
                        </article>
                        <article>
                            <AdminModalP title='웹사이트 링크' />
                            {mode === 'organizationView' && (
                                <>
                                    {(organizationInfo.instagramUrl &&
                                        <UrlCt text='인스타그램' url={organizationInfo.instagramUrl} />)}
                                    {(organizationInfo.blogUrl &&
                                        <UrlCt text='블로그' url={organizationInfo.blogUrl} />)}
                                    {(organizationInfo.websiteUrl &&
                                        <UrlCt text='웹사이트' url={organizationInfo.websiteUrl} />)}
                                </>
                            )}
                            {mode !== 'organizationView' && (
                                <>
                                    {(organizationApplicationInfo.instagramUrl &&
                                        <UrlCt text='인스타그램' url={organizationApplicationInfo.instagramUrl} />)}
                                    {(organizationApplicationInfo.blogUrl &&
                                        <UrlCt text='블로그' url={organizationApplicationInfo.blogUrl} />)}
                                    {(organizationApplicationInfo.websiteUrl &&
                                        <UrlCt text='웹사이트' url={organizationApplicationInfo.websiteUrl} />)}
                                </>
                            )}

                        </article>
                        {mode === 'organizationView' && (
                            <>
                                <article>
                                    <AdminModalP title='소속 트레이너 수' />
                                    <AdminModalDiv content={`${organizationInfo.trainerCount}명`} />
                                </article>
                                <article>
                                    <AdminModalP title='승인일' />
                                    <AdminModalDiv content={organizationInfo.approvedAt} />
                                </article>
                                <article>
                                    <AdminModalP title='소속 트레이너' />
                                    <OrganizationTrainerList trainers={organizationInfo.trainers} />
                                </article>
                            </>
                        )}
                    </section>
                </article>
                {mode !== 'organizationView' && (
                    <article className='flex gap-3 mt-10'>
                        <button
                            type="button"
                            onClick={noneActiveModal}
                            className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-sm md:text-base bg-[#1E2939]'
                        >
                            반려
                        </button>
                        <button
                            onClick={activeModal}
                            className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-sm md:text-base bg-[#BFFF0B]'
                        >
                            승인
                        </button>
                    </article>
                )}
            </div>
        </section>
    );
}
