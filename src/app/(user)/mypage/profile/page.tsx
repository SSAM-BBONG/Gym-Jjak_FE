import MyProfileEditForm from "@/feature/mypage/components/MyProfileEditForm";
import { getMyPageInformation, getMyProfileInformation } from "@/service/mypage.service";

export default async function MyProfileEditPage() {

    const response = await getMyProfileInformation();
    const myPageResponse = await getMyPageInformation();

    return (
        <div className="flex flex-col px-4 sm:px-10 md:px-20 lg:px-40 gap-2 pt-6 sm:pt-8 lg:pt-10">
            <MyProfileEditForm
                data={response.data}
                socialUser={myPageResponse.data.socialUser}
            />
        </div>
    );
}