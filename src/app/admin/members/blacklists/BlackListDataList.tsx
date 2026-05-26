import SearchBar from "@/feature/admin/components/SearchBar";
import BlackListDataItem from "./BlackListDataItem";

export default function BlackListDataList() {
    return (
        <div>
            <SearchBar></SearchBar>
            <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 border mt-6 rounded-md w-full ">
                <div style={{ display: 'grid' }} className="!gird grid-cols-13 px-6 text-[#99A1AF] font-bold text-sm border-0 h-13 items-center">
                    <p className="col-span-3">이메일</p>
                    <p className="col-span-2">이름</p>
                    <p className="col-span-2">닉네임</p>
                    <p className="col-span-2">상태</p>
                    <p className="col-span-2">누적신고</p>
                    <p className="col-span-2">관리</p>
                </div>
                <BlackListDataItem />
                <BlackListDataItem />
                <BlackListDataItem />
                <BlackListDataItem />
                <BlackListDataItem />
            </section>
        </div>
    );
}