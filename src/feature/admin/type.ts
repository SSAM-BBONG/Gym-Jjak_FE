interface Reposts {
    reportNumber: string,
    targetType: string,
    targetId: number,
    targetDisplayText: string,
    targetOwnerUsername: string,
    reportedAt: Date,
    reportCount: number,
    status: string,
    navigationType: string
}

interface ReportResponse {
    reports: Reposts[]
}