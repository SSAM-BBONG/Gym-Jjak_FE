import { axiosFetch } from "@/lib/api";

export const getCategories = async () => {
    const response = await axiosFetch('/api/categories');

    return response;
}


export const createCategories = async (payload: { name: string }) => {
    await axiosFetch.post(`/api/categories`, payload);
}

export const updateCategories = async (categoryId: number, payload: { name: string }) => {
    await axiosFetch.patch(`/api/categories/${categoryId}`, payload);
}

export const deleteCategories = async (categoryId: number) => {
    await axiosFetch.delete(`/api/categories/${categoryId}`);
}