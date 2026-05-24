interface ActiveStatusProps {
    color: 'red' | 'green' | 'yellow' | 'gray',
    children: string
}

const colorVariants = {
    red: 'text-red-500 bg-red-500/10 border-red-500/30',
    green: 'text-green-500 bg-green-500/10 border-green-500/30',
    yellow: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
    gray: 'text-gray-500 bg-gray-500/10 border-gray-500/30',
};

export default function ActiveStatus({ color, children }: ActiveStatusProps) {
    return (
        <div className={`py-1 px-3 font-medium text-xs rounded-lg border ${colorVariants[color]}`}>
            {children}
        </div>
    );
}