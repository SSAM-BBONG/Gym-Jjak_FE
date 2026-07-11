'use client'

import { CommuDetailLike, CommuDetailLikeFill } from "@/components/ui/image";
import { CommunityLikeAction, CommunityUnlikeAction } from "@/feature/community/action";
import Image from "next/image";
import { useState } from "react";

export default function CommuLikeButton({ like, likeCount, postId }: { like: boolean, likeCount: number, postId: number }) {

    const [likeState, setLikeState] = useState<boolean>(like);
    const [likeCountState, setLikeCountState] = useState<number>(likeCount);

    const clickLike = () => {
        if (likeState) {
            CommunityUnlikeAction(postId);
            setLikeState(false);
            setLikeCountState((prev) => prev - 1);
        } else {
            CommunityLikeAction(postId);
            setLikeState(true);
            setLikeCountState((prev) => prev + 1);
        }

    }

    return (
        <div className=" flex gap-2 items-center self-center px-3 md:px-4 py-2 bg-[#1E2939] rounded-[10px] font-extrabold text-[10px] md:text-[14px] text-white">

            <button onClick={clickLike} className="relative w-3 h-3 md:w-4 md:h-4">
                <Image
                    src={likeState ? CommuDetailLikeFill : CommuDetailLike}
                    alt="커뮤니티 상세조회 좋아요"
                    fill
                    sizes="w-8 h-8"
                    className="object-cover hover:cursor-pointer"
                />
            </button>
            <p> {likeCountState} </p>
        </div>
    );
}