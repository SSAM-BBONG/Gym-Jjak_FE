'use client'
import useModal from "@/components/hooks/useModal";
import OrganizationTrainerAddForm from "./OrganizationTrainerAddForm";

export default function OrganTrainerCard() {
  const trainers = [
    {
      id: "trainer001",
      name: "김트레이너",
      email: "trainer1@example.com",
      date: "2023-01-15",
    },
    {
      id: "trainer002",
      name: "이트레이너",
      email: "trainer2@example.com",
      date: "2023-03-20",
    },
    {
      id: "trainer003",
      name: "박트레이너",
      email: "trainer3@example.com",
      date: "2023-06-10",
    },
  ];
  
const activefunc =() =>{
  console.log('1');
}

  const modal = useModal(activefunc);

  return (
    <div className="flex flex-col gap-6">
      <button onClick={modal.openModal} className="self-end bg-[#BFFF0B] rounded-[14px] px-6 py-3 text-[16px] text-black font-extrabold">
        + 트레이너 추가
      </button>
      <OrganizationTrainerAddForm
      isModal={modal.isModal}
      closeModal={modal.closeModal}
      activeModal={modal.activeModal}
      />
      <div
        className="
            bg-[linear-gradient(135deg,_#101828_0%,_#1E2939_100%)]
            border border-[#364153] rounded-[16px]
            "
      >
          <div className="grid grid-cols-[1fr_1fr_1.8fr_1fr_0.7fr] border-b border-[#364153] px-6 py-4 text-[#99A1AF] font-extrabold">
            <div>사용자 ID</div>
            <div>이름</div>
            <div>이메일</div>
            <div>등록일</div>
            <div>관리</div>
          </div>

            <div
              className="grid grid-cols-[1fr_1fr_1.8fr_1fr_0.7fr] border-b border-[#1E2939] px-6 py-4 items-center text-white"
            >
              <div>trainer001</div>
              <div>김트레이너</div>
              <div>trainer1@example.com</div>
              <div>2023-01-15</div>
              <div>
                <button className="rounded-[10px] border border-[#FB2C364D] px-3 py-2 bg-[#FB2C361A] text-[#FB2C36] font-extrabold">
                  🗑 삭제
                </button>
              </div>

              
            </div>

                        <div
              className="grid grid-cols-[1fr_1fr_1.8fr_1fr_0.7fr] border-b border-[#1E2939] px-6 py-4 items-center text-white"
            >
              <div>trainer001</div>
              <div>김트레이너</div>
              <div>trainer1@example.com</div>
              <div>2023-01-15</div>
              <div>
                <button className="rounded-[10px] border border-[#FB2C364D] px-3 py-2 bg-[#FB2C361A] text-[#FB2C36] font-extrabold">
                  🗑 삭제
                </button>
              </div>
            </div>
        </div>
    </div>
  );
}
