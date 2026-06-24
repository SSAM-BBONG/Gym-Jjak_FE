'use client'

import useModal from "@/components/hooks/useModal";

interface ActiveStatusProps {
    text: 'ACTIVE' | 'SUSPENDED' | 'DELETED';
}


const colorVariants = {
    'SUSPENDED': 'text-red-500 bg-red-500/10 border-red-500/30',
    'ACTIVE': 'text-green-500 bg-green-500/10 border-green-500/30',
    'DELETED': 'text-gray-500 bg-gray-500/10 border-gray-500/30',
};

const textVariants = {
    'SUSPENDED': '영구 정지',
    'ACTIVE': '활성',
    'DELETED': '탈퇴'
}

export default function OrganizationStatus({ text }: ActiveStatusProps) {
    const modal = useModal();
    return (
        <div
            className={`py-1 px-3 font-medium text-xs rounded-lg border inline ${colorVariants[text]}`}>
            {textVariants[text]}
        </div>
    );
}