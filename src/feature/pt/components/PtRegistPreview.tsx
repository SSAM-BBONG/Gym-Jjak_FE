"use client";

import { OrganApplicationUpload } from "@/components/ui/image";
import { PtRegistFormValue } from "@/lib/ptRegistSchema";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

interface PtRegistPreviewProps {
    setValue: UseFormSetValue<PtRegistFormValue>;
    error?: string;
    initialThumbnailUrl?: string;
}

export default function PtRegistPreview({
    setValue, error, initialThumbnailUrl = ""
}: PtRegistPreviewProps) {
    const [thumbnailPreview, setThumbnailPreview] = useState(initialThumbnailUrl ?? "");

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
                <div className="flex items-center justify-center w-[200px] h-[200px] border border-[#364153] bg-[#1E2939] rounded-[10px] overflow-hidden">

                    <div className={thumbnailPreview ? "relative w-full h-full" : "relative w-12 h-12"}>
                        <Image
                            src={thumbnailPreview || OrganApplicationUpload}
                            alt="PT 등록 썸네일 이미지 업로드"
                            fill
                            priority
                            sizes="w-24 h-24"
                            className={`${thumbnailPreview && "w-full h-full"} object-cover`}
                        />
                    </div>
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
                />
            </div>
            {error && <p className="text-[14px] text-red-400">{error}</p>}
        </div>
    );
}
