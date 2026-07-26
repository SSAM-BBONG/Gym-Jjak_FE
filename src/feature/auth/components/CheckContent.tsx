import { CloseButton } from "@/components/ui/image";
import Image from "next/image";

export type AgreementKey = "terms" | "refund" | "privacy";

export const agreementContents: Record<AgreementKey, { title: string; content: string }> = {
    terms: {
        title: "이용약관 동의",
        content: `제1조 목적
본 약관은 회원이 GymJjak을 통해 제공되는 헬스장 이용권, PT 상품, AI 구독 상품 및 기타 서비스를 이용하는 데 필요한 조건과 회원 및 서비스 제공자의 권리·의무를 정하는 것을 목적으로 합니다.

제2조 계약의 성립
회원이 상품 정보, 이용 기간, 결제 금액과 이용 조건을 확인하고 결제를 완료하면 이용계약이 성립합니다. 실제 헬스장 또는 트레이너가 제공하는 상품은 해당 제공자의 운영 일정과 이용 조건에 따라 제공될 수 있습니다.

제3조 서비스 이용
회원은 구매한 상품의 이용 기간과 이용 조건을 준수해야 합니다. 계정과 이용 권한은 본인만 사용할 수 있으며 타인에게 양도하거나 대여할 수 없습니다. 회원 사정으로 이용하지 않은 기간은 별도 정책이 없는 한 자동 연장되지 않습니다.

제4조 회원의 의무
회원은 허위 정보를 등록하거나 타인의 계정을 이용해서는 안 되며, 서비스 운영을 방해하거나 관련 법령 및 이용수칙을 위반해서는 안 됩니다.

제5조 이용 제한
회원이 관련 법령, 본 약관 또는 헬스장 이용수칙을 위반하는 경우 서비스 이용이 제한될 수 있습니다.

제6조 분쟁 처리
본 약관에서 정하지 않은 사항은 관계 법령과 소비자분쟁해결기준에 따릅니다.`,
    },
    refund: {
        title: "환불 정책 동의",
        content: `제1조 환불 신청
환불 신청은 마이페이지 또는 고객센터를 통해 접수할 수 있습니다. 환불 시 주문 정보, 결제 수단 및 실제 이용 내역을 확인할 수 있습니다.

제2조 헬스장 및 PT 상품
헬스장 이용권과 PT 상품의 환불 가능 여부와 환불 금액은 상품을 제공하는 헬스장의 환불 정책, 실제 이용 횟수, 이용 기간, 제공된 혜택 및 위약금 등을 기준으로 산정됩니다.

각 헬스장의 구체적인 환불 조건은 상품 상세 정보 또는 해당 헬스장을 통해 확인해야 합니다. 헬스장 정책이 관계 법령이나 소비자분쟁해결기준보다 회원에게 불리한 경우에는 관계 법령과 소비자분쟁해결기준이 우선 적용됩니다.

제3조 구독 상품
디지털 또는 AI 구독 서비스의 제공이 시작된 후에는 사용 기간이나 이미 제공된 콘텐츠에 해당하는 금액이 공제될 수 있습니다. 서비스가 표시·광고 또는 계약 내용과 다르게 제공된 경우에는 관계 법령에 따라 환불을 요청할 수 있습니다.

제4조 환불 처리
환불은 원칙적으로 결제 시 사용한 수단으로 처리되며, 카드사·간편결제사 또는 금융기관의 사정에 따라 실제 환급까지 일정 기간이 소요될 수 있습니다.

제5조 법령의 우선 적용
본 정책에서 정하지 않은 사항은 전자상거래 등에서의 소비자보호에 관한 법률 및 소비자분쟁해결기준 등 관계 법령에 따릅니다.`,
    },
    privacy: {
        title: "개인정보 처리방침 동의",
        content: `1. 수집·이용 목적
회원 본인 확인, 회원가입 및 계정 관리, 상품 주문과 결제 처리, 구매·구독 상태 확인, 서비스 제공, 결제 취소·환불 및 민원 처리, 부정 이용 방지를 위해 개인정보를 이용합니다.

2. 수집 항목
이메일, 이름, 닉네임, 휴대전화번호, 회원 식별정보, 주문번호, 구매 상품, 결제 금액, 결제 일시, 이용 기간, 결제 상태 및 서비스 이용 내역을 수집할 수 있습니다.

3. 보유·이용 기간
회원 탈퇴 또는 수집·이용 목적 달성 시까지 보관합니다. 다만, 관계 법령에서 일정 기간 보관하도록 정한 정보는 해당 기간 동안 보관한 후 파기합니다. 환불, 민원 또는 분쟁이 진행 중인 경우에는 처리가 완료될 때까지 필요한 범위에서 보관할 수 있습니다.

4. 개인정보 제공 및 처리위탁
결제 처리, 본인 확인 및 서비스 제공을 위해 결제대행사, 헬스장 또는 트레이너에게 필요한 최소 범위의 개인정보가 제공되거나 처리 위탁될 수 있습니다.

5. 동의 거부 권리
회원은 개인정보 수집·이용 동의를 거부할 수 있습니다. 다만, 해당 정보는 회원가입과 서비스 제공에 필요한 필수 정보이므로 동의를 거부하면 회원가입 및 서비스 이용이 제한됩니다.`,
    },
};

interface CheckContentProps {
    isModal: boolean;
    closeModal: () => void;
    title: string;
    content: string;
}

export default function CheckContent({ isModal, closeModal, title, content }: CheckContentProps) {
    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal}
        >
            <div
                className="bg-gradient-to-br from-[#101828] to-[#000] w-5/6 max-h-130 sm:w-md rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
            >
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-base md:text-lg lg:text-xl text-[#E8EAF0]">{title}</h3>
                        <button type="button" onClick={closeModal} className="relative ml-auto w-5 h-5">
                            <Image
                                src={CloseButton}
                                alt="모달 닫기 버튼"
                                fill
                                sizes="w-4 h-4"
                            />
                        </button>
                    </div>
                    <div className="border-[#364153] border w-full h-60 md:h-80 p-3 md:p-6 my-4 bg-[#1E2939] rounded-2xl overflow-y-auto text-white text-sm md:text-base whitespace-pre-line [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {content}
                    </div>
                </article>
                <article className="flex gap-3">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-sm md:text-base bg-[#BFFF0B] transition-colors hover:bg-[#BFFF0B99] hover:text-black"
                    >
                        확인
                    </button>
                </article>
            </div>
        </section>
    );
}
