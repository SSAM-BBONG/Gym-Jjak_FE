export default function UrlCt({ text, url }: { text: '블로그' | '웹사이트' | '인스타그램', url: string }) {
    return (
        <div
            className="flex flex-col justify-center border-[#364153] border w-full p-4 mt-2 bg-[#1E2939] rounded-md text-[#D1D5DC] text-base font-normal"
        >
            <p className="text-sm">{text}</p>
            <a href={url} target="_blank" className="text-[#BFFF0B]">{url}</a>
        </div>
    );
}