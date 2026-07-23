import MealCt from "./MealCt";
import CalendarQueryProvider from "../calendar/CalendarQueryProvider";
import { getMyPlan } from "@/service/payment.service";
import { MyPlan } from "@/feature/payment/type";


interface paramsProps {
    searchParams: Promise<{
        page: string;
    }>
}
export default async function Page({ searchParams }: paramsProps) {
    const { page } = await searchParams;
    const response = await getMyPlan();
    const subscripton: MyPlan | null = response.data;


    return (
        <CalendarQueryProvider>
            <div className="pb-10 px-10 sm:px-20 md:px-30 lg:px-40 pt-5">
                <MealCt page={page} myStatus={subscripton?.status} />
            </div>
        </CalendarQueryProvider>
    );
}