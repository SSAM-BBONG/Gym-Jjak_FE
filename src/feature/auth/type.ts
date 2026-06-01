export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {

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
