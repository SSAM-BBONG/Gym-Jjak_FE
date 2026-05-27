export default function Page() {
    return (
        <div className="w-screen">
            <section className="w-2xl m-auto">
                <div className="w-full flex justify-between mb-3">
                    <p className="text-[#99A1AF] font-normal text-sm">단계</p><p className="font-medium text-sm text-[#BFFF0B]">100%</p>
                </div>
                <div className="w-full h-2 bg-[#1E2939] rounded-xl mb-12"><div className="w-5/5 h-2 bg-[#BFFF0B] rounded-xl"></div></div>
                <article className="text-center">
                    <h1 className="font-black text-5xl text-white mb-4.5">선호 지역을 입력해주세요</h1>
                    <p className="font-normal text-lg text-[#99A1AF] mb-12">맞춤형 운동 추천을 위해 필요해요</p>
                </article>
                <article className="flex flex-col gap-3 mb-12 w-md m-auto">
                    <label className="text-sm font-medium text-[#D1D5DC]">선호 지역</label>
                    <input
                        placeholder="선호 지역을 작성해주세요"
                        className="px-6 py-4 mb-6 border border-[#364153] bg-[#101828] rounded-[10px] text-white focus:outline-0 focus:border-[#BFFF0B]" />

                </article>
                <article className="flex">
                    <button className="py-3 px-8 rounded-[10px] text-base font-bold bg-[#10182880] text-[#D1D5DC]">이전</button>
                    <button className="ml-auto bg-[#BFFF0B] py-3 px-8 rounded-[10px] text-base font-bold">다음</button>
                </article>
            </section>
        </div>
    );
}