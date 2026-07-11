import { CommentRequest, CommunityRequest, CommunityUpdate } from "@/feature/community/type";
import { fetchWithAuth, fetchWithAuthGet } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";


export const getCommunity = async (page: string, type?: 'FREE' | 'NOTICE',) => {
    const response = await fetchWithAuthGet(`/api/community/posts?page=${page}${type ? `&type=${type}` : ''}`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '게시글 조회에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}


export const getCommunityById = async (postId: number) => {
    const response = await fetchWithAuthGet(`/api/community/posts/${postId}`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '게시글 상세 조회에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}

export const createCommunity = async (payload: CommunityRequest) => {
    const response = await fetchWithAuth(`/api/community/posts`, {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '게시글 등록에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const updateCommunity = async (postId: number, payload: CommunityUpdate) => {
    const response = await fetchWithAuth(`/api/community/posts/${postId}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '내 게시글 수정에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const deleteCommunity = async (postId: number) => {
    const response = await fetchWithAuth(`/api/community/posts/${postId}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '게시글 삭제에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const createComment = async (postId: number, payload: CommentRequest) => {
    const response = await fetchWithAuth(`/api/community/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '댓글 등록에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const updateComment = async (commentId: number, payload: CommentRequest) => {
    const response = await fetchWithAuth(`/api/community/comments/$${commentId}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '댓글 수정에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const deleteComment = async (commentId: number) => {
    const response = await fetchWithAuth(`/api/community/comments/${commentId}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '댓글 삭제에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}


export const createLike = async (postId: number) => {
    const response = await fetchWithAuth(`/api/community/posts/${postId}/likes`, {
        method: "POST",
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '게시글 좋아요에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const deleteLike = async (postId: number) => {
    const response = await fetchWithAuth(`/api/community/posts/${postId}/likes`, {
        method: "DELETE"
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '게시글 좋아요 취소에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}