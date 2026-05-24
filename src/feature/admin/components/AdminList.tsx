import ActiveStatus from "./ActiveStatus";
import DetailButton from "./DetailButton";
import StatusSelector from "./StatusSelector";

export default function AdminList() {
    return (
        <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 border-1 rounded-md w-full ">

            <div className="flex text-[#99A1AF] font-bold text-sm border-0 h-13">
                <p>하이</p>
                <p>하이</p>
                <p>하이</p>
                <p>하이</p>
                <p>하이</p>
            </div>


            <div
                className="flex text-white font-normal text-sm border-t-1 border-[#364153] h-17.5 items-center"
            >
                <StatusSelector />
                <ActiveStatus color='gray'>탈퇴</ActiveStatus>
                <ActiveStatus color='green'>활성</ActiveStatus>
                <ActiveStatus color='red'>영구 정지</ActiveStatus>
                <ActiveStatus color='yellow'>7일 정지</ActiveStatus>
            </div>
            <div
                className="flex text-white font-normal text-sm border-t-1 border-[#364153] h-17.5 items-center"
            >
                <DetailButton />
                <p>하이</p>
                <p>하이</p>
                <p>하이</p>
                <p>하이</p>
            </div>
        </section>
    );
}