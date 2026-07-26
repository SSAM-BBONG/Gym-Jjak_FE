import { ptFeedbackSchema } from '@/lib/ptFeedbackSchema';

const MAX_VIDEO_FILE_SIZE = 10 * 1024 * 1024;

const createVideoFile = (
    name: string,
    size = 1,
    type = 'video/mp4',
) => new File([new Uint8Array(size)], name, { type });

const createValidFeedbackData = () => ({
    beforeFile: createVideoFile('before.mp4'),
    afterFile: createVideoFile('after.mp4'),
    content: '스쿼트 동작에서 무릎 방향을 유지해주세요.',
});

describe('PT 피드백 스키마', () => {
    test('Before, After 영상과 텍스트 피드백을 입력하면 검증에 성공한다', () => {
        // Given
        const data = createValidFeedbackData();

        // When
        const result = ptFeedbackSchema.safeParse(data);

        // Then
        expect(result.success).toBe(true);
    });

    test.each([
        ['Before', 'beforeFile'],
        ['After', 'afterFile'],
    ] as const)('%s 영상이 비어 있으면 검증에 실패한다', (_label, field) => {
        // Given
        const data = {
            ...createValidFeedbackData(),
            [field]: createVideoFile('empty.mp4', 0),
        };

        // When
        const result = ptFeedbackSchema.safeParse(data);

        // Then
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues).toContainEqual(
                expect.objectContaining({
                    path: [field],
                    message: '영상을 업로드해주세요.',
                }),
            );
        }
    });

    test('영상이 아닌 파일을 업로드하면 검증에 실패한다', () => {
        // Given
        const data = {
            ...createValidFeedbackData(),
            beforeFile: createVideoFile('before.png', 1, 'image/png'),
        };

        // When
        const result = ptFeedbackSchema.safeParse(data);

        // Then
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues).toContainEqual(
                expect.objectContaining({
                    path: ['beforeFile'],
                    message: '영상 파일만 업로드할 수 있습니다.',
                }),
            );
        }
    });

    test('영상 파일이 10MB를 초과하면 검증에 실패한다', () => {
        // Given
        const data = {
            ...createValidFeedbackData(),
            afterFile: createVideoFile(
                'after.mp4',
                MAX_VIDEO_FILE_SIZE + 1,
            ),
        };

        // When
        const result = ptFeedbackSchema.safeParse(data);

        // Then
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues).toContainEqual(
                expect.objectContaining({
                    path: ['afterFile'],
                    message: '10MB 이하 영상만 업로드할 수 있습니다.',
                }),
            );
        }
    });

    test('텍스트 피드백이 공백뿐이면 검증에 실패한다', () => {
        // Given
        const data = {
            ...createValidFeedbackData(),
            content: '   ',
        };

        // When
        const result = ptFeedbackSchema.safeParse(data);

        // Then
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues).toContainEqual(
                expect.objectContaining({
                    path: ['content'],
                    message: '텍스트 피드백을 입력해주세요.',
                }),
            );
        }
    });
});
