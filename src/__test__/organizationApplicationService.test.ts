import {
    createOrganizationApplication,
    organizationApplicationDupliCationId,
} from '@/service/mypage.service';
import { fetchWithAuth } from '@/lib/feth';
import type { OrganizationApplicationRequest } from '@/feature/mypage/type';

jest.mock('@/lib/feth', () => ({
    fetchWithAuth: jest.fn(),
}));

jest.mock('@/lib/stateError', () => ({
    getErrorMessage: jest.fn(),
}));

const mockedFetchWithAuth = jest.mocked(fetchWithAuth);

describe('조직 계정 신청 서비스', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('조직 아이디를 인코딩하여 중복 확인 API로 전달한다', async () => {
        // Given
        const responseData = {
            data: {
                available: true,
            },
        };
        mockedFetchWithAuth.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(responseData),
        } as unknown as Response);

        // When
        const result = await organizationApplicationDupliCationId(
            'organization1@test.com',
        );

        // Then
        expect(mockedFetchWithAuth).toHaveBeenCalledTimes(1);
        expect(mockedFetchWithAuth).toHaveBeenCalledWith(
            '/api/organization-applications/login-id/duplicate?requestedLoginId=organization1%40test.com',
        );
        expect(result).toEqual(responseData);
    });

    test('작성한 조직 신청 정보를 JSON 요청 본문으로 전달한다', async () => {
        // Given
        const payload: OrganizationApplicationRequest = {
            businessLicenseFile: {
                fileKey: 'business-license/test.png',
                originalName: 'business-license.png',
                contentType: 'image/png',
                fileSize: 68,
            },
            requestedLoginId: 'organization1@test.com',
            businessRegistrationNumber: '1234567890',
            businessName: 'Playwright 피트니스',
            representativeName: '테스트 대표',
            representativePhone: '010-1234-5678',
            openingDate: '2026-01-01',
            roadAddress: '서울특별시 중구 세종대로 110',
            detailAddress: '테스트 지점',
            latitude: 37.5665,
            longitude: 126.978,
        };
        const responseData = {
            status: 201,
            code: 'CREATED',
            message: '조직 계정 신청이 완료되었습니다.',
            data: {
                organizationApplicationId: 1,
            },
        };
        mockedFetchWithAuth.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(responseData),
        } as unknown as Response);

        // When
        const result = await createOrganizationApplication(payload);

        // Then
        expect(mockedFetchWithAuth).toHaveBeenCalledTimes(1);
        expect(mockedFetchWithAuth).toHaveBeenCalledWith(
            '/api/organization-applications',
            {
                method: 'POST',
                body: JSON.stringify(payload),
            },
        );
        expect(result).toEqual(responseData);
    });
});
