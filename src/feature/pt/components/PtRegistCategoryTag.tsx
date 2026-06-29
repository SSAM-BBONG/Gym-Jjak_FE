export default function PtRegistCategoryTag() {
    return (
        <div className="
            flex flex-col gap-6
            bg-[#101828]
            border border-[#1E2939] rounded-[16px]
            p-6
            ">
                <p className="text-[18px] font-extrabold text-white"> 카테고리 및 태그 </p>
                <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-medium text-white"> 카테고리 </p>
                    <div className="flex gap-3">
                        <label className="px-4 py-2 bg-[#BFFF0B] rounded-[10px] text-black text-[16px] font-extrabold"><input className="hidden" name="categoryId" type="radio" value="1" defaultChecked /> 다이어트 </label>
                        <label className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[16px] font-medium"><input className="hidden" name="categoryId" type="radio" value="2" /> 벌크업 </label>
                        <label className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[16px] font-medium"><input className="hidden" name="categoryId" type="radio" value="3" /> 체력증진 </label>
                        <label className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[16px] font-medium"><input className="hidden" name="categoryId" type="radio" value="4" /> 재활 </label>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-medium text-white"> 태그 (복수 선택) </p>
                    <div className="flex gap-1">
                        <label className="px-4 py-2 bg-[#BFFF0B] rounded-[10px] text-black text-[14px] font-extrabold"><input className="hidden" name="tagId" type="radio" value="1" defaultChecked /> 어깨 </label>
                        <label className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"><input className="hidden" name="tagId" type="radio" value="2" /> 가슴 </label>
                        <button className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"> 등 </button>
                        <button className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"> 하체 </button>
                        <button className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"> 허벅지 </button>
                        <button className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"> 팔 </button>
                        <button className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"> 복근 </button>
                        <button className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"> 전신 </button>
                        <button className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"> 유산소 </button>
                        <button className="px-4 py-2 bg-[#1E2939] rounded-[10px] text-[#99A1AF] text-[14px] font-medium"> 전체 </button>
                    </div>
                </div>
            </div>
    );
}