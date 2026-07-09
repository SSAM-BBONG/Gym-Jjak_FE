'use client'

import useModal from "@/components/hooks/useModal";
import CheckViewModal from "./modals/CheckViewModal";

interface ActiveStatusProps {
    text: 'ACTIVE' | 'ETERNAL' | 'DAY_7' | 'WITHDRAWN';
    reason?: string;
    nickname?: string;
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

export default function ActiveStatus({ text, reason = '', nickname = '' }: ActiveStatusProps) {
    const modal = useModal();
    return (
        <>
            <div
                onClick={(text === 'ETERNAL' || text === 'DAY_7') ? modal.openModal : () => { }}
                className={`py-1 px-2 lg:px-3 font-medium text-[10px] sm:text-xs rounded-lg border inline ${colorVariants[text]}`}>
                {textVariants[text]}
            </div>
            <CheckViewModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                mode='report'
                nickname={nickname}
                content={reason}
            />
        </>
    );
}
