import { GymDashboardCard } from "@/feature/organization/components/GymDashboard";

export default function AdminDashboardCard({ card }: { card: GymDashboardCard }) {
    return (
        <div
            className={
                card.highlighted
                    ? "border border-[#BFFF0B4D] rounded-[16px] bg-[#BFFF0B0D] p-5"
                    : "border border-[#1E2939] rounded-[16px] bg-[#101828] p-5"
            }
        >
            <div className="flex gap-2 items-center">
                {card.iconWrapped ? (
                    <p className="bg-[#1E293999] w-10 h-10 flex items-center justify-center rounded-[14px] p-2">
                        <img src={card.icon} />
                    </p>
                ) : (
                    <img src={card.icon} />
                )}
                <p className="text-[16px] text-white font-bold"> {card.title} </p>
            </div>
            <p className={`text-[30px] font-black ${card.highlighted ? "text-[#BFFF0B]" : "text-white"}`}> {card.value}</p>
            <p className="text-[12px] text-[#6A7282] font-normal"> {card.description}</p>
        </div>
    );
}