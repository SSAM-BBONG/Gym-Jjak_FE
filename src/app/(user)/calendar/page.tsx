import CalendarCt from "./CalendarCt";
import CalendarQueryProvider from "./CalendarQueryProvider";

export default async function Page() {

    return (
        <CalendarQueryProvider>
            <div className="flex flex-col mx-10 md:mx-20 lg:mx-30 my-10 xs:flex-col md:flex-row">
                <CalendarCt />
            </div>
        </CalendarQueryProvider>

    );
}