'use client'

import { CommuCommentEdit } from "@/components/ui/image";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import useModal from "@/components/hooks/useModal";
import OneButtonModal from "@/components/ui/OneButtonModal";
import { useRouter } from "next/navigation";

export default function CommuUpdateComent({ commentId, setUpdateMode }: { commentId: number, setUpdateMode: Dispatch<SetStateAction<boolean>> }) {

    const clickUpdate = async () => {
        setUpdateMode(true);
    }

    return (
        <>
            <button onClick={clickUpdate} className="relative w-3 h-3 md:w-4 md:h-4">
                <Image
                    src={CommuCommentEdit}
                    alt="댓글 수정"
                    fill
                    sizes="w-8 h-8"
                    className="object-cover"
                />
            </button>
        </>
    );
}