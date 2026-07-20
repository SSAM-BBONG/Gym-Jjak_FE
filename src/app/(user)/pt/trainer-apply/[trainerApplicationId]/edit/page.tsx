import TrainerRegistForm from "@/feature/pt/components/TrainerRegistForm";
import { getMyTrainerApplicationDetail } from "@/service/ptzone.service";

interface TrainerApplicationEditPageProps {
  params: Promise<{ trainerApplicationId: string }>;
}

export default async function TrainerApplicationEditPage({ params }: TrainerApplicationEditPageProps) {
  const { trainerApplicationId: trainerApplicationIdParam } = await params;
  const trainerApplicationId = Number(trainerApplicationIdParam);
  const result = await getMyTrainerApplicationDetail(trainerApplicationId);

  return <TrainerRegistForm mode="edit" initialData={result.data} />;
}
