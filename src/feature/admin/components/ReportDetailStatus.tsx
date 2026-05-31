interface ReportStatusProps {
    text: '대기' | '반려' | '승인'
}

const colorVariants = {
    '승인': 'text-red-500 bg-red-500/10 border-red-500/30',
    '반려': 'text-gray-500 bg-gray-500/10 border-gray-500/30',
    '대기': 'text-green-500 bg-green-500/10 border-green-500/30',
};


export default function ReportDetailStatus({ text }: ReportStatusProps) {
    return (
        <div className={`py-1 px-3 font-medium text-xs rounded-lg border inline ${colorVariants[text]}`}>
            {text}
        </div>
    );
}