# 실제 Jest 예제 기반 단위 테스트 가이드

이 문서는 `C:\dev\workspaces\10_testing\01_jest`에서 사용한 순수 Jest 방식(`ts-jest`, Node 환경)을 이 프로젝트에 적용하기 위한 참고 문서다. 기존 상세 규격은 `jest-unit.md`를 우선한다.

## 참고 폴더에서 사용한 방식

- 테스트 대상과 테스트 파일을 같은 폴더에 둔다. 예: `sum.ts` / `sum.test.ts`
- `describe`로 함수 또는 기능을 묶고, `test` 또는 `it` 안에서 **Given → When → Then** 순서로 작성한다.
- 원시값은 `toBe`, 객체·배열은 `toEqual` 또는 `toMatchObject`로 검증한다.
- 예외는 `expect(() => 함수()).toThrow()`처럼 호출을 콜백으로 감싼다.
- `localStorage`처럼 Node 환경에 없는 브라우저 API는 mock으로 만들고, `beforeEach` / `afterEach`로 상태를 초기화한다.

## 이 프로젝트에서 먼저 선택할 대상

1. `src/lib`의 순수 함수와 Zod 스키마
2. `src/service`의 응답 파싱 및 성공·실패 분기
3. `src/feature/*/actions.ts`의 입력 검증과 결과 변환

UI 렌더링이나 클릭을 검증해야 하면 `realReactComponent.md`를 사용한다.

## 기본 작성 형태

```ts
import { divide, sum } from './calculator';

describe('calculator', () => {
  it('2와 3을 더하면 5를 반환한다', () => {
    // Given
    const first = 2;
    const second = 3;

    // When
    const result = sum(first, second);

    // Then
    expect(result).toBe(5);
  });

  it('0으로 나누면 예외를 던진다', () => {
    expect(() => divide(10, 0)).toThrow();
  });
});
```

## Matcher 선택 기준

| 검증 대상 | 우선 matcher |
| --- | --- |
| 숫자, 문자열, boolean | `toBe` |
| 객체, 배열 전체 값 | `toEqual` |
| 객체의 일부 필드 | `toMatchObject`, `toHaveProperty` |
| 배열 길이·포함 여부 | `toHaveLength`, `toContain` |
| 오류 발생 | `toThrow`, 비동기면 `rejects.toThrow` |
| mock 호출 | `toHaveBeenCalledTimes`, `toHaveBeenCalledWith` |

## 상태를 갖는 함수의 격리

`10_testing` 예제는 각 장바구니 테스트 전후에 `localStorage.clear()`를 호출해 테스트 간 상태 누수를 막는다. 이 프로젝트에서도 module state, mock, storage를 사용하는 테스트는 매 케이스가 독립적이어야 한다.

```ts
describe('최근 검색어 저장', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('검색어를 저장하면 최신 검색어 목록을 반환한다', () => {
    // ...
  });
});
```

## service / action에 적용할 때

순수 함수 예제의 "외부 상태를 격리한다"는 원칙을 그대로 적용한다. `fetchWithAuth` 등 HTTP 함수는 `jest.mock`으로 대체하고, 네트워크가 아닌 반환값·에러 변환·호출 인자를 검증한다. 구체적인 mock 형태는 `jest-unit.md`를 따른다.

## 실행

```bash
npm test -- --runInBand src/__test__/ptRegistSchema.test.ts
```

이 환경에서는 Jest worker 생성이 불안정할 수 있으므로, 우선 `--runInBand`로 특정 파일을 실행한다. Playwright 파일과 섞이지 않도록 Jest 실행 범위를 `src/__test__` 또는 대상 파일로 제한한다.
