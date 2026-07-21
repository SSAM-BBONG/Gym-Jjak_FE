interface GoalItemProps {
    label: string;
    value: number;
}


export default function GoalItem({ label, value }: GoalItemProps) {
    return (
        <div className="rounded-lg border border-[#364153] bg-[#1E2939] px-2 md:px-3 py-4 text-center">
            <div className="text-xs text-[#99A1AF] md:text-sm">{label}</div>
            <div className="mt-1 text-sm font-bold text-white md:text-base">
                {value}
            </div>
        </div>
    );
}
