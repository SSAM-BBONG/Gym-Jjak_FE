import { expect, test } from '@playwright/test';

const TEST_USERNAME = 'test@test.com';
const TEST_PASSWORD = 'test1234!';

test.describe('로그인 후 식단 등록 및 조회', () => {
    test('식단을 등록하면 선택한 날짜의 목록에서 조회된다', async ({ page }) => {
        const now = new Date();
        const date = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, '0'),
            String(now.getDate()).padStart(2, '0'),
        ].join('-');
        const time = [
            String(now.getHours()).padStart(2, '0'),
            String(now.getMinutes()).padStart(2, '0'),
        ].join(':');
        const menu = `Playwright 식단 ${Date.now()}`;

        // 1. 로그인한다.
        await page.goto('/auth/login');
        await page.getByLabel('이메일').fill(TEST_USERNAME);
        await page.getByLabel('비밀번호').fill(TEST_PASSWORD);
        await page.getByTestId('login-submit-button').click();
        await expect(page).not.toHaveURL(/\/auth\/login/);

        // 2. 식단 페이지로 이동한다.
        await page.getByRole('link', { name: '식단', exact: true }).first().click();
        await expect(page).toHaveURL(/\/meal/);
        await expect(
            page.getByRole('heading', { name: '식단 관리' }),
        ).toBeVisible();

        // 3. 식단 등록 모달을 열고 식단 정보를 입력한다.
        await page.getByRole('button', { name: /추가/ }).click();
        await expect(
            page.getByRole('heading', { name: '식단 추가' }),
        ).toBeVisible();

        const mealForm = page.locator('form').filter({
            has: page.getByRole('heading', { name: '식단 추가' }),
        });

        await mealForm.locator('select[name="mealType"]').selectOption('점심');
        await mealForm.locator('input[name="date"]').fill(date);
        await mealForm.locator('input[name="time"]').fill(time);

        // 이미지 분류 모델 준비가 끝나면 메뉴 입력란이 렌더링된다.
        await mealForm.getByPlaceholder('메뉴를 입력해주세요').fill(menu);
        await mealForm.locator('input[name="kcal"]').fill('430');

        // 4. 저장하고 모달이 닫히는지 확인한다.
        await mealForm.getByRole('button', { name: '저장하기' }).click();
        await expect(
            page.getByRole('heading', { name: '식단 추가' }),
        ).toBeHidden();

        // 5. 등록한 식단이 현재 날짜 목록에 표시되는지 확인한다.
        await expect(page.getByText(menu, { exact: true })).toBeVisible();
    });
});
