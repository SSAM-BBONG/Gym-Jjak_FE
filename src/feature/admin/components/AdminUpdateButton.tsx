'use client'

import useModal from "@/components/hooks/useModal";
import { AdminUpdateImg } from "@/components/ui/image";
import AdminAddModal from "./modals/AdminAddModal";
import Image from "next/image";

export default function AdminUpdateButton({ mode, id, name }: { mode: '카테고리' | '태그', id: number, name: string }) {

    const modal = useModal();

    return (
        <>
            <button
                onClick={modal.openModal}
                className="flex items-center gap-2.5 text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-2 px-3">
                <div className="relative w-5 h-5">
                    <Image
                        src={AdminUpdateImg}
                        alt="수정 버튼"
                        fill
                        priority
                        sizes="w-4 h-4"
                    />
                </div> 수정하기
            </button>
            <AdminAddModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                mode={mode}
                system="update"
                id={id}
                name={name} />
        </>

    );
}