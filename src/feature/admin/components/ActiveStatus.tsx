'use client'

// import useModal from "@/components/hooks/useModal";
// import CheckViewModal from "./modals/CheckViewModal";

interface ActiveStatusProps {
    text: 'ACTIVE' | 'ETERNAL' | 'DAY_7' | 'WITHDRAWN'
}

const colorVariants = {
    'ETERNAL': 'text-red-500 bg-red-500/10 border-red-500/30',
    'ACTIVE': 'text-green-500 bg-green-500/10 border-green-500/30',
    'DAY_7': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
    'WITHDRAWN': 'text-gray-500 bg-gray-500/10 border-gray-500/30'
};

const textVariants = {
    'ETERNAL': '영구 정지',
    'ACTIVE': '활성',
    'DAY_7': '7일 정지',
    'WITHDRAWN': '탈퇴'
}

export default function ActiveStatus({ text }: ActiveStatusProps) {
    // const modal = useModal();
    return (
        <>
            <div
                // onClick={(text === '영구 정지' || text === '7일 정지') ? modal.openModal : () => { }}
                className={`py-1 px-3 font-medium text-xs rounded-lg border inline ${colorVariants[text]}`}>
                {textVariants[text]}
            </div>
            {/* <CheckViewModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                mode='report'
                title='모달입니다'
            /> */}
        </>
    );
}