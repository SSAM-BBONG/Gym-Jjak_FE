import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
    return (
        <div className="p-8">
            <div className="flex flex-col items-center justify-center text-center text-white m-auto">
                <Spinner className="size-8" />
                <p className="mt-5">정보를 가져오는 중입니다.</p>
                <p>잠시 기다려주세요.</p>
            </div>
        </div>
    );
}