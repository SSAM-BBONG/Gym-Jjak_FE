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
        imgInput();
    };

    //이미지 분류(추론)
    const classifyImage = async () => {
        const model = modelRef.current;
        const imgElement = imgRef.current;

        if (!model || !imgElement) {
            setError('모델 또는 이미지가 준비되어 있지 않습니다.');
            return;
        }

        setClassifying(true);
        setError(null);
        try {
            const result = await model.classify(imgElement, 3); //[{className, probability}]
            setPredictions(result);
        } catch (error) {
            setError(error instanceof Error ? error.message : '분류 실패');
        } finally {
            setClassifying(false);
        }
    };


    const imgInput = async () => {
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

        if (modelInterval) {
            clearInterval(modelInterval);
        }

        classifyImage();
    }



    return (
        <>
            <div className="w-full bg-[#1E2939] h-50">
                이미지
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-sm text-zinc-700 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-100 file:px-4 file:py-2 file:text-emerald-700 dark:text-zinc-300 dark:file:bg-emerald-900/50 dark:file:text-emerald-300"
                />
            </div>
            <label className="font-bold text-base md:text-xl text-white">메뉴</label>
            <textarea
                maxLength={255}
                placeholder="메뉴를 입력해주세요"
                className="border-[#364153] border w-full h-20 p-3 md:p-6 bg-[#1E2939] rounded-md resize-none focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none"
            ></textarea>
        </>
    );
}