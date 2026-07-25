import { CommuDetailEdit } from "@/components/ui/image";
import { Community } from "@/feature/community/type";
import Image from "next/image";
import Link from "next/link";
import CommuDeleteButton from "./CommuDeleteButton";
import CommuReportButton from "./CommuReportButton";
import { decodeJWT } from "@/lib/decode";

export default async function CommuButtonCt({ post }: { post: Community }) {
    const userInfo = await decodeJWT();

    if (userInfo?.role === 'ADMIN') {
        return (
            <>
                {
                    post.type === 'FREE' ? (
                        <CommuDeleteButton postId={post.postId} />
                    ) : (
                        <>
                            <Link
                                href={`/admin/systems/notify/${post.postId}/edit`}
                                className="px-2 py-2 bg-[#1E2939] rounded-[10px] transition-colors hover:bg-[#1E293999] hover:text-white">
                                <div className="relative w-3 h-3 md:w-4 md:h-4">
                                    <Image
                                        src={CommuDetailEdit}
                                        alt="게시글 수정"
                                        fill
                                        sizes="w-8 h-8"
                                        className="object-cover hover:cursor-pointer"
                                    />
                                </div>
                            </Link>

                            <CommuDeleteButton postId={post.postId} />

                        </>
                    )

                }
            </>
        )
    }
    return (
        <>
            {
                post.mine ? (
                    <>
                        <Link
                            href={`/community/${post.postId}/edit`}
                            className="px-2 py-2 bg-[#1E2939] rounded-[10px] transition-colors hover:bg-[#1E293999] hover:text-white">
                            <div className="relative w-3 h-3 md:w-4 md:h-4">
                                <Image
                                    src={CommuDetailEdit}
                                    alt="게시글 수정"
                                    fill
                                    sizes="w-8 h-8"
                                    className="object-cover hover:cursor-pointer"
                                />
                            </div>
                        </Link>

                        <CommuDeleteButton postId={post.postId} />

                    </>
                ) : (
                    <CommuReportButton title={post.author} targetId={post.postId} />
                )
            }

        </>
    );
}
