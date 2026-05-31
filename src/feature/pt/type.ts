export interface PtDetailResponse {
  status: number;
  code: string;
  message: string;
  data: PtDetail;
}

export interface PtDetail {
  ptCourseId: number;
  categoryName: string;
  tagId: number;
  thumbnailUrl: string;
  title: string;
  description: string;
  price: number;
  totalSessionCount: number;
  status: "VISIBLE" | "HIDDEN" | "DELETED";

  organizationId: number;
  organizationName: string;
  organizationAddress: string;
  organizationPhone: string;
  websiteUrl: string;
  instagramUrl: string;

  trainerProfileId: number;
  trainerName: string;
  trainerSpec: string;
  trainerIntroduction: string;
  averageRating: number;
  reviewCount: number;

  certifications: PtTrainerCertification[];
  awards: PtTrainerAward[];
  curriculums: PtCourseCurriculum[];
  recentReviews: PtRecentReview[];
}

export interface PtTrainerCertification {
  certificationId?: number;
  name: string;
  issuer: string;
  acquiredDate: string;
}

export interface PtTrainerAward {
  awardId?: number;
  competitionName: string;
  awardName: string;
  awardDate: string;
}

export interface PtCourseCurriculum {
  curriculumId: number;
  sessionNo: number;
  title: string;
  content: string;
}

export interface PtRecentReview {
  reviewId: number;
  userNickname: string;
  ptCourseTitle: string;
  rating: number;
  content: string;
  createdAt: string;
}