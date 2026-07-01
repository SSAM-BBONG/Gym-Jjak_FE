// e2e/pt-find-reservation.spec.ts

import { test, expect } from '@playwright/test';

test.describe('로그인 -> PT 찾기 -> PT 예약 E2E 테스트', () => {
  test('로그인 후 PT를 찾아 예약한다', async ({ page }) => {
    // 1. 로그인 페이지 접속
    await page.goto('/auth/login');

    // 2. 로그인 정보 입력
    await page.locator('#username').fill('user0002@test.com');
    await page.locator('#password').fill('test1234');

    // 3. 로그인 버튼 클릭
    await page.getByTestId('login-submit-button').click();

    // 4. 로그인 후 메인 페이지 이동 확인
    await expect(page).toHaveURL(/\//);

    // 5. PT ZONE 페이지로 이동
    await page.getByText('PT ZONE').click();
    await expect(page).toHaveURL(/\/pt/);

    // 6. PT 찾기 카드 클릭
    await page.getByTestId('pt-find-link').click();
    await expect(page).toHaveURL(/\/pt\/find/);

    // 7. 지도에 표시된 첫 번째 조직 클릭
    // 지도 overlay 클릭 판정 완화를 위해 force : true 작성
    await page.getByTestId('organization-marker').first().click({ force: true });;

    // 8. 조직 클릭 후 나타난 PT 카드 클릭
    await expect(page.getByTestId('pt-card-link').first()).toBeVisible();
    await page.getByTestId('pt-card-link').first().click();

    // 9. PT 상세 페이지 이동 확인
    await expect(page).toHaveURL(/\/pt\/\d+/);

    // 10. 예약하기 버튼 클릭
    await page.getByTestId('reservation-open-button').click();

    // 11. 예약 모달이 열렸는지 확인
    await expect(page.getByTestId('reservation-modal')).toBeVisible();

    // 12. 예약 가능한 날짜 클릭
    // 달력 안에서 disabled가 아닌 날짜 버튼 중 하나를 선택
    await page.getByTestId('reservation-calendar').locator('button:not([disabled])').last().click();

    // 13. 예약 가능한 시간 선택
    await expect(page.getByTestId('reservation-time-slot').first()).toBeVisible();
    await page.getByTestId('reservation-time-slot').first().click();

    // 14. 예약하기 버튼 클릭
    await page.getByTestId('reservation-submit-button').click();

    // 15. 예약 후 PT 상세조회 페이지에 위치하는지 확인
    await expect(page).toHaveURL(/\/pt\/\d+/);

    // 16. PT 상세조회에 예약하기 보이는지 확인
    await expect(page.getByText('예약하기')).toBeVisible();
  });
});