'use client'
import useModal from "@/components/hooks/useModal";
import { OrganizationManageTrainerListItem } from "../type";
import { deleteOrganizationTrainerAction } from "../actions";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { useState } from "react";
import { toast } from "sonner";

interface OrganTrainerCardProps {
  data: OrganizationManageTrainerListItem[];
}

export default function OrganizationTrainerCard( {data}: OrganTrainerCardProps) {
  const deleteConfirmModal = useModal();
  const [selectedOrganizationTrainerId, setSelectedOrganizationTrainerId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (organizationTrainerId: number) => {
    setSelectedOrganizationTrainerId(organizationTrainerId);
    deleteConfirmModal.openModal();
  };

  const handleDeleteTrainer = async () => {
    if (selectedOrganizationTrainerId === null || isDeleting) return;

    setIsDeleting(true);
    try {
      const response = await deleteOrganizationTrainerAction(selectedOrganizationTrainerId);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
    } catch {
      toast.error("트레이너 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
      setSelectedOrganizationTrainerId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* <button onClick={modal.openModal} className="self-end bg-[#BFFF0B] rounded-[14px] px-6 py-3 text-[16px] text-black font-extrabold">
        + 트레이너 추가
      </button> */}
      {/* <OrganizationTrainerAddForm
      isModal={modal.isModal}
      closeModal={modal.closeModal}
      activeModal={modal.activeModal}
      /> */}
      <div
        className="
            bg-[#101828]
            border border-[#364153] rounded-[16px]
            "
      >
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_0.7fr] border-b border-[#364153] px-6 py-4 text-[14px] text-[#99A1AF] font-extrabold">
            <div>이메일</div>
            <div>이름</div>
            <div>닉네임</div>
            <div>등록일</div>
            <div>관리</div>
          </div>
            
            {data.map((item) => (           
            <div
              key={item.organizationTrainerId}
              className="grid grid-cols-[1.5fr_1fr_1fr_1fr_0.7fr] border-b border-[#1E2939] px-6 py-4 items-center text-[14px] text-white"
            >
                <div>{item.username}</div>
                <div>{item.trainerName}</div>
                <div>{item.trainerName}</div>
                <div>{item.registeredAt.split("T")[0]}</div>
                <div>
                  <button 
                    type="button"
                    onClick={() => handleDeleteClick(item.organizationTrainerId)}
                    disabled={isDeleting}
                    className="rounded-[10px] border border-[#FB2C364D] px-5 py-2 bg-[#FB2C361A] text-[#FB2C36] font-bold">
                    🗑 삭제
                  </button>
                </div>
            </div>
            ))}
        </div>
      <TwoButtonModal
        isModal={deleteConfirmModal.isModal}
        closeModal={deleteConfirmModal.closeModal}
        activeModal={() => {
          deleteConfirmModal.closeModal();
          void handleDeleteTrainer();
        }}
        title="트레이너 삭제"
        content="소속 트레이너를 삭제하시겠습니까?"
      />
    </div>
  );
}
