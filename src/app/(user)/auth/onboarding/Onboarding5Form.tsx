export default function Onboarding5Form() {
    return (
        <div className="flex flex-col gap-3 mb-12 w-md m-auto">
            <label className="text-sm font-medium text-[#D1D5DC]">키 (cm)</label>
            <input
                placeholder="키를 작성해주세요"
                className="px-6 py-4 mb-6 border border-[#364153] bg-[#101828] rounded-[10px] text-white focus:outline-0 focus:border-[#BFFF0B]" />
            <label className="text-sm font-medium text-[#D1D5DC]">체중 (kg)</label>
            <input
                placeholder="체중을 작성해주세요"
                className="px-6 py-4 border border-[#364153] bg-[#101828] rounded-[10px] text-white focus:outline-0 focus:border-[#BFFF0B]" />
        </div>
    );
}