import { AdminDocument, CloseButton } from "@/components/ui/image";
import AdminModalP from "./AdminModalP";
import AdminModalDiv from "./AdminModalDiv";
import { useEffect, useState } from "react";
import { OrganizationDetailAction } from "../../action";
import { approvalOrganization } from "@/service/report.service";

interface OrganizationDetailModalProps {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
    noneActiveModal: () => void;
    mode: string;
    applicationId: number;
}

const emptyOrganizationInstance = {
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
    businessLicenseFileUrl: ''
}

export default function OrganizationDetailModal({ isModal, closeModal, activeModal, noneActiveModal, mode, applicationId }: OrganizationDetailModalProps) {

    const [organizationInfo, setOrganizationInfo] = useState<Organization>(emptyOrganizationInstance);
    let first = true;
    useEffect(() => {

        const fetchOrganization = async () => {
            const res = await OrganizationDetailAction(applicationId);
            console.log(res);
            setOrganizationInfo(res?.data ?? emptyOrganizationInstance);
        }

        if (mode === 'organizationApprove') {

            if (!first) {
                return;
            }
            fetchOrganization();

            first = false;
        }


    }, [isModal])


    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                className="bg-gradient-to-br from-[#101828] to-[#000] w-3xl h-150 rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between
                overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-xl text-[#E8EAF0]">조직 상세 정보</h3>
                        <img src={CloseButton} onClick={closeModal} />
                    </div>
                    <section className="flex flex-col gap-6">
                        <article>
                            <AdminModalP title='아이디' />
                            <AdminModalDiv content={organizationInfo.requestedLoginId} />
                        </article>
                        <article>
                            <AdminModalP title='사업자 등록증' />
                            <div
                                className="flex items-center gap-4 border-[#364153] border w-full p-4 mt-2 bg-[#1E2939] rounded-md text-[#D1D5DC] text-base font-normal"
                            >
                                <img src={AdminDocument} />
                                <div>
                                    <p className="text-white">{organizationInfo.businessLicenseFileUrl}</p>
                                    <p className="text-sm">파일 크기:</p>
                                </div>
                                <button type='button' className="px-4.5 py-2 text-black bg-[#BFFF0B] rounded-md font-bold ml-auto">다운로드</button>

                            </div>
                        </article>
                        <article>
                            <AdminModalP title='사업자 등록 번호' />
                            <AdminModalDiv content={organizationInfo.businessRegistrationNumber} />
                        </article>
                        <article>
                            <AdminModalP title='사업장 주소' />
                            <AdminModalDiv content={organizationInfo.roadAddress} />
                        </article>
                        <article>
                            <AdminModalP title='상호' />
                            <AdminModalDiv content={organizationInfo.businessName} />
                        </article>
                        <div className="flex gap-4">
                            <article className="w-full">
                                <AdminModalP title='대표자 이름' />
                                <AdminModalDiv content={organizationInfo.representativeName} />
                            </article>
                            <article className="w-full">
                                <AdminModalP title='대표자 전화번호' />
                                <AdminModalDiv content={organizationInfo.representativePhone} />
                            </article>
                        </div>
                        <article>
                            <AdminModalP title='운동시설 전화번호' />
                            <AdminModalDiv content={organizationInfo.facilityPhone} />
                        </article>
                        <article>
                            <AdminModalP title='개업일자' />
                            <AdminModalDiv content={organizationInfo.openingDate} />
                        </article>
                        <article>
                            <AdminModalP title='웹사이트 링크' />
                            {organizationInfo.instagramUrl &&
                                <div
                                    className="flex flex-col justify-center border-[#364153] border w-full p-4 mt-2 bg-[#1E2939] rounded-md text-[#D1D5DC] text-base font-normal"
                                >
                                    <p className="text-sm">인스타그램</p>
                                    <a href={organizationInfo.instagramUrl} target="_blank" className="text-[#BFFF0B]">{organizationInfo.instagramUrl}</a>
                                </div>}
                            {organizationInfo.blogUrl &&
                                <div
                                    className="flex flex-col justify-center border-[#364153] border w-full p-4 mt-2 bg-[#1E2939] rounded-md text-[#D1D5DC] text-base font-normal"
                                >
                                    <p className="text-sm">블로그</p>
                                    <a href={organizationInfo.blogUrl} target="_blank" className="text-[#BFFF0B]">{organizationInfo.blogUrl}</a>
                                </div>}
                            {organizationInfo.websiteUrl &&
                                <div
                                    className="flex flex-col justify-center border-[#364153] border w-full p-4 mt-2 bg-[#1E2939] rounded-md text-[#D1D5DC] text-base font-normal"
                                >
                                    <p className="text-sm">웹사이트</p>
                                    <a href={organizationInfo.websiteUrl} target="_blank" className="text-[#BFFF0B]">{organizationInfo.websiteUrl}</a>
                                </div>}
                        </article>
                        <article>
                            <AdminModalP title='운동 시설 번호' />
                            <AdminModalDiv content={organizationInfo.requestedLoginId} />
                        </article>
                        {mode === 'organizationView' && (
                            <>
                                <article>
                                    <AdminModalP title='소속 트레이너 수' />
                                    <AdminModalDiv content="5명" />
                                </article>
                                <article>
                                    <AdminModalP title='승인일' />
                                    <AdminModalDiv content="2026-10-04" />
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
                            className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-base bg-[#1E2939]'
                        >
                            반려
                        </button>
                        <button
                            onClick={activeModal}
                            className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B]'
                        >
                            승인
                        </button>
                    </article>
                )}
            </form>
        </section>
    );
}