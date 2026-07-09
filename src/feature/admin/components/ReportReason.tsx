'use client'

interface ActiveStatusProps {
    text: '욕설' | '광고' | '음란물' | '사기' | '도배' | '개인정보' | '기타'
}

const colorVariants = {
    '욕설': 'text-red-500 bg-red-500/10 border-red-500/30',
    '광고': 'text-pink-500 bg-pink-500/10 border-pink-500/30',
    '음란물': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
    '사기': 'text-violet-500 bg-violet-500/10 border-violet-500/30',
    '도배': 'text-orange-500 bg-orange-500/10 border-orange-500/30',
    '개인정보': 'text-rose-500 bg-rose-500/10 border-rose-500/30',
    '기타': 'text-gray-500 bg-gray-500/10 border-gray-500/30'
};

export default function ReportReason({ text }: ActiveStatusProps) {
    return (
        <>
            <div
                className={`py-1 px-2 lg:px-3 font-medium text-[10px] sm:text-xs rounded-lg border inline ${colorVariants[text]}`}>
                {text}

            </div>

        </>

    );
}
