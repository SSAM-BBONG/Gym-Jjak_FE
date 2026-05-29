'use client'

export default function Onboarding1Form() {
    return (
        <div className="flex flex-wrap gap-4 mb-12">
            <label
                htmlFor="diet"
                className="w-82 h-29 rounded-lg border border-[#364153] bg-[#10182880] text-white text-xl font-bold text-center p-7.5
                has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                <input
                    hidden
                    type="radio"
                    name="purpose"
                    value='diet'
                    id="diet" />
                <p>🔥</p>
                다이어트
            </label>
            <label
                htmlFor="bulkup"
                className="w-82 h-29 border rounded-lg border-[#364153] bg-[#10182880] text-white text-xl font-bold text-center p-7.5
                has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                <input
                    hidden
                    type="radio"
                    name="purpose"
                    value='bulkup'
                    id="bulkup" />
                <p>💪</p>
                벌크업
            </label>
            <label
                htmlFor="improvement"
                className="w-82 h-29 border rounded-lg border-[#364153] bg-[#10182880] text-white text-xl font-bold text-center p-7.5
                has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                <input
                    hidden
                    type="radio"
                    name="purpose"
                    value='improvement'
                    id="improvement" />
                <p>⚡</p>
                체력증진
            </label>
            <label
                htmlFor="rehabilitation"
                className="w-82 h-29 border rounded-lg border-[#364153] bg-[#10182880] text-white text-xl font-bold text-center p-7.5
                has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                <input
                    hidden
                    type="radio"
                    name="purpose"
                    value='rehabilitation'
                    id="rehabilitation" />
                <p>🩹</p>
                재활
            </label>
        </div>
    );
}