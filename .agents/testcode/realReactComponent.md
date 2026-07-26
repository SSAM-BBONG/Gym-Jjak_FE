# 실제 React Testing Library 예제 기반 컴포넌트 테스트 가이드

이 문서는 `C:\dev\workspaces\10_testing\02_react-testing-librry`에서 사용한 React Testing Library(RTL) + Jest 작성 방식을 이 프로젝트에 적용하기 위한 참고 문서다. 기존 상세 규격은 `react-component.md`를 우선한다.

## 참고 폴더에서 사용한 방식

- 테스트 파일은 `src/__tests__/*.test.tsx`에 두고 `render`, `screen`으로 사용자 화면을 검증한다.
- 상태와 이벤트가 있는 작은 컴포넌트부터 테스트한다. 입력 컴포넌트, 할 일 목록, 카운터, 비동기 프로필 조회가 예제 대상이다.
- 사용자는 `userEvent.setup()`으로 타이핑·클릭·키 입력을 수행한다.
- 요소는 `getByRole`, `getByLabelText`, `getByText`로 찾는다.
- 비동기 렌더링은 `findByRole` 또는 `waitFor`로 완료 시점을 기다린다.
- 콜백과 `fetch`는 `jest.fn()`으로 mock하고, 호출 횟수·인자를 함께 검증한다.

## 이 프로젝트와의 차이

현재 프로젝트는 Next.js용 `next/jest`와 `jsdom`, `@testing-library/jest-dom` 설정을 이미 갖추고 있다. 다만 `@testing-library/user-event`는 아직 `package.json`에 없다. 따라서 새 패키지 설치 승인 전에는 기존 규격처럼 `fireEvent`를 사용한다.

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import TodoInput from './TodoInput';

describe('TodoInput', () => {
  it('입력 후 추가 버튼을 누르면 onSubmit을 호출한다', () => {
    const onSubmit = jest.fn();
    render(<TodoInput onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('할 일 입력'), {
      target: { value: '운동하기' },
    });
    fireEvent.click(screen.getByRole('button', { name: '추가' }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('운동하기');
  });
});
```

## 테스트 시나리오 구성

참고 예제처럼 한 컴포넌트에서 다음 순서로 중요한 사용자 행동을 나눈다.

1. 초기 렌더링: 입력창·버튼·빈 상태가 보이는지
2. 정상 상호작용: 입력, 클릭, 선택 뒤 화면과 콜백이 바뀌는지
3. 경계 조건: 공백 입력, 필수값 누락, 중복 클릭
4. 상태 전환: 완료·취소·삭제 뒤 이전 상태가 사라지는지
5. 비동기 상태: 로딩 → 성공 또는 로딩 → 오류가 사용자에게 보이는지

## 비동기 UI 테스트

참고 폴더의 `UserProfile` 예제는 첫 렌더의 로딩 문구를 확인한 뒤 `waitFor` 또는 `findByRole`로 최종 상태를 검증한다. 이 프로젝트에서도 서버 액션 또는 fetch 결과를 기다릴 때 같은 방식으로 작성한다.

```tsx
import { render, screen, waitFor } from '@testing-library/react';

it('조회에 성공하면 사용자 이름을 표시한다', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ name: '홍길동' }),
  });

  render(<UserProfile userId={1} />);
  expect(screen.getByText('로딩 중...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText('로딩 중...')).not.toBeInTheDocument();
  });

  expect(screen.getByText('홍길동')).toBeInTheDocument();
});
```

## 쿼리와 검증 원칙

- 사용자가 인식하는 이름을 우선한다: `getByRole('button', { name: '저장' })`, `getByLabelText('강습 제목')`
- 사라지는 요소는 `queryBy...`로 확인한다.
- 나중에 나타나는 요소는 `findBy...` 또는 `waitFor`를 사용한다.
- 스타일 클래스 검증은 사용자 행동의 결과를 표현해야 할 때만 한다. 예: 완료 체크 후 `li`에 `line-through`가 붙는지
- `data-testid`는 접근성 쿼리로 식별할 수 없는 경우에만 사용하고, 기존 E2E 식별자가 있으면 재사용한다.

## 프로젝트 의존성 mock

컴포넌트가 라우터·서버 액션·외부 모달을 사용하면 실제 실행 대신 mock한다. 각 테스트가 끝난 뒤 mock 상태도 초기화한다.

```tsx
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

jest.mock('../actions', () => ({
  updatePtCourse: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});
```

## 파일 위치와 실행

이 프로젝트의 기존 규격에 맞춰 컴포넌트 옆에 `{ComponentName}.test.tsx`로 작성한다.

```bash
npm test -- --runInBand src/feature/pt/components/PtCourseEditForm.test.tsx
```

참고 폴더처럼 `userEvent`를 쓰려면 먼저 의존성 추가 승인을 받고, 승인 전에는 `fireEvent` 방식으로 동일한 사용자 결과를 검증한다.
