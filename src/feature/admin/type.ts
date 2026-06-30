interface Reposts {
    reportGroupId: number
    reportNumber: string,
    targetType: string,
    targetId: number,
    targetDisplayText: string,
    targetOwnerUsername: string,
    reportedAt: Date,
    effectiveReportCount: number,
    status: '대기중' | '반려' | '처리완료',
    navigationType: string
}


interface categorie {
    categoryId: number;
    name: string;
}


interface ReportsDetail {
    reportId: number;
    reporterUsername: string;
    reason: '욕설' | '광고' | '음란물' | '사기' | '도배' | '개인정보' | '기타';
    detail: string;
    reportedAt: string;
    status: '대기' | '반려' | '승인';
}



interface OrganizationApplications {
    organizationApplicationId: number,
    requestedLoginId: string,
    businessName: string,
    representativeName: string,
    representativePhone: string
}

interface OrganizationApplicationsDetail {
    organizationApplicationId: number,
    requestedLoginId: string,
    businessRegistrationNumber: string,
    businessName: string,
    representativeName: string,
    representativePhone: string,
    openingDate: string,
    roadAddress: string,
    jibunAddress: string,
    detailAddress: string,
    latitude: number,
    longitude: number,
    websiteUrl: string,
    instagramUrl: string,
    blogUrl: string,
    facilityPhone: string,
    businessLicenseFileUrl: string;
    businessLicenseOriginalName: string;
}

interface TrainerApplications {
    trainerApplicationId: number;
    userId: number;
    username: string;
    name: string;
    nickname: string;
    status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELED";
    createdAt: string;
    reviewedAt: null
}

interface ReportResponse {
    reports: Reposts[]
}


interface Category {
    categoryId: number;
    name: string;
    createdAt: string;
    usageCount: number;
}


interface Tag {
    tagId: number;
    name: string;
    createdAt: string;
    usageCount: number;
}

interface Organizations {
    organizationId: number;
    loginId: string;
    businessName: string;
    representativeName: string;
    representativePhone: string;
    trainerCount: number;
    status: 'ETERNAL' | 'ACTIVE' | 'DAY_7' | 'WITHDRAWN';
    createdAt: string;

}

interface OrganizationDetail {
    organizationId: number;
    requestedLoginId: string;
    businessLicenseFileUrl: string;
    businessLicenseOriginalName: string;
    businessRegistrationNumber: string;
    businessName: string;
    representativeName: string;
    representativePhone: string;
    openingDate: string;
    roadAddress: string;
    detailAddress: string;
    latitude: number;
    longitude: number;
    facilityPhone: string;
    instagramUrl: string;
    blogUrl: string;
    websiteUrl: string;
    status: 'ETERNAL' | 'ACTIVE' | 'DAY_7' | 'WITHDRAWN';
    approvedAt: string;
    trainerCount: number;
    trainers: OrganizationTrainers[]
}

interface OrganizationTrainers {
    trainerName: string;
    email: string;
    registeredAt: string;
}

interface Users {
    userId: number;
    username: string;
    name: string;
    nickname: string;
    status: 'ETERNAL' | 'ACTIVE' | 'DAY_7' | 'WITHDRAWN';
}

interface Blacklists {
    userId: number;
    username: string;
    name: string;
    nickname: string;
    status: 'ETERNAL' | 'ACTIVE' | 'DAY_7' | 'WITHDRAWN';
    blacklistType: "DAY_7" | 'ETERNAL';
    reason: string;
}

interface Trainers {
    trainerProfileId: number;
    userId: number;
    username: string;
    name: string;
    nickname: string;
    status: 'ETERNAL' | 'ACTIVE' | 'DAY_7' | 'WITHDRAWN';
}

interface UserStatusRequest {
    status: 'ETERNAL' | 'ACTIVE' | 'DAY_7';
    reason: string;
}


interface TrainerApplication {
    trainerApplicationId: number;
    userId: number;
    profileImageUrl: string;
    profileImageOriginalName: string;
    name: string;
    username: string;
    nickname: string;
    introduction: string;
    qualifications: string[];
    certificateUrl: string;
    certificateOriginalName: string;
    awardHistories: string[];
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';
}

interface Certifications {
    trainerCertificationId: number;
    name: string;
    certificationType: string;
}

interface Awards {
    trainerAwardId: number;
    name: string;
}

interface Trainer {
    trainerProfileId: number;
    profileImageUrl: string;
    trainerName: string;
    introduction: string;
    averageRating: number;
    reviewCount: number;
    status: 'ETERNAL' | 'ACTIVE' | 'DAY_7' | 'WITHDRAWN';
    certifications: Certifications[];
    awards: Awards[];
}