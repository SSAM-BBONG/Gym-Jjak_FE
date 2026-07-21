'use client'

import { useState, useRef, useEffect } from "react";
import '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet'


interface Prediction {
    className: string;
    probability: number;
}


export default function MealImgClassifier() {
    // 모델 로딩 여부 
    const [modelLoading, setModelLoading] = useState(true);
    // 모델 로딩 진행 퍼센트
    const [progress, setProgress] = useState(0);
    // 모델 로딩 진행 상태 메시지
    const [progressLabel, setProgressLabel] = useState("모델 준비 중…");

    // 이미지 미리보기 경로 (Base64 URL)
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    // 이미지를 표시할 <img> 엘리먼트, 분류시에도 필요 (Ref 사용)
    const imgRef = useRef<HTMLImageElement>(null);


    // 분류 중 여부 
    const [classifying, setClassifying] = useState(false);
    // 분류 결과 
    const [predictions, setPredictions] = useState<Prediction[]>([]);

    // 에러 메시지 
    const [error, setError] = useState<string | null>(null);
    const modelRef = useRef<mobilenet.MobileNet | null>(null);



    useEffect(() => {
        const modelInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) return prev;
                const next = prev + Math.random() * 6 + 2;
                return Math.min(95, next);
            })
        }, 80)

        async function loadModel() {
            setProgressLabel('모델 다운로드 중...');

            try {
                const model = await mobilenet.load();
                modelRef.current = model;
                if (modelInterval) {
                    clearInterval(modelInterval);
                }

                setProgress(100);
                setProgressLabel('모델 로딩 완료!');
                setModelLoading(false);
            } catch (error) {
                setError(error instanceof Error ? error.message : '모델 로딩 중 오류가 발생했습니다.')
                if (modelInterval) {
                    clearInterval(modelInterval);
                }
            } finally {
                setModelLoading(false);
            }
        }

        loadModel();
        return (() => {
            if (modelInterval) {
                clearInterval(modelInterval);
            }
        })
    }, [])

    useEffect(() => {
        classifyImage();
    }, [selectedImage])


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setSelectedImage(null);
            setPredictions([]);
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setSelectedImage(event.target?.result as string);
            setPredictions([]);
        }
        reader.readAsDataURL(file);
    };

    //이미지 분류(추론)
    const classifyImage = async () => {
        if (!selectedImage) return;
        const model = modelRef.current;
        const imgElement = imgRef.current;

        if (!model || !imgElement) {
            setError('모델 또는 이미지가 준비되어 있지 않습니다.');
            return;
        }

        setClassifying(true);
        setError(null);
        try {
            const result = await model.classify(imgElement, 1);
            setPredictions(result);
        } catch (error) {
            setError(error instanceof Error ? error.message : '분류 실패');
        } finally {
            setClassifying(false);
        }
    };

    if (error) {
        return (
            <div className="w-full max-w-2xl rounded-xl text-white p-6">
                <p className="font-medium">오류</p>
                <p className="mt-1 text-sm">{error}</p>
            </div>
        );
    }


    return (
        <>
            {modelLoading && (
                <div className="mb-6">
                    <div className="mb-1 flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
                        <span>{progressLabel}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                        <div
                            className="h-full rounded-full bg-emerald-500 transition-all duration-300 ease-out dark:bg-emerald-600"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {!modelLoading && (
                <>
                    <div className="my-5">
                        <label htmlFor='menu'
                            className=" px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-bold bg-[#BFFF0B]">파일 선택</label>
                        <input
                            hidden
                            type="file"
                            id="menu"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>

                    {selectedImage && !modelLoading && (
                        <div className="mb-4 flex flex-col gap-3">
                            <img
                                ref={imgRef}
                                src={selectedImage}
                                alt="분류할 이미지"
                                className="max-h-64 w-auto rounded-lg border border-zinc-200 object-contain dark:border-zinc-600"
                            />
                        </div>
                    )}


                    {classifying && (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">분류 중…</p>
                    )}

                    <label className="font-medium text-base md:text-lg text-white">메뉴</label>
                    <textarea
                        maxLength={255}
                        defaultValue={predictions[0]?.className || ''}
                        placeholder="메뉴를 입력해주세요"
                        className="border-[#364153] border mt-2 mb-4  w-full h-20 p-3 md:px-6 md:py-4 bg-[#1E2939] rounded-md resize-none focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none"
                    ></textarea>
                </>
            )}

        </>
    );
}