'use client'
import useModal from "@/components/hooks/useModal";
import OrganizationTrainerAddForm from "./OrganizationTrainerAddForm";
import { OrganizationManageTrainerListItem } from "../type";
import { deleteOrganizationTrainerAction } from "../actions";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import OneButtonModal from "@/components/ui/OneButtonModal";

interface OrganTrainerCardProps {
  data: OrganizationManageTrainerListItem[];
}

export default function OrganizationTrainerCard( {data}: OrganTrainerCardProps) {

  const handleDeleteClick = async (trainerProfileId: number) => {
    const response = await deleteOrganizationTrainerAction(trainerProfileId);
  }

  // const confirmModal = useModal(handleDeleteClick);
  // const checkModal = useModal(confirmModal.openModal);

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
              key={item.trainerProfileId}
              className="grid grid-cols-[1.5fr_1fr_1fr_1fr_0.7fr] border-b border-[#1E2939] px-6 py-4 items-center text-[14px] text-white"
            >
                <div>{item.username}</div>
                <div>{item.trainerName}</div>
                <div>{item.trainerName}</div>
                <div>{item.registeredAt.split("T")[0]}</div>
                <div>
                  <button 
                    type="button"
                    // onClick={checkModal.openModal}
                    className="rounded-[10px] border border-[#FB2C364D] px-5 py-2 bg-[#FB2C361A] text-[#FB2C36] font-bold">
                    🗑 삭제
                  </button>
                  {/* <TwoButtonModal
                      isModal={checkModal.isModal}
                      closeModal={checkModal.closeModal} 
                      activeModal={checkModal.activeModal}
                      content="트레이너를 삭제하시곘습니까?"
                      title='트레이너 삭제' 
                  />

                  <OneButtonModal 
                      isModal={confirmModal.isModal}
                      closeModal={confirmModal.closeModal}
                      activeModal={confirmModal.activeModal} 
                      title='트레이너 삭제'
                      content='트레이너 삭제가 완료했습니다.' 
                  /> */}
                </div>
            </div>
            ))}
        </div>
    </div>
  );
}
