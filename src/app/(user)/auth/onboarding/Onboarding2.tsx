<section className="w-2xl m-auto">
    <div className="w-full flex justify-between mb-3">
        <p className="text-[#99A1AF] font-normal text-sm">단계</p><p className="font-medium text-sm text-[#BFFF0B]">40%</p>
    </div>
    <div className="w-full h-2 bg-[#1E2939] rounded-xl mb-12"><div className="w-2/5 h-2 bg-[#BFFF0B] rounded-xl"></div></div>
    <article className="text-center">
        <h1 className="font-black text-5xl text-white mb-4.5">운동 경험을 알려주세요</h1>
        <p className="font-normal text-lg text-[#99A1AF] mb-12">얼마나 운동하셨나요?</p>
    </article>
    <article className="flex flex-col gap-3 mb-12">
        <label
            htmlFor="first"
            className="w-full h-26 rounded-lg p-6.25 border border-[#364153] bg-[#10182880] text-white
        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
            <input
                hidden
                type="radio"
                name="experience"
                value='first'
                id="first" />
            <p className="text-lg font-bold">처음 시작해요</p>
            <p className="text-sm font-medium">운동 경험이 거의 없어요</p>
        </label>
        <label
            htmlFor="beginning"
            className="w-full h-26 rounded-lg p-6.25 border border-[#364153] bg-[#10182880] text-white
        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
            <input
                hidden
                type="radio"
                name="experience"
                value='beginning'
                id="beginning" />
            <p className="text-lg font-bold">6개월 미만</p>
            <p className="text-sm font-medium">운동을 시작한지 얼마 안됐어요</p>
        </label>
        <label
            htmlFor="steady"
            className="w-full h-26 rounded-lg p-6.25 border border-[#364153] bg-[#10182880] text-white
        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
            <input
                hidden
                type="radio"
                name="experience"
                value='steady'
                id="steady" />
            <p className="text-lg font-bold">6개월 ~ 1년</p>
            <p className="text-sm font-medium">꾸준히 운동하고 있어요</p>
        </label>
        <label
            htmlFor="familiar"
            className="w-full h-26 rounded-lg p-6.25 border border-[#364153] bg-[#10182880] text-white
        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
            <input
                hidden
                type="radio"
                name="experience"
                value='familiar'
                id="familiar" />
            <p className="text-lg font-bold">1년 ~ 2년</p>
            <p className="text-sm font-medium">운동이 익숙해요</p>
        </label>
        <label
            htmlFor="old"
            className="w-full h-26 rounded-lg p-6.25 border border-[#364153] bg-[#10182880] text-white
        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
            <input
                hidden
                type="radio"
                name="experience"
                value='old'
                id="old" />
            <p className="text-lg font-bold">2년 이상</p>
            <p className="text-sm font-medium">운동이 생활의 일부에요</p>
        </label>



    </article>
    <article className="flex">
        <button className="py-3 px-8 rounded-[10px] text-base font-bold bg-[#10182880] text-[#D1D5DC]">이전</button>
        <button className="ml-auto bg-[#BFFF0B] py-3 px-8 rounded-[10px] text-base font-bold">다음</button>
    </article>
</section>