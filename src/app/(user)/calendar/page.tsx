import CalendarCt from "./CalendarCt";
import CalendarQueryProvider from "./CalendarQueryProvider";

export default async function Page() {

    return (
        <CalendarQueryProvider>
            <div className="flex mx-30 my-10">
                <CalendarCt />
            </div>
        </CalendarQueryProvider>

    );
}