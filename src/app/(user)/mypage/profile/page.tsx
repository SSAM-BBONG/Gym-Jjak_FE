export default function Page() {
    return (
        <div className="flex flex-col px-40 gap-2 pt-10">
            <p className="text-[36px] font-black text-white"> 프로필 수정</p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 회원 정보를 수정하세요</p>
            
            <div className="
            flex flex-col gap-8
            p-8 
            rounded-[16px]
            border
            border-[#36415380]
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            my-8">
                <p className="text-[20px] text-white font-extrabold"> 기본 정보</p>
                <div className="flex flex-col gap-2">
                    <label htmlFor="profile-name" className="text-[14px] text-white font-medium"> 이름 </label>
                    <input 
                        type="text"
                        id="profile-name"
                        placeholder="정지훈"
                        className="bg-[#1E2939] border border-[#364153] px-4 py-3 rounded-[10px] text-white outline-none"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[14px] text-white font-medium"> 닉네임 </label>
                    <div className="flex gap-2">
                    <input 
                        type="text"
                        id="profile-name"
                        placeholder="biyuns"
                        className="flex-1 bg-[#1E2939] border border-[#364153] px-4 py-3 rounded-[10px] text-white outline-none"/>
                    <button className="text-[16px] font-medium text-white px-4 py-3 bg-[#364153] rounded-[10px]"> 중복 확인 </button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="profile-number" className="text-[14px] text-white font-medium"> 전화번호 </label>
                    <input 
                        type="text"
                        id="profile-number"
                        placeholder="010-1111-2222"
                        className="bg-[#1E2939] border border-[#364153] px-4 py-3 rounded-[10px] text-white outline-none"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="profile-prefered-area" className="text-[14px] text-white font-medium"> 선호지역 </label>
                    <input 
                        type="text"
                        id="profile-prefered-area"
                        placeholder="경기도 구리시"
                        className="bg-[#1E2939] border border-[#364153] px-4 py-3 rounded-[10px] text-white outline-none"/>
                </div>
            </div>
           <button className="bg-[#BFFF0B] text-black text-[16px] font-extrabold py-3 mb-20 rounded-[10px]"> 수정하기 </button>
        </div>
    );
}