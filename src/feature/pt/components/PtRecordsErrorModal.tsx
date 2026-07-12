import OneButtonModal from "@/components/ui/OneButtonModal";

interface PtRecordsErrorModalProps {
  isModal: boolean;
  closeModal: () => void;
  activeModal?: () => void;
  title: string;
  content: string;
}

export default function PtRecordsErrorModal({
  isModal,
  closeModal,
  activeModal,
  title,
  content,
}: PtRecordsErrorModalProps) {
  return (
    <OneButtonModal
      isModal={isModal}
      closeModal={closeModal}
      activeModal={activeModal}
      title={title}
      content={content}
    />
  );
}
