"use client";

import { OrganApplicationUpload } from "@/components/ui/image";
import useModal from "@/components/hooks/useModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { PtRegistFormValue } from "@/lib/ptRegistSchema";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { toast } from "sonner";

interface PtRegistPreviewProps {
    setValue: UseFormSetValue<PtRegistFormValue>;
    error?: string;
    initialThumbnailUrl?: string | null;
    allowThumbnailDelete?: boolean;
}

export default function PtRegistPreview({
    setValue, error, initialThumbnailUrl = "", allowThumbnailDelete = false,
}: PtRegistPreviewProps) {
    const [thumbnailPreview, setThumbnailPreview] = useState(initialThumbnailUrl ?? "");
    const thumbnailInputRef = useRef<HTMLInputElement>(null);

    const deleteThumbnailModal = useModal(() => {
        setThumbnailPreview("");
        setValue("thumbnailFile", undefined as unknown as File, {
            shouldValidate: true,
            shouldDirty: true,
        });
        if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
        toast.success("썸네일 이미지 삭제가 완료되었습니다");
    });

    const handleThumbnailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setThumbnailPreview(URL.createObjectURL(file));

        setValue("thumbnailFile", file, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    useEffect(() => {
        return () => {
            if (typeof thumbnailPreview === "string" && thumbnailPreview.startsWith("blob:")) {
                URL.revokeObjectURL(thumbnailPreview);
            }
        };
    }, [thumbnailPreview]);

    return (
        <div className="
        flex flex-col gap-4
        bg-[#101828]
        border border-[#1E2939] rounded-[16px]
        p-6
        ">
            <p className="text-[18px] font-extrabold text-white"> 썸네일 이미지 </p>
            <div className="flex gap-4 items-center">
                <div className="relative flex items-center justify-center w-[200px] h-[200px] border border-[#364153] bg-[#1E2939] rounded-[10px] overflow-hidden">

                    <div className={thumbnailPreview ? "relative w-full h-full" : "relative w-12 h-12"}>
                        <Image
                            key={thumbnailPreview || "thumbnail-placeholder"}
                            src={thumbnailPreview || OrganApplicationUpload}
                            alt="PT 등록 썸네일 이미지 업로드"
                            fill
                            priority
                            unoptimized={Boolean(thumbnailPreview)}
                            sizes="w-24 h-24"
                            className={`${thumbnailPreview && "w-full h-full"} object-cover`}
                        />
                    </div>
                    {allowThumbnailDelete && thumbnailPreview && (
                        <button
                            type="button"
                            aria-label="썸네일 이미지 삭제"
                            onClick={deleteThumbnailModal.openModal}
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/65 text-white transition-colors hover:bg-black"
                        >
                            <X size={18} aria-hidden />
                        </button>
                    )}
                </div>
                <label
                    className="px-7 py-3 rounded-[10px] bg-[#BFFF0B] text-[16px] font-extrabold text-black cursor-pointer"
                    htmlFor="ptregist-img-upload"
                >
                    이미지 업로드
                </label>
                <input
                    type="file"
                    name="thumbnail"
                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    id="ptregist-img-upload"
                    ref={thumbnailInputRef}
                />
            </div>
            {error && <p className="text-[14px] text-red-400">{error}</p>}
            <TwoButtonModal
                isModal={deleteThumbnailModal.isModal}
                closeModal={deleteThumbnailModal.closeModal}
                activeModal={deleteThumbnailModal.activeModal}
                title="썸네일 이미지 삭제"
                content="썸네일 이미지를 삭제하시겠습니까?"
            />
        </div>
    );
}
