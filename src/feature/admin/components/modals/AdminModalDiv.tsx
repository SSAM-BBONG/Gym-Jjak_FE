export default function AdminModalDiv({ content }: { content: string }) {
    return (
        <div
            className="flex items-center gap-3 md:gap-4 border-[#364153] border w-full p-3 md:p-4 mt-2 bg-[#1E2939] rounded-md text-[#D1D5DC] text-sm md:text-base font-normal"
        >
            <p>{content}</p>
        </div>
    );
}
