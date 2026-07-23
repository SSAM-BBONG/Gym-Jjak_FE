import GymChart, { GymChartData } from "@/feature/organization/components/GymChart";

export type GymDashboardCard = {
    icon: string;
    iconWrapped?: boolean;
    highlighted?: boolean;
    title: string;
    value: string;
    description: string;
};

type GymDashboardProps = {
    cards: GymDashboardCard[];
    chartIcon: string;
    chartTitle: string;
    chartData: GymChartData;
    chartLabel: string;
    cardGridClassName?: string;
};

export default function GymDashboard({
    cards,
    chartIcon,
    chartTitle,
    chartData,
    chartLabel,
    cardGridClassName = "md:grid-cols-4",
}: GymDashboardProps) {
    return (
        <>
            <div className={`grid grid-cols-1 gap-4 ${cardGridClassName}`}>
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={
                            card.highlighted
                                ? "border border-[#BFFF0B4D] rounded-[16px] bg-[#BFFF0B0D] p-5"
                                : "border border-[#1E2939] rounded-[16px] bg-[#101828] p-5"
                        }
                    >
                        <div className="flex gap-2 items-center">
                            {card.iconWrapped ? (
                                <p className="bg-[#1E293999] w-10 h-10 flex items-center justify-center rounded-[14px] p-2">
                                    <img src={card.icon}/>
                                </p>
                            ) : (
                                <img src={card.icon}/>
                            )}
                            <p className="text-[16px] text-white font-bold"> {card.title} </p>
                        </div>
                        <p className={`text-[30px] font-black ${card.highlighted ? "text-[#BFFF0B]" : "text-white"}`}> {card.value}</p>
                        <p className="text-[12px] text-[#6A7282] font-normal"> {card.description}</p>
                    </div>
                ))}
            </div>

            <div className="p-6 border border-[#1E2939] rounded-[16px] bg-[#101828]">
                <div className="flex items-center gap-2 pb-4">
                    <img src={chartIcon}/>
                    <p className="text-[14px] text-white font-black"> {chartTitle}</p>
                </div>
                <GymChart data={chartData} label={chartLabel}/>
            </div>
        </>
    );
}
