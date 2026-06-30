// src/app/(user)/calendar/CalendarQueryProvider.tsx
'use client';

import { keepPreviousData, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function CalendarQueryProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(
        () => new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 1000 * 60 * 5,
                    gcTime: 1000 * 60 * 30,
                    refetchOnWindowFocus: false,
                    placeholderData: keepPreviousData,
                    retry: 1,
                },
            },
        })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

// staleTime - 설정해둔 시간 동안 이 데이터가 신선한 데이터라고 판단
// gcTime - 설정해둔 시간 동안 데이터를 메모리에 저장
// refetchOnWindowFocus - 브라우저에 재방문 시 fetch를 할지 말지
// placeholderData: keepPreviousData - 쿼리 키가 바뀔 때 이전의 키 값의 데이터를 미리 보여줌(6월 -> 7월)

// 리액트 쿼리의 장점 중 하나는 데이터가 로딩되는 시간 동안 신선한 데이터가 아니더라도 메모리에 저장된 데이터가 있다면 사용자에게 데이터를 먼저 보여줌
// => 신선한 데이터가 페칭된 이후에 바뀌게 됨
