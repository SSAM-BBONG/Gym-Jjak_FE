interface OnlinePtStatusProps {
    text: '수강중' | '완료' | '취소'
}

const colorVariants = {
    '취소': 'text-red-500 bg-red-500/10 border-red-500/30',
    '수강중': 'border-[#BFFF0B4D] bg-[#BFFF0B33] text-[#BFFF0B]',
    '완료': 'text-gray-500 bg-gray-500/10 border-gray-500/30',
};

export default function OnlinePtStatus({ text }: OnlinePtStatusProps) {
    return (
        <p className={`px-4 py-1 text-[12px] font-extrabold border rounded-full ${colorVariants[text]}`}> {text} </p>
    );
}