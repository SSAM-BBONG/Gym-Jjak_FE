export default function Page() {
    return (
        <section className="w-2xl m-auto">
            <div className="w-full flex justify-between mb-3">
                <p className="text-[#99A1AF] font-normal text-sm">단계</p><p className="font-medium text-sm text-[#BFFF0B]">80%</p>
            </div>
            <div className="w-full h-2 bg-[#1E2939] rounded-xl mb-12"><div className="w-4/5 h-2 bg-[#BFFF0B] rounded-xl "></div></div>
            <article className="text-center">
                <h1 className="font-black text-5xl text-white mb-4.5">선호하는 운동을 선택하세요</h1>
                <p className="font-normal text-lg text-[#99A1AF] mb-12">여러 개 선택 가능해요</p>
            </article>
            <article className="grid grid-cols-2 grid-rows-5 gap-3 mb-12">

                <label
                    htmlFor="웨이트 트레이닝"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="checkbox"
                        id="웨이트 트레이닝" />
                    웨이트 트레이닝
                </label>
                <label
                    htmlFor="크로스핏"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="checkbox"
                        id="크로스핏" />
                    크로스핏
                </label>
                <label
                    htmlFor="요가"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="checkbox"
                        id="요가" />
                    요가
                </label>
                <label
                    htmlFor="필라테스"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="checkbox"
                        id="필라테스" />
                    필라테스
                </label>
                <label
                    htmlFor="수영"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="checkbox"
                        id="수영" />
                    수영
                </label>
                <label
                    htmlFor="러닝"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="checkbox"
                        id="러닝" />
                    러닝
                </label>
                <label
                    htmlFor="사이클"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="checkbox"
                        id="사이클" />
                    사이클
                </label>
                <label
                    htmlFor="복싱"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="checkbox"
                        id="복싱" />
                    복싱
                </label>
                <label
                    htmlFor="댄스"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="checkbox"
                        id="댄스" />
                    댄스
                </label>
                <label
                    htmlFor="클라이밍"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="checkbox"
                        id="클라이밍" />
                    클라이밍
                </label>
            </article>
            <article className="flex">
                <button className="py-3 px-8 rounded-[10px] text-base font-bold bg-[#10182880] text-[#D1D5DC]">이전</button>
                <button className="ml-auto bg-[#BFFF0B] py-3 px-8 rounded-[10px] text-base font-bold">다음</button>
            </article>
        </section>

    );
}