import Onboarding1 from "./Onboarding1";
import Onboarding2 from "./Onboarding2";
import Onboarding3 from "./Onboarding3";
import Onboarding4 from "./Onboarding4";
import Onboarding5 from "./Onboarding5";
import Onboarding6 from "./Onboarding6";
import OnbordingForms from "./OnbordingForms";

interface paramsProps {
    searchParams: Promise<{
        page: string;
    }>
}

export default async function Page({ searchParams }: paramsProps) {
    const { page } = await searchParams;

    const stepComponents: Record<number, React.ReactNode> = {
        1: <Onboarding1 />,
        2: <Onboarding2 />,
        3: <Onboarding3 />,
        4: <Onboarding4 />,
        5: <Onboarding5 />,
        6: <Onboarding6 />,
    };

    return (
        <section className="w-[calc(100%-2rem)] sm:w-xl md:w-2xl lg:w-2xl m-auto mt-6 sm:mt-8 lg:mt-10 pb-8 sm:pb-10 lg:pb-10">
            {stepComponents[Number(page)] || stepComponents[1]}
            <OnbordingForms page={page} />
        </section>
    )



}
