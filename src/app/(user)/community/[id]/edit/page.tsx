import CommuForm from "@/feature/community/components/CommuForm";
import { Community } from "@/feature/community/type";
import { getCommunityById } from "@/service/community.service";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const response = await getCommunityById(Number(id));
    if (!response?.data) {
        return (
            <div className="p-8">
                <div className="flex flex-col items-center justify-center text-center text-white m-auto">
                    <p className="mt-5">존재하지 않는 게시물입니다.</p>
                </div>
            </div>
        )
    }
    const post: Community = response.data;

    return (
        <>
            <CommuForm post={post} />
        </>
    );
}
