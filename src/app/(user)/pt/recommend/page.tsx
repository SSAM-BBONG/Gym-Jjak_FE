import PtRecommendationFlow from "@/feature/pt/components/PtRecommendationFlow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI PT 추천 | GYMJJAK",
  description: "운동 목표와 현재 상태에 맞는 PT 코스를 AI에게 추천받아보세요.",
};

export default function PtRecommendationPage() {
  return <PtRecommendationFlow />;
}
