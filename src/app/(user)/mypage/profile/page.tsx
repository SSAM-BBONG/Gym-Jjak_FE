import MyProfileEditForm from "@/feature/mypage/components/MyProfileEditForm";
import { getMyProfileInformation } from "@/service/mypage.service";

export default async function MyProfileEditPage() {

    const response = await getMyProfileInformation();

    return (
        <div className="flex flex-col px-40 gap-2 pt-10">
            <MyProfileEditForm
                data={response.data}
            />
        </div>
    );
}