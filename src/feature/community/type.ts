// 커뮤니티 게시글 목록 항목
export interface Communities {
  postId: number;
  type: "FREE" | "NOTICE";
  title: string;
  content: string;
  author: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

// 게시글 작성 요청
export interface CommunityRequest {
  type: "FREE" | "NOTICE";
  title: string;
  content: string;
}

// 댓글
export interface CommunityComments {
  commentId: number;
  author: string;
  createdAt: string;
  content: string;
  mine: boolean;
}

// 댓글 목록 응답
export interface CommunityCommentsResponse {
  content: CommunityComments[];
  nextCursorId: number | null;
  hasNext: boolean;
}

// 커뮤니티 게시글 상세
export interface Community {
  postId: number;
  type: "FREE" | "NOTICE";
  title: string;
  content: string;
  author: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  mine: boolean;
  likedByMe: boolean;
  comments: CommunityCommentsResponse;
}

// 게시글 수정 요청
export interface CommunityUpdate {
  title: string;
  content: string;
}

// 댓글 작성 요청
export interface CommentRequest {
  content: string;
}