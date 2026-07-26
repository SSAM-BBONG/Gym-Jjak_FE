# 실제 Playwright E2E 예제 기반 가이드

이 문서는 `C:\dev\workspaces\10_testing\03_e2e-testing`에서 사용한 Playwright E2E 작성 방식을 이 프로젝트에 적용하기 위한 참고 문서다. 기존 상세 규격은 `e2e.md`를 우선한다.

## 참고 폴더에서 사용한 방식

- 테스트는 `tests/*.spec.ts`에 두고 `test`, `expect`를 `@playwright/test`에서 가져온다.
- 단일 페이지 확인, 인증, 목록 검색, 전체 구매 과정처럼 사용자 흐름의 크기에 따라 파일을 나눈다.
- `page.goto()`로 시작하고, 각 주요 단계에서 화면·URL·요소 개수를 검증한다.
- `getByRole`, `getByLabel`, `getByPlaceholder` 같은 사용자 관점 locator를 우선 사용한다.
- 로딩 문구는 `toBeVisible()` 후 `toBeHidden()`으로 전환까지 검증한다.
- 전체 플로우는 단계별 번호 주석과 URL 검증을 둬 실패 지점을 빠르게 찾는다.

## 현재 Playwright 설정에서 가져올 점

참고 폴더와 현재 프로젝트의 설정은 다음 운영 원칙을 공유한다.

- `testDir: './tests'`
- 파일 병렬 실행: `fullyParallel: true`
- CI에서만 `retries: 2`, `workers: 1`
- 재시도 시 trace 수집: `trace: 'on-first-retry'`
- 기준 주소: `baseURL: 'http://localhost:3000'`

현재 프로젝트는 `webServer` 설정이 주석 처리되어 있다. 따라서 `npm run test:e2e`만으로 개발 서버가 자동 실행된다고 가정하지 말고, 실행 전 `http://localhost:3000`의 앱 기동 여부를 확인한다.

## 기본 시나리오 구조

```ts
import { expect, test } from '@playwright/test';

test.describe('PT 강습 검색 흐름', () => {
  test('검색어를 입력하면 일치하는 강습 목록을 표시한다', async ({ page }) => {
    // 1. PT 검색 페이지에 접속한다.
    await page.goto('/pt/find');
    await expect(page.getByRole('heading', { name: 'PT 찾기' })).toBeVisible();

    // 2. 검색어를 입력하고 검색한다.
    await page.getByPlaceholder('검색어를 입력해주세요').fill('헬스');
    await page.getByRole('button', { name: '검색' }).click();

    // 3. 비동기 결과가 렌더링된 뒤 목록을 검증한다.
    await expect(page.getByTestId('pt-course-list')).toBeVisible();
    await expect(page.getByTestId('pt-course-card').first()).toBeVisible();
  });
});
```

예시의 경로·문구·`data-testid`는 실제 구현에 맞게 확인 후 사용한다. 존재하지 않는 식별자를 테스트 편의를 위해 임의로 전제하지 않는다.

## locator 선택 순서

`10_testing` 예제의 접근성 locator 방식을 우선 적용하고, 이 프로젝트의 기존 E2E 규격과 결합한다.

1. `getByRole` — 버튼, 링크, 제목, 체크박스
2. `getByLabel` / `getByPlaceholder` — 로그인·검색·주문 입력 필드
3. `getByText` — 상태 문구, 토스트, 오류 안내
4. `getByTestId` — 지도 오버레이, 반복 카드처럼 위 방식으로 안정적으로 구분하기 어려운 요소

지도 오버레이처럼 pointer event가 가로막는 특수 요소만 이유를 주석으로 남기고 `.click({ force: true })`를 쓴다.

## 검증 단위

### 단일 페이지

홈 화면, 목록 초기 상태처럼 핵심 제목·링크·카드 개수만 빠르게 확인한다.

```ts
await page.goto('/');
await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
await expect(page.getByRole('link', { name: '로그인' })).toBeVisible();
```

### 비동기 목록

검색·필터 뒤에는 로딩 상태와 결과 수 또는 특정 결과를 함께 검증한다.

```ts
await page.getByRole('button', { name: '검색' }).click();
await expect(page.getByText('로딩 중...')).toBeVisible();
await expect(page.getByText('로딩 중...')).toBeHidden();
await expect(page.getByRole('article')).toHaveCount(4);
```

### 전체 사용자 플로우

로그인 → 목록 → 상세 → 예약/결제처럼 서비스 가치가 큰 여정을 한 파일에 작성한다. 이동 또는 모달 열기마다 중간 검증을 넣는다.

```ts
await page.getByRole('link', { name: 'PT 찾기' }).click();
await expect(page).toHaveURL(/\/pt\/find/);

await page.getByTestId('pt-course-card').first().click();
await expect(page).toHaveURL(/\/pt\/manage\/\d+/);

await page.getByTestId('reservation-open-button').click();
await expect(page.getByTestId('reservation-modal')).toBeVisible();
```

## 실행

```bash
npm run dev
npm run test:e2e -- tests/e2e/ptFindRegist.spec.ts
```

개발 서버와 실제 백엔드·로그인 계정·테스트 데이터가 필요할 수 있다. 특히 인증 cookie, 역할 권한, 파일 업로드, 서버 액션이 포함된 흐름은 `page.route()`만으로 완전히 대체하기 어렵다. 먼저 단위/RTL 테스트로 UI 분기를 안정화하고, E2E는 대표 happy path부터 추가한다.
