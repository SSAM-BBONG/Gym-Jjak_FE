import * as mypageService from '@/service/mypage.service';
import { fetchWithAuth } from '@/lib/feth';
import { getErrorMessage } from '@/lib/stateError';

jest.mock('@/lib/feth', () => ({
    fetchWithAuth: jest.fn(),
}));

jest.mock('@/lib/stateError', () => ({
    getErrorMessage: jest.fn(),
}));

const mockedFetchWithAuth = jest.mocked(fetchWithAuth);
const mockedGetErrorMessage = jest.mocked(getErrorMessage);

const payload = {
    name: '테스트',
    nickname: '짐짝',
    password: 'password',
    measuredDate: '2026-07-27',
    height: 175,
    weight: 70,
    bodyFatPercentage: 15,
    skeletalMuscleMass: 35,
};

type ServiceCase = {
    name: string;
    execute: () => Promise<unknown>;
    url: string;
    options?: RequestInit;
    errorCheck?: boolean;
};

const serviceCases: ServiceCase[] = [
    { name: '마이페이지를 조회한다', execute: () => mypageService.getMyPageInformation(), url: '/api/users/mypage' },
    { name: '결제 내역을 조회한다', execute: () => mypageService.getMyPaymentHistory(), url: '/api/payments/me', options: { cache: 'no-store' } },
    { name: '조직 신청 목록을 조회한다', execute: () => mypageService.getOrganizationApplications(), url: '/api/organization-applications/me' },
    { name: '조직 신청 상세를 조회한다', execute: () => mypageService.getOrganizationApplication('11'), url: '/api/organization-applications/11' },
    { name: '조직 신청을 등록한다', execute: () => mypageService.createOrganizationApplication(payload as never), url: '/api/organization-applications', options: { method: 'POST', body: JSON.stringify(payload) } },
    { name: '조직 신청 아이디 중복을 확인한다', execute: () => mypageService.organizationApplicationDupliCationId('organization@test.com'), url: '/api/organization-applications/login-id/duplicate?requestedLoginId=organization%40test.com' },
    { name: '조직 신청을 취소한다', execute: () => mypageService.organizationApplicationCancel(11), url: '/api/organization-applications/11/cancel', options: { method: 'PATCH' } },
    { name: '조직 정보를 조회한다', execute: () => mypageService.getOrganizationManageInformation(), url: '/api/organizations/me' },
    { name: '조직 정보를 수정한다', execute: () => mypageService.editOrganizationManageInformation(payload as never), url: '/api/organizations/me', options: { method: 'PATCH', body: JSON.stringify(payload) } },
    { name: '조직 트레이너를 추가한다', execute: () => mypageService.addOrganizationManageTrainer(payload as never), url: '/api/organizations/me/trainers', options: { method: 'POST', body: JSON.stringify(payload) } },
    { name: '조직 트레이너를 검색한다', execute: () => mypageService.getOraganizationsearchTrainers({ keyword: ' 김짐짝 ', page: 2, size: 5 }), url: '/api/trainers/search?keyword=%EA%B9%80%EC%A7%90%EC%A7%9D&page=2&size=5' },
    { name: '기본 조건으로 조직 트레이너를 검색한다', execute: () => mypageService.getOraganizationsearchTrainers(), url: '/api/trainers/search?page=0&size=10' },
    { name: '조직 트레이너 목록을 조회한다', execute: () => mypageService.getOraganizationTrainerLists(), url: '/api/organizations/me/trainers' },
    { name: '조직 트레이너를 삭제한다', execute: () => mypageService.deleteOraganizationTrainer(7), url: '/api/organizations/me/trainers/7', options: { method: 'DELETE' } },
    { name: '비밀번호를 확인한다', execute: () => mypageService.checkPassword('password'), url: '/api/users/me/password-verification', options: { method: 'POST', body: JSON.stringify({ password: 'password' }) } },
    { name: '회원 탈퇴를 요청한다', execute: () => mypageService.deleteMyAccount(), url: '/api/users/me', options: { method: 'DELETE' } },
    { name: '비밀번호를 변경한다', execute: () => mypageService.updatePassword(payload as never), url: '/api/users/me/updatePassword', options: { method: 'PATCH', body: JSON.stringify(payload) } },
    { name: '내 프로필을 조회한다', execute: () => mypageService.getMyProfileInformation(), url: '/api/users/me' },
    { name: '내 프로필을 수정한다', execute: () => mypageService.editMyProfileInformation(payload as never), url: '/api/users/me', options: { method: 'PATCH', body: JSON.stringify(payload) } },
    { name: '닉네임 중복을 확인한다', execute: () => mypageService.checkMyProfileNicknameAvailability('짐짝'), url: '/api/users/me/availability/nickname', options: { method: 'POST', body: JSON.stringify({ nickname: '짐짝' }) } },
    { name: '내 트레이너 프로필을 조회한다', execute: () => mypageService.getMyTrainerProfileInformation(), url: '/api/trainers/me', errorCheck: false },
    { name: '내 트레이너 프로필을 수정한다', execute: () => mypageService.editMyTrainerProfileInformation(payload as never), url: '/api/trainers/me', options: { method: 'PATCH', body: JSON.stringify(payload) } },
    { name: '트레이너 프로필 상세를 조회한다', execute: () => mypageService.getTrainerProfileDetail(3), url: '/api/trainers/3' },
    { name: '인바디 목록을 조회한다', execute: () => mypageService.getInbody(), url: '/api/inbody' },
    { name: '다음 인바디를 조회한다', execute: () => mypageService.getInbodyAdd('2026-07-27', 4), url: '/api/inbody?measuredDate=2026-07-27&inbodyId=4' },
    { name: '인바디를 등록한다', execute: () => mypageService.postInbody(payload as never), url: '/api/inbody', options: { method: 'POST', body: JSON.stringify(payload) } },
    { name: '인바디를 수정한다', execute: () => mypageService.patchInbody(4, payload as never), url: '/api/inbody/4', options: { method: 'PATCH', body: JSON.stringify(payload) } },
    { name: '인바디를 삭제한다', execute: () => mypageService.deleteInbody(4), url: '/api/inbody/4', options: { method: 'DELETE' } },
    { name: '내 게시글을 조회한다', execute: () => mypageService.getMyCommu('2'), url: '/api/community/posts/me?page=2' },
];

describe('마이페이지 서비스', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedGetErrorMessage.mockResolvedValue('API 오류');
    });

    test.each(serviceCases)('$name - 성공 응답을 반환한다', async ({ execute, url, options }) => {
        // Given
        const responseData = { success: true };
        mockedFetchWithAuth.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(responseData),
        } as unknown as Response);

        // When
        const result = await execute();

        // Then
        expect(mockedFetchWithAuth).toHaveBeenCalledWith(url, ...(options ? [options] : []));
        expect(result).toEqual(responseData);
    });

    test.each(serviceCases.filter(({ errorCheck }) => errorCheck !== false))(
        '$name - 실패 응답을 서비스 오류로 변환한다',
        async ({ execute }) => {
            // Given
            const response = {
                ok: false,
                json: jest.fn(),
            } as unknown as Response;
            mockedFetchWithAuth.mockResolvedValue(response);

            // When & Then
            await expect(execute()).rejects.toThrow('API 오류');
            expect(mockedGetErrorMessage).toHaveBeenCalledWith(
                response,
                expect.any(String),
            );
        },
    );
});
