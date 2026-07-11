'use server'

import { createComment, createCommunity, createLike, deleteComment, deleteCommunity, deleteLike, updateComment, updateCommunity } from "@/service/community.service";
import { CommentRequest, CommunityRequest } from "./type";

interface ActionState {
    success: boolean;
    message: string;
}


export const communityAction = async (formData: FormData): Promise<ActionState> => {

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title.trim() || !content.trim()) {
        return {
            success: false,
            message: '값을 입력해주세요'
        }
    }

    const payload: CommunityRequest = { type: 'FREE', title, content }

    try {
        await createCommunity(payload);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage
        }
    }

    return {
        success: true,
        message: '게시글이 등록되었습니다'
    }
}

export const commentAction = async (postId: number, formData: FormData): Promise<ActionState> => {

    const content = formData.get('comment') as string;

    if (!content.trim()) {
        return {
            success: false,
            message: '값을 입력해주세요'
        }
    }

    const payload: CommentRequest = { content }

    try {
        await createComment(postId, payload);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage
        }
    }

    return {
        success: true,
        message: '성공'
    }
}

export const CommunityLikeAction = async (postId: number) => {
    try {
        await createLike(postId);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return errorMessage;
    }
}

export const CommunityUnlikeAction = async (postId: number) => {
    try {
        await deleteLike(postId);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return errorMessage;
    }
}


export const CommentDeleteAction = async (commentId: number) => {
    try {
        await deleteComment(commentId);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return errorMessage;
    }
}


export const CommentUpdateAction = async (commentId: number, formData: FormData) => {
    const content = formData.get('comment') as string;

    if (!content.trim()) {
        return '값을 입력해주세요'
    }

    const payload: CommentRequest = { content }
    try {
        await updateComment(commentId, payload);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return errorMessage
    }
}


export const CommunityDeleteAction = async (postId: number) => {
    try {
        await deleteCommunity(postId);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return errorMessage;
    }
}


export const communityUpdateAction = async (postId: number, formData: FormData): Promise<ActionState> => {

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title.trim() || !content.trim()) {
        return {
            success: false,
            message: '값을 입력해주세요'
        }
    }

    const payload: CommunityRequest = { type: 'FREE', title, content }

    try {
        await updateCommunity(postId, payload);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage
        }
    }

    return {
        success: true,
        message: '게시글이 수정되었습니다'
    }
}