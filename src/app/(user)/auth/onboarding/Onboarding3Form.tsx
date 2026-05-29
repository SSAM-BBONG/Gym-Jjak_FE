export default function Onboarding3Form() {
    return (
        <div className="flex gap-4 mb-12">
            <label
                htmlFor="rarely"
                className="font-black text-2xl text-white w-full p-8.5 border border-[#364153] rounded-lg text-center
                has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                <input
                    hidden
                    type="radio"
                    name="frequency"
                    value='rarely'
                    id="rarely" />
                1회 이하
            </label>
            <label
                htmlFor="sometimes"
                className="font-black text-2xl text-white w-full p-8.5 border border-[#364153] rounded-lg text-center
                has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                <input
                    hidden
                    type="radio"
                    name="frequency"
                    value='sometimes'
                    id="sometimes" />
                2~4회
            </label>
            <label
                htmlFor="often"
                className="font-black text-2xl text-white w-full p-8.5 border border-[#364153] rounded-lg text-center
                has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                <input
                    hidden
                    type="radio"
                    name="frequency"
                    value='often'
                    id="often" />
                5~7회
            </label>
        </div>
    );
}