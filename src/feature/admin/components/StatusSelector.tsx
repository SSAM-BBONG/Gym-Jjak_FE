export default function StatusSelector({ status }: { status: 'ETERNAL' | 'ACTIVE' | 'DAY_7' | 'WITHDRAWN' }) {
    return (
        <select defaultValue={status} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#BFFF0B] transition disabled:opacity-50 disabled:cursor-not-allowed">
            <option value={'ACTIVE'}>활성</option>
            <option value={'DAY_7'}>7일 정지</option>
            <option value={'ETERNAL'}>영구 정지</option>
        </select>
    );
}