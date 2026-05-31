import { axiosFetch } from "@/lib/api";

export const getCategories = async () => {
    const response = await axiosFetch('/api/categories');

    return response;
}