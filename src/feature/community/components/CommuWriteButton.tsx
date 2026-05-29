'use client'

import { useState } from "react";
import CommuWriteModal from "./CommuWriteModal";
import useModal from "@/components/hooks/useModal";

export default function CommuWriteButton() {
    const modalfunc = ()=>{
        console.log('1')
    }

    const modal = useModal(modalfunc);

    return (
        <>
        <button className="
            bg-[#BFFF0B]
            rounded-[10px]
            text-[16px] text-black 
            flex items-center justify-center font-extrabold px-5 py-2
            hover:cursor-pointer"
            onClick={modal.openModal}>
                + 글쓰기 
            </button>
            <CommuWriteModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                activeModal={modal.activeModal}
                />
            </>
    );
}