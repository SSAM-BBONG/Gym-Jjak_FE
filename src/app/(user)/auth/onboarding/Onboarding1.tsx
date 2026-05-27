export default function Page() {
    return (
        <section className="w-2xl m-auto">
            <div className="w-full flex justify-between mb-3">
                <p className="text-[#99A1AF] font-normal text-sm">단계</p><p className="font-medium text-sm text-[#BFFF0B]">20%</p>
            </div>
            <div className="w-full h-2 bg-[#1E2939] rounded-xl mb-12"><div className="w-1/5 h-2 bg-[#BFFF0B] rounded-xl"></div></div>
            <article className="text-center">
                <h1 className="font-black text-5xl text-white mb-4.5">운동 목적을 알려주세요</h1>
                <p className="font-normal text-lg text-[#99A1AF] mb-12">어떤 목표를 가지고 계신가요?</p>
            </article>
            <article className="flex flex-wrap gap-4 mb-12">
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
            </article>
            <article className="flex">
                <button className="py-3 px-8 rounded-[10px] text-base font-bold bg-[#10182880] text-[#D1D5DC]">이전</button>
                <button className="ml-auto bg-[#BFFF0B] py-3 px-8 rounded-[10px] text-base font-bold">다음</button>
            </article>
        </section>
    );
}