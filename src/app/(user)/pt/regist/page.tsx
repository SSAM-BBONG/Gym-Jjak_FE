import PtRegistForm from "@/feature/pt/components/PtRegistForm";

export default function Page() {
    return (
        <div className="flex flex-col gap-5 px-70 py-10">
            <p> PT 등록 </p>
            <p> 새로운 PT를 등록해주세요. </p>

            <PtRegistForm/>
        </div>
    );
}