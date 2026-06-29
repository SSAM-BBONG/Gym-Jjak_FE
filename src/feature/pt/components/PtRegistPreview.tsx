import { OrganApplicationUpload } from "@/components/ui/image";

export default function PtRegistPreview() {
    return (
        <div className="
        flex flex-col gap-4
        bg-[#101828]
        border border-[#1E2939] rounded-[16px]
        p-6
        ">
            <p className="text-[18px] font-extrabold text-white"> 썸네일 이미지 </p>
            <div className="flex gap-4 items-center">
                <div className="px-13 py-9 border border-[#364153] bg-[#1E2939] rounded-[10px]"> 
                    <img src={OrganApplicationUpload} alt="PT 등록 썸네일 이미지 업로드"/> 
                </div>
                <label
                    className="px-7 py-3 rounded-[10px] bg-[#BFFF0B] text-[16px] font-extrabold text-black cursor-pointer" 
                    htmlFor="ptregist-img-upload"> 이미지 업로드 </label>
                <input type="file" name="thumbnail" className="hidden" id="ptregist-img-upload"/>
            </div>
        </div>
    );
}