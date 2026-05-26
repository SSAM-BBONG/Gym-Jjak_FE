interface ActiveStatusProps {
    text: '활성' | '영구 정지' | '7일 정지' | '탈퇴'
}

const colorVariants = {
    '영구 정지': 'text-red-500 bg-red-500/10 border-red-500/30',
    '활성': 'text-green-500 bg-green-500/10 border-green-500/30',
    '7일 정지': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
    '탈퇴': 'text-gray-500 bg-gray-500/10 border-gray-500/30',
};

export default function ActiveStatus({ text }: ActiveStatusProps) {
    return (
        <div className={`py-1 px-3 font-medium text-xs rounded-lg border ${colorVariants[text]}`}>
            {text}
        </div>
    );
}