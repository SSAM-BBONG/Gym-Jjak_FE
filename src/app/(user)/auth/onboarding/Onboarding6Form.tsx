export default function Onboarding6Form() {
    return (
        <div className="flex flex-col gap-3 mb-12 w-md m-auto">
            <label className="text-sm font-medium text-[#D1D5DC]">선호 지역</label>
            <input
                placeholder="선호 지역을 작성해주세요"
                className="px-6 py-4 mb-6 border border-[#364153] bg-[#101828] rounded-[10px] text-white focus:outline-0 focus:border-[#BFFF0B]" />
        </div>
    );
}