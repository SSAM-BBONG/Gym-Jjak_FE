export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    status: number;
    code: string;
    message: string;
    data: {
        accessToken: string;
        role: string;
        onboardingCompleted: boolean;
    };
}


export interface RegisterRequest {
    username: string;
    password: string;
    name: string;
    nickname: string;
    phone: string;
}

export interface RegisterResponse {

}

export interface onbordingRequest {
    exerciseGoal: string;
    exercisePeriod: string;
    exerciseFrequency: string;
    preferredExercise: string;
    height: number;
    weight: number;
    region: RegionType;
}

export interface MyOnboardingResponse {
    onboardingId: number;
    exerciseGoal: string;
    exercisePeriod: string;
    exerciseFrequency: string;
    preferredExercise: string;
    height: number;
    weight: number;
    preferredRegion: RegionType;
}

export interface RegionType {
    sido: string;
    sigungu: string;
    eupmyeondong: string;
    fullName: string;
    latitude: number;
    longitude: number;
}


export interface RegionType {
    sido: string;
    sigungu: string;
    eupmyeondong: string;
    fullName: string;
    latitude: number;
    longitude: number;
}
