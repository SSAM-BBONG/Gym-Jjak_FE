import { axiosFetch } from "@/lib/api";
import { fetchWithAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";
import { cache } from "react";

export const getCategories = cache(async () => {
    const response = await fetchWithAuth('/api/categories');

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '카테고리 조회에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
})


export const createCategories = async (payload: { name: string }) => {
    const response = await fetchWithAuth(`/api/categories`, {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '카테고리 등록에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const updateCategories = async (categoryId: number, payload: { name: string }) => {
    const response = await fetchWithAuth(`/api/categories/${categoryId}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '카테고리 수정에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const deleteCategories = async (categoryId: number) => {
    const response = await fetchWithAuth(`/api/categories/${categoryId}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '카테고리 삭제에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

//조직 목록 조회
export const getOrganization = async () => {
    const response = await fetchWithAuth('/api/organizations');

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '기관 조회에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}

//조직 상세 조회


//트레이너 신청 목록 조회

