import { act, renderHook } from '@testing-library/react';
import useModal from '@/components/hooks/useModal';

describe('useModal 훅 테스트', () => {
    beforeEach(() => {
        document.body.style.overflow = '';
    });

    afterEach(() => {
        document.body.style.overflow = '';
        jest.clearAllMocks();
    });

    test('모달의 초기 상태는 닫혀 있다', () => {
        const { result } = renderHook(() => useModal());

        expect(result.current.isModal).toBe(false);
    });

    test('openModal을 실행하면 모달이 열린다', () => {
        const { result } = renderHook(() => useModal());

        act(() => {
            result.current.openModal();
        });

        expect(result.current.isModal).toBe(true);
    });

    test('closeModal을 실행하면 모달이 닫힌다', () => {
        const { result } = renderHook(() => useModal());

        act(() => {
            result.current.openModal();
        });

        expect(result.current.isModal).toBe(true);

        act(() => {
            result.current.closeModal();
        });

        expect(result.current.isModal).toBe(false);
    });

    test('모달이 열리면 배경 스크롤을 잠그고 닫히면 기존 값을 복구한다', () => {
        // Given
        document.body.style.overflow = 'auto';
        const { result } = renderHook(() => useModal());

        // When
        act(() => {
            result.current.openModal();
        });

        // Then
        expect(document.body.style.overflow).toBe('hidden');

        // When
        act(() => {
            result.current.closeModal();
        });

        // Then
        expect(document.body.style.overflow).toBe('auto');
    });

    test('activeModal은 모달을 닫고 승인 콜백을 실행한다', () => {
        // Given
        const activeFunc = jest.fn();
        const { result } = renderHook(() => useModal(activeFunc));

        act(() => {
            result.current.openModal();
        });

        // When
        act(() => {
            result.current.activeModal();
        });

        // Then
        expect(result.current.isModal).toBe(false);
        expect(activeFunc).toHaveBeenCalledTimes(1);
    });

    test('noneActiveModal은 모달을 닫고 취소 콜백을 실행한다', () => {
        // Given
        const noneActiveFunc = jest.fn();
        const { result } = renderHook(() => useModal(undefined, noneActiveFunc));

        act(() => {
            result.current.openModal();
        });

        // When
        act(() => {
            result.current.noneActiveModal();
        });

        // Then
        expect(result.current.isModal).toBe(false);
        expect(noneActiveFunc).toHaveBeenCalledTimes(1);
    });
});
