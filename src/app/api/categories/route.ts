import { NextResponse } from 'next/server';
import { fetchWithAuth } from '@/lib/feth';

export async function GET() {
    const response = await fetchWithAuth(`/api/categories`);

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
}