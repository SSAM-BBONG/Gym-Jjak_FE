import TrainerRegistForm from "@/feature/pt/components/TrainerRegistForm";
import { getTrainerApplication } from "@/service/ptzone.service";

export default async function TrainerApplicationEditPage() {

    const trainerApplicationData = await getTrainerApplication();

    return (
        <>
            <TrainerRegistForm mode="edit" initialData={trainerApplicationData.data} />
        </>
    );
}