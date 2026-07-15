export default function PartSelecter({ part = '' }: { part?: PartKo | '' }) {
    return (
        <select
            name="part"
            className={`border-[#364153] text-sm md:text-base border w-1/3 py-3 md:px-6 px-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white focus:outline-none ${part ? 'invisible' : ''}`}
            defaultValue={part ? part : '부위'}>
            <option disabled hidden>부위</option>
            <option value='가슴'>가슴</option>
            <option value='등'>등</option>
            <option value='어깨'>어깨</option>
            <option value='팔'>팔</option>
            <option value='복근'>복근</option>
            <option value='코어'>코어</option>
            <option value='하체'>하체</option>
            <option value='둔근'>둔근</option>
            <option value='전신'>전신</option>
        </select>
    );
}