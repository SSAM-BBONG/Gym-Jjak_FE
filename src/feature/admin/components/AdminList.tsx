import ActiveStatus from "./ActiveStatus";
import DetailButton from "./DetailButton";
import StatusSelector from "./StatusSelector";

export default function AdminList() {
    return (
        <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 border-1 rounded-md w-full ">

            <div className="flex text-[#99A1AF] font-bold text-sm border-0 h-13 items-center">
                <p className="grow px-4">하이</p>
                <p className="grow-3 px-3">하이</p>
                <p className="grow-2 px-1">하이</p>
                <p className="grow-2 px-1">하이</p>
                <p className="grow-4 px-1">하이</p>
            </div>


            <div
                className="flex text-white font-normal text-sm border-t-1 border-[#364153] h-17.5 items-center"
            >
                <div><StatusSelector /></div>
                <div><ActiveStatus text='탈퇴' /></div>
                <div><ActiveStatus text='활성' /></div>
                <div><ActiveStatus text='영구 정지' /></div>
                <div><ActiveStatus text='7일 정지' /></div>
            </div>
            <div
                className="flex text-white font-normal text-sm border-t-1 border-[#364153] h-17.5 items-center"
            >
                <div className="grow-3 px-4"><DetailButton /></div>
                <p className="grow-2">하이</p>
                <p className="grow-4">하이</p>
                <p className="grow-2">하이</p>
                <p className="grow">하이</p>
            </div>
        </section>
    );
}