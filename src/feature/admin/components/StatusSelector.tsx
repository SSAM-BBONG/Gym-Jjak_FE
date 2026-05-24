export default function StatusSelector() {
    return (
        <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#BFFF0B] transition disabled:opacity-50 disabled:cursor-not-allowed">
            <option>활성</option>
            <option>7일 정지</option>
            <option>영구 정지</option>
        </select>
    );
}