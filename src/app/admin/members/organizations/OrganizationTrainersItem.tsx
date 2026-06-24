export default function OrganizationTrainerItem() {
    return (
        <div
            style={{ display: 'grid' }}
            className="!gird grid-cols-10 px-6 text-white font-normal text-sm border-t border-[#364153] h-17.5 items-center"
        >
            <p className="col-span-2">이름</p>
            <p className="col-span-3">이메일</p>
            <p className="col-span-3">등록일</p>
            <p className="col-span-2">상태</p>
            {/* {`${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`} */}
        </div>
    );
}