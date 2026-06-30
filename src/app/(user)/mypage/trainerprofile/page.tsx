import MypageTrainerProfileForm from "@/feature/mypage/components/MypageTrainerProfileForm";
import { getMyTrainerProfileInformation } from "@/service/mypage.service";
import { getTrainerApplication } from "@/service/ptzone.service";
import { redirect } from "next/navigation";

export default async function MypageTrainerProfilePage() {

    const response = await getMyTrainerProfileInformation();

    if (response.code === "AUTH_403_001") {
        redirect("/pt/trainer-apply");
    }

    if (!response.data) {
        throw new Error(response.message);
    }

    return (
        <div>
            <MypageTrainerProfileForm 
                data={response.data}
            />
        </div>
    );
}