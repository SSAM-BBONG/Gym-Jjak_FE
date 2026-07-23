import PtCourseEditForm from "@/feature/pt/components/PtCourseEditForm";
import { getPtDetail } from "@/service/ptzone.service";

export default async function PtCourseEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getPtDetail(id);

  return (
    <div className="flex flex-col gap-1 px-60 py-10">
      <h1 className="text-[36px] font-black text-white">
        PT 수정
      </h1>
      <p className="text-[14px] text-[#99A1AF]">등록한 PT 강습 정보를 수정하세요.</p>
      <PtCourseEditForm course={response.data} />
    </div>
  )
}
