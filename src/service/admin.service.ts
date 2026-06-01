import { axiosFetch } from "@/lib/api";
import { cache } from "react";

export const getCategories = cache(async () => {
    const response = await axiosFetch('/api/categories');

    return response;
})


export const createCategories = async (payload: { name: string }) => {
    await axiosFetch.post(`/api/categories`, payload);
}

export const updateCategories = async (categoryId: number, payload: { name: string }) => {
    await axiosFetch.patch(`/api/categories/${categoryId}`, payload);
}

export const deleteCategories = async (categoryId: number) => {
    await axiosFetch.delete(`/api/categories/${categoryId}`);
}
