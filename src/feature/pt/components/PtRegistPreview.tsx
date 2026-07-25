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
        flex flex-col gap-3 sm:gap-4
        bg-[#101828]
        border border-[#1E2939] rounded-[16px]
        p-4 sm:p-5 lg:p-6
        ">
            <p className="text-base font-extrabold text-white sm:text-[17px] lg:text-[18px]"> 썸네일 이미지 </p>
            <div className="flex gap-3 items-center sm:gap-4">
                <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-[10px] border border-[#364153] bg-[#1E2939] sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-[200px] lg:w-[200px]">

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
                            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/65 text-white transition-colors hover:bg-black sm:h-8 sm:w-8"
                        >
                            <X size={18} aria-hidden />
                        </button>
                    )}
                </div>
                <label
                    className="cursor-pointer rounded-[10px] bg-[#BFFF0B] px-4 py-2 text-[14px] font-extrabold text-black sm:px-5 sm:py-3 sm:text-[15px] lg:px-7 lg:text-[16px]"
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
