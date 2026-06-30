import { fetchWithAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";

// API 요청 파일 타입
export type FileType =
  | "PROFILE_IMAGE"
  | "PT_THUMBNAIL"
  | "CERTIFICATION"
  | "AWARD"
  | "BUSINESS_LICENSE"
  | "FEEDBACK_VIDEO";

// 요청시 타입선언
export interface PresignedUrlReqeust {
  fileType: FileType;
  contentType: string;
}

// 요청시 타입선언 배열
export interface CreatePresignedUrlsRequest {
  files: PresignedUrlReqeust[];
}

// 파일 응답 타입
export interface PresignedUrlFileResponse {
  presignedUrl: string;
  fileKey: string;
}

// 응답 타입
export interface CreatePresignedUrlsResponse {
  status: number;
  code: string;
  message: string;
  data: {
    files: PresignedUrlFileResponse[];
  };
}

// URL 업로드 타입
export interface UploadFileTarget {
  file: File;
  fileType: FileType;
}


// 파일 업로드 임시 URL 발급 API
export const createPresignedUrls = async (
  payload: CreatePresignedUrlsRequest
): Promise<CreatePresignedUrlsResponse> => {
  const response = await fetchWithAuth("/api/files/presigned-urls", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "파일 업로드 URL 발급에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

// 발급받은 URL로 파일 업로드 하는 API
export const uploadFilesPresignedUrl = async (
  payload: UploadFileTarget[]
) => {
  // 백엔드에 업로드할 파일들 fileType, contentType 저장
  const presignedResponse = await createPresignedUrls({
    files: payload.map(({ file, fileType }) => ({
      fileType,
      contentType: file.type,
    })),
  });

  // 파일별로 fileKey 목록 추출
  const presignedFiles = presignedResponse.data.files;
  
  // 업로드 할 파일 정보 저장을 위한 배열
  const uploadedFiles = [];

  // 파일 하나씩 업로드
  for (let i = 0; i < payload.length; i++) {
    const { file } = payload[i];
    const { presignedUrl, fileKey } = presignedFiles[i];

    // S3에 실제 업로드 API
    const uploadResponse = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    // 실패시 에러 던지기 
    if (!uploadResponse.ok) {
      throw new Error(`${file.name} 파일 업로드에 실패하였습니다.`);
    }

    // 성공후 저장할 파일 정보들
    uploadedFiles.push({
      fileKey,
      originalName: file.name,
      contentType: file.type,
      fileSize: file.size,
    });
  }

  // 업로드 후 다른 API에서 사용할 수 있게 반환
  return uploadedFiles;
};
