export default function CalendarCategories({ category, isDefault = false }: { category: Category, isDefault?: boolean }) {
    return (
        <label
            htmlFor={category.name}
            className="py-3 px-6.5 bg-[#1E2939] text-[#99A1AF] text-base font-bold rounded-md has-checked:bg-[#BFFF0B] has-checked:text-black">
            <input
                defaultChecked={isDefault}
                hidden
                type="radio"
                name="category"
                value={category.name}
                id={category.name} />
            {category.name}
        </label>
    );
}