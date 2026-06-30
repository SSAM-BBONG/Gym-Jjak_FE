interface OnlinePtPeedStatusProps {
    text: '미완료' | '완료' | '대기'
}

const colorVariants = {
    '미완료': 'text-red-500 bg-red-500/10 border-red-500/30',
    '완료': 'border-[#BFFF0B4D] bg-[#BFFF0B33] text-[#BFFF0B]',
    '대기': 'text-gray-500 bg-gray-500/10 border-gray-500/30',
};

export default function OnlinePtPeedbackStatus({ text }: OnlinePtPeedStatusProps) {
    return (
        <p className={`px-4 py-1 text-[12px] font-extrabold border rounded-full ${colorVariants[text]}`}> {text} </p>
    );
}