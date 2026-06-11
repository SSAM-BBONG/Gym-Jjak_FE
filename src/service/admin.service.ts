import { axiosFetch } from "@/lib/api";
import { fetchWithAuth } from "@/lib/feth";
import { cache } from "react";

export const getCategories = cache(async () => {
    const response = await fetchWithAuth('/api/categories');

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || '카테고리 조회에 실패하였습니다.')
    }

    return response.json();
})


export const createCategories = async (payload: { name: string }) => {
    const response = await fetchWithAuth(`/api/categories`, {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || '카테고리 등록에 실패하였습니다.')
    }

    return response.json();
}

export const updateCategories = async (categoryId: number, payload: { name: string }) => {
    const response = await fetchWithAuth(`/api/categories/${categoryId}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || '카테고리 수정에 실패하였습니다.')
    }

    return response.json();
}

export const deleteCategories = async (categoryId: number) => {
    const response = await fetchWithAuth(`/api/categories/${categoryId}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || '카테고리 삭제에 실패하였습니다.')
    }

    return response.json();
}
