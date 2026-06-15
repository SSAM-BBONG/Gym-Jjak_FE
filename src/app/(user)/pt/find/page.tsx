// import Map from "@/components/ui/Map";
// import PtFindList from "@/feature/pt/components/PtFindList";
import PtFindView from "@/feature/pt/components/PtFindView";
import { getOnboarding, getPtLists } from "@/service/ptzone.service";

export default async function PtFindPage() {

    const onBoardingResponse = await getOnboarding();

    const ptListsResponse = await getPtLists();

    return (
        <div className="flex h-[calc(100vh-70px)] overflow-hidden">
            <PtFindView 
                listResponse={ptListsResponse}
                onBoardingResponse={onBoardingResponse}    
            />
        </div>
    );
}
