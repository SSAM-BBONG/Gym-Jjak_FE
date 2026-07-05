export default function CalendarCategories({ category, isDefault = false }: { category: Category, isDefault?: boolean }) {
    return (
        <label
            htmlFor={String(category.categoryId)}
            className="py-3 px-6.5 bg-[#1E2939] text-[#99A1AF] text-sm md:text-base font-bold rounded-md has-checked:bg-[#BFFF0B] has-checked:text-black">
            <input
                defaultChecked={isDefault}
                hidden
                type="radio"
                name="category"
                value={category.name}
                id={String(category.categoryId)} />
            {category.name}
        </label>
    );
}