import { act, renderHook } from '@testing-library/react';
import useModal from '@/components/hooks/useModal';

describe('useModal 훅 테스트', () => {
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
});