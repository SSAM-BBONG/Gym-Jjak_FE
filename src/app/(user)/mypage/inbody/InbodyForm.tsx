export default function InbodyForm() {
    return (
        <form className="w-full">
            <label
                htmlFor="date"
                className="w-full text-[#D1D5DC] text-sm font-medium">
                측정일
            </label>
            <input
                name="date"
                id="date"
                type="date"
                placeholder="날짜를 입력해주세요"
                className="w-full py-2.5 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 mb-4 sm:mb-5 lg:mb-5 text-sm sm:text-base lg:text-base font-normal rounded-md bg-[#1E2939] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
            <div className="flex gap-4">
                <div>
                    <label
                        htmlFor="cm"
                        className="w-full text-[#D1D5DC] text-sm font-medium">
                        키 (cm) *
                    </label>
                    <input
                        name="cm"
                        id="cm"
                        type="number"
                        placeholder="키를 입력해주세요"
                        className="w-full py-2.5 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 mb-4 sm:mb-5 lg:mb-5 text-sm sm:text-base lg:text-base font-normal rounded-md bg-[#1E2939] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
                </div>
                <div>
                    <label
                        htmlFor="kg"
                        className="w-full text-[#D1D5DC] text-sm font-medium">
                        몸무게 (kg) *
                    </label>
                    <input
                        name="kg"
                        id="kg"
                        type="number"
                        placeholder="몸무게를 입력해주세요"
                        className="w-full py-2.5 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 mb-4 sm:mb-5 lg:mb-5 text-sm sm:text-base lg:text-base font-normal rounded-md bg-[#1E2939] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
                </div>
            </div>
            <div className="flex gap-4">
                <div>
                    <label
                        htmlFor="cm"
                        className="w-full text-[#D1D5DC] text-sm font-medium">
                        체지방률 (%)
                    </label>
                    <input
                        name="cm"
                        id="cm"
                        type="number"
                        placeholder="체지방률을 입력해주세요"
                        className="w-full py-2.5 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 mb-4 sm:mb-5 lg:mb-5 text-sm sm:text-base lg:text-base font-normal rounded-md bg-[#1E2939] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
                </div>
                <div>
                    <label
                        htmlFor="kg"
                        className="w-full text-[#D1D5DC] text-sm font-medium">
                        골격근량 (kg)
                    </label>
                    <input
                        name="kg"
                        id="kg"
                        type="number"
                        placeholder="골격근량을 입력해주세요"
                        className="w-full py-2.5 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 mb-4 sm:mb-5 lg:mb-5 text-sm sm:text-base lg:text-base font-normal rounded-md bg-[#1E2939] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
                </div>
            </div>
            <button
                data-testid="login-submit-button"
                className="w-full text-sm sm:text-base lg:text-base font-bold mb-5 sm:mb-6 lg:mb-6 text-black bg-[#BFFF0B] py-3 sm:py-3.5 lg:py-4 rounded-md">
                저장하기
            </button>
        </form>
    );
}