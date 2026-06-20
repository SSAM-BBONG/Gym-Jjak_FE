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
    businessLicenseFileUrl: string
}

interface ReportResponse {
    reports: Reposts[]
}


interface category {
    categoryId: number;
    name: string;
    createdAt: string;
    usageCount: number;
}


interface tag {
    tagId: number;
    name: string;
    createdAt: string;
    usageCount: number;
}

interface Organizations {
    organizationApplicationId: number;
    requestedLoginId: string;
    businessName: string,
    representativeName: string,
    representativePhone: string
}


