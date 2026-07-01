import { ptRegistSchema } from '@/lib/ptRegistSchema';


describe('ptRegistSchema PT 등록 검증 테스트', () => {
    // 이미지 세팅
  const validImageFile = new File(['test'], 'pt-thumbnail.png', {
    type: 'image/png',
  });

    // 전부 작성하면 너무 길어서 함수로 생성   
  const createValidData = () => ({
    thumbnailFile: validImageFile,
    title: '체형 교정 PT',
    description: '초보자를 위한 체형 교정 PT입니다.',
    categoryId: 1,
    tagId: 1,
    price: 50000,
    curriculums: [
      {
        title: '1회차 상담',
        content: '운동 목표와 현재 상태를 확인합니다.',
      },
    ],
    schedules: [
      {
        dayOfWeek: 'MONDAY',
        startTime: '10:00',
        endTime: '11:00',
      },
    ],
  });

  test('올바른 PT 등록 정보면 검증에 성공한다', () => {
    // 함수값 data에 저장하기
    const data = createValidData();

    const result = ptRegistSchema.safeParse(data);

    // 검증하기 (아래도 전부동일)
    expect(result.success).toBe(true);
  });

  test('썸네일 파일이 없으면 검증에 실패한다', () => {
    // 함수값 data에 업데이트해서 저장 (test 조건에 맞게) (아래도 전부 동일)
    const data = {
      ...createValidData(),
      thumbnailFile: undefined,
    };

    const result = ptRegistSchema.safeParse(data);

    expect(result.success).toBe(false);
  });

  test('썸네일 파일 형식이 JPG, PNG, WEBP가 아니면 검증에 실패한다', () => {
    const textFile = new File(['test'], 'test.txt', {
      type: 'text/plain',
    });

    const data = {
      ...createValidData(),
      thumbnailFile: textFile,
    };

    const result = ptRegistSchema.safeParse(data);

    expect(result.success).toBe(false);
  });


  test('강습명이 비어 있으면 검증에 실패한다', () => {
    const data = {
      ...createValidData(),
      title: '',
    };

    const result = ptRegistSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('강습 소개가 비어 있으면 검증에 실패한다', () => {
    const data = {
      ...createValidData(),
      description: '',
    };

    const result = ptRegistSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('카테고리를 선택하지 않으면 검증에 실패한다', () => {
    const data = {
      ...createValidData(),
      categoryId: 0,
    };

    const result = ptRegistSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('태그를 선택하지 않으면 검증에 실패한다', () => {
    const data = {
      ...createValidData(),
      tagId: 0,
    };

    const result = ptRegistSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('가격이 0원 미만이면 검증에 실패한다', () => {
    const data = {
      ...createValidData(),
      price: -1000,
    };

    const result = ptRegistSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('커리큘럼이 비어 있으면 검증에 실패한다', () => {
    const data = {
      ...createValidData(),
      curriculums: [],
    };

    const result = ptRegistSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('커리큘럼 제목이 비어 있으면 검증에 실패한다', () => {
    const data = {
      ...createValidData(),
      curriculums: [
        {
          title: '',
          content: '운동 목표와 현재 상태를 확인합니다.',
        },
      ],
    };

    const result = ptRegistSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('수업 시간이 비어 있으면 검증에 실패한다', () => {
    const data = {
      ...createValidData(),
      schedules: [],
    };

    const result = ptRegistSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('요일 값이 정해진 값이 아니면 검증에 실패한다', () => {
    const data = {
      ...createValidData(),
      schedules: [
        {
          dayOfWeek: 'HOLIDAY',
          startTime: '10:00',
          endTime: '11:00',
        },
      ],
    };

    const result = ptRegistSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});