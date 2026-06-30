import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuth } from '@/lib/feth';

export async function GET(request: NextRequest) {
    const year = request.nextUrl.searchParams.get('year');
    const month = request.nextUrl.searchParams.get('month');

    if (!year || !month) {
        return NextResponse.json(
            { message: 'year, month가 필요합니다.' },
            { status: 400 }
        );
    }

    const response = await fetchWithAuth(
        `/api/calendar/month?year=${year}&month=${month}`
    );

    try {
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch {
        return NextResponse.json(
            { message: '캘린더 월별 조회에 실패하였습니다.' },
            { status: response.status }
        );
    }
}