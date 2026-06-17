import { PtZoneFindCard, PtZonePtManage, PtZonePtRecord, PtZonePtRegist } from "@/components/ui/image";
import PtCard from "@/feature/pt/components/PtCard";
import { decodeJWT } from "@/lib/decode";

export default async function OnlinePtCardCt() {
    const userinf = await decodeJWT();

    return (
        <>
            {userinf?.role === "TRAINER" ?
                (
                    <div className="grid grid-cols-4 gap-6">
                        <PtCard
                            imgsrc={PtZoneFindCard}
                            title="온라인 PT 찾기"
                            content="온라인 PT 찾기"
                            movecoment="찾아보기"
                            move="/onlinept/find"
                        />
                        <PtCard
                            imgsrc={PtZonePtRecord}
                            title="온라인 PT 기록"
                            content="내 온라인 PT 기록 확인"
                            movecoment="확인하기"
                            move="/onlinept/records"
                        />
                        <PtCard
                            imgsrc={PtZonePtRegist}
                            title="온라인 PT 등록"
                            content="새로운 온라인 PT 등록 "
                            movecoment="등록하기"
                            move="/onlinept/regist"
                        />
                        <PtCard
                            imgsrc={PtZonePtManage}
                            title="온라인 PT 관리"
                            content="내 온라인 PT 관리"
                            movecoment="관리하기"
                            move="/onlinept/manage"
                        />
                    </div>
                )
                :
                (
                    <div className="grid grid-cols-3 gap-6">
                        <PtCard
                            imgsrc={PtZoneFindCard}
                            title="온라인 PT 찾기"
                            content="온라인 PT 찾기"
                            movecoment="찾아보기"
                            move="/onlinept/find"
                        />
                        <PtCard
                            imgsrc={PtZonePtRecord}
                            title="온라인 PT 기록"
                            content="내 온라인 PT 기록 확인"
                            movecoment="확인하기"
                            move="/onlinept/records"
                        />
                        <PtCard
                            imgsrc={PtZonePtRegist}
                            title="트레이너 등록"
                            content="트레이너 등록 "
                            movecoment="등록하기"
                            move="/onlinept/trainer"
                        />
                    </div>
                )
            }
        </>
    );
}