import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuth } from '@/lib/feth';

export async function GET(request: NextRequest) {
    const date = request.nextUrl.searchParams.get('date');

    if (!date) {
        return NextResponse.json(
            { message: 'date가 필요합니다.' },
            { status: 400 }
        );
    }

    const response = await fetchWithAuth(`/api/calendar/day?date=${date}`);

    try {
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch {
        return NextResponse.json(
            { message: '캘린더 일별 조회에 실패하였습니다.' },
            { status: response.status }
        );
    }
}