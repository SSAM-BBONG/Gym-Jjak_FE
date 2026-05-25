export default function AdminModalDiv({ content }: { content: string }) {
    return (
        <div
            className="flex items-center gap-4 border-[#364153] border w-full p-4 mt-2 bg-[#1E2939] rounded-md text-[#D1D5DC] text-base font-normal"
        >
            <p>{content}</p>
        </div>
    );
}