import { NextResponse } from 'next/server';
import { fetchWithAuth } from '@/lib/feth';

export async function GET() {
    const response = await fetchWithAuth(`/api/categories`);

    try {
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch {
        return NextResponse.json(
            { message: '카테고리 조회에 실패하였습니다.' },
            { status: response.status }
        );
    }
}