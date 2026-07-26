export function ChartLoadingUI() {
    return (
        <div className="flex items-center justify-center h-96 bg-gray-100 rounded">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">로딩중...</p>
            </div>
        </div>
    )
}