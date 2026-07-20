import Link from "next/link";

export default function MealCard() {
  return (
    <Link
      href={`/`}
      className="
        w-full 
        rounded-[8px]
        md:rounded-[16px]
        p-5
        md:p-6
        bg-[linear-gradient(135deg,_rgba(16,24,40,0.90)_0%,_rgba(30,41,57,0.90)_100%)]
        border-[1px] 
        border-[#36415380]
        flex
        flex-col
        gap-1.5
        md:gap-3
        mt-3
        md:mt-6
        hover:cursor-pointer">

      <p className="
        flex items-center justify-center
        self-baseline
        rounded-[2px]
        md:rounded-[4px]
        px-3 py-1 
        text-[#D1D5DC] bg-[#364153]
        md:text-[12px]
        text-[10px]
        font-extrabold"> 아침 </p>

      <p className="text-[14px] md:text-[18px] font-extrabold text-white"> 삶은 계란 200개와 사과</p>

      <p className="text-[12px] md:text-[14px] font-normal text-[#99A1AF]"> 2026-07-19 08:30 </p>
    </Link>
  );
}
