'use client'

interface ActiveStatusProps {
    text: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED'
}

const colorVariants = {
    'REJECTED': 'text-red-500 bg-red-500/10 border-red-500/30',
    'APPROVED': 'text-green-500 bg-green-500/10 border-green-500/30',
    'PENDING': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
    'CANCELED': 'text-gray-500 bg-gray-500/10 border-gray-500/30',
};

const textVariants = {
    'REJECTED': '반려',
    'APPROVED': '승인',
    'PENDING': '대기',
    'CANCELED': '취소',
}

export default function TrainerApplicationStatus({ text }: ActiveStatusProps) {
    return (
        <div
            className={`py-1 px-3 font-medium text-xs rounded-lg border inline ${colorVariants[text]}`}>
            {textVariants[text]}
        </div>
    );
}