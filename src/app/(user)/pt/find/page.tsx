import { getOnboardingAction } from "@/feature/pt/actions";
import PtFindView from "@/feature/pt/components/PtFindView";
import { getPtLists } from "@/service/ptzone.service";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'pt',
    description: 'pt 트레이닝 목록페이지입니다.',

    openGraph: {
        title: 'pt | GYMJJAK',
        description: 'pt 트레이닝 목록페이지입니다.',
        url: '/pt/find'
    }
}

export default async function PtFindPage() {

    const onBoardingResponse = await getOnboardingAction();

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
