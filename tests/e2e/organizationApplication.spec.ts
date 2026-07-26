import { expect, test } from '@playwright/test';

const TEST_USERNAME = 'test@test.com';
const TEST_PASSWORD = 'test1234!';
const ORGANIZATION_LOGIN_ID = 'organization1@test.com';

const BUSINESS_LICENSE_PNG = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    'base64',
);

test.describe('로그인 후 조직 계정 신청', () => {
    test('조직 아이디 중복 확인 후 조직 계정을 신청한다', async ({ page }) => {
        const businessName = `Playwright 피트니스 ${Date.now()}`;
        const businessRegistrationNumber = String(Date.now()).slice(-10);

        await page.route(
            '**/mapjsapi/bundle/postcode/prod/postcode.v2.js',
            async (route) => {
                await route.fulfill({
                    contentType: 'application/javascript',
                    body: `
                        window.daum = {
                            Postcode: function (options) {
                                this.embed = function (element) {
                                    const button = document.createElement('button');
                                    button.type = 'button';
                                    button.textContent = '테스트 주소 선택';
                                    button.addEventListener('click', function () {
                                        options.oncomplete({
                                            roadAddress: '서울특별시 중구 세종대로 110',
                                            jibunAddress: '서울특별시 중구 태평로1가 31'
                                        });
                                    });
                                    element.appendChild(button);
                                };
                            }
                        };
                    `,
                });
            },
        );

        await page.route('**/v2/maps/sdk.js**', async (route) => {
            await route.fulfill({
                contentType: 'application/javascript',
                body: `
                    window.kakao = {
                        maps: {
                            load: function (callback) {
                                callback();
                            },
                            services: {
                                Geocoder: function () {
                                    this.addressSearch = function (address, callback) {
                                        callback(
                                            [{
                                                x: '126.9780',
                                                y: '37.5665',
                                                address_name: address
                                            }],
                                            'OK'
                                        );
                                    };
                                }
                            }
                        }
                    };
                `,
            });
        });

        // 1. 로그인한다.
        await page.goto('/auth/login');
        await page.getByLabel('이메일').fill(TEST_USERNAME);
        await page.getByLabel('비밀번호').fill(TEST_PASSWORD);
        await page.getByTestId('login-submit-button').click();
        await expect(page).not.toHaveURL(/\/auth\/login/);

        // 2. 마이페이지로 이동한다.
        await page
            .getByRole('link', { name: '마이페이지', exact: true })
            .first()
            .click();
        await expect(page).toHaveURL(/\/mypage$/);
        await expect(page.getByText('마이페이지', { exact: true })).toBeVisible();

        // 3. 새로운 조직 신청 페이지로 이동한다.
        const organizationApplicationLink = page.locator(
            'a[href="/mypage/organization/application"]',
        );
        await expect(organizationApplicationLink).toBeVisible();
        await expect(organizationApplicationLink).toHaveAttribute(
            'href',
            '/mypage/organization/application',
        );
        await page.goto('/mypage/organization/application');
        await expect(page).toHaveURL(
            /\/mypage\/organization\/application\/?$/,
        );
        await expect(
            page.getByText('조직 계정 신청', { exact: true }).first(),
        ).toBeVisible();

        // 4. 조직 아이디의 중복 여부를 확인한다.
        await page
            .getByPlaceholder('아이디를 입력해주세요')
            .fill(ORGANIZATION_LOGIN_ID);
        await page.getByRole('button', { name: '중복 확인' }).click();
        await expect(page.getByText('중복 확인을 완료헀습니다.')).toBeVisible();

        // 5. 사업자등록증과 필수 사업자 정보를 입력한다.
        await page.locator('#organ-application').setInputFiles({
            name: 'business-license.png',
            mimeType: 'image/png',
            buffer: BUSINESS_LICENSE_PNG,
        });
        await page.getByPlaceholder('0000000000 (10자리)').fill(
            businessRegistrationNumber,
        );
        await page
            .getByPlaceholder('ex) 엑티브펄스 PT센터')
            .fill(businessName);
        await page.getByPlaceholder('ex) 홍길동').fill('테스트 대표');
        await page.locator('input[name="openingDate"]').fill('2026-01-01');
        await page
            .getByRole('button', { name: '사업자 정보 검증하기' })
            .click();
        await expect(page.getByText('검증이 완료되었습니다.')).toBeVisible();

        // 6. 외부 주소 서비스를 대체한 테스트 주소를 선택한다.
        await page
            .getByPlaceholder('주소를 클릭해서 검색해주세요')
            .click();
        await page
            .getByRole('button', { name: '테스트 주소 선택' })
            .click();
        await expect(
            page.getByPlaceholder('주소를 클릭해서 검색해주세요'),
        ).toHaveValue('서울특별시 중구 세종대로 110');
        await page.getByPlaceholder('상세 주소 입력').fill('Playwright 테스트 지점');
        await page
            .getByPlaceholder('ex) 010-0000-0000')
            .fill('01012345678');

        // 7. 신청하고 신청 내역 페이지로 이동했는지 확인한다.
        await page.getByRole('button', { name: '신청하기' }).click();
        await expect(page).toHaveURL(/\/mypage\/organization$/);
        await expect(page.getByText(businessName, { exact: true })).toBeVisible();
    });
});
