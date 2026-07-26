import { ChatSendButton } from "@/components/ui/image";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import type { Dispatch, FormEventHandler, SetStateAction } from "react";
import STTButton from "./STTButton";

interface ChatInputFormProps {
    message: string;
    loading: boolean;
    isConnected: boolean;
    isListening: boolean;
    socketError: string;
    onMessageChange: (message: string) => void;
    onSubmit: FormEventHandler<HTMLFormElement>;
    onScrollToBottom: () => void;
    setMessage: Dispatch<SetStateAction<string>>;
    setIsListening: Dispatch<SetStateAction<boolean>>;
}

export default function ChatInputForm({
    message,
    loading,
    isConnected,
    isListening,
    socketError,
    onMessageChange,
    onSubmit,
    onScrollToBottom,
    setMessage,
    setIsListening,
}: ChatInputFormProps) {
    return (
        <>
            {socketError && (
                <p className="absolute bottom-16 px-5 pb-2 text-center text-xs text-[#FB7185]">
                    {socketError}
                </p>
            )}

            {isListening && (
                <p className="absolute bottom-16 px-5 pb-2 text-center text-xs text-[#99A1AF]">
                    음성인식 중입니다...
                </p>
            )}

            <form
                onSubmit={onSubmit}
                className="absolute bottom-0 z-50 flex w-full items-center gap-3 bg-[#0B0F19] px-4 pb-4 sm:px-5 sm:pb-5"
            >
                <input
                    type="text"
                    value={message}
                    onChange={(event) => onMessageChange(event.target.value)}
                    placeholder="메시지 보내기..."
                    aria-label="메시지 입력"
                    maxLength={5000}
                    disabled={loading}
                    className="h-11 min-w-0 flex-1 rounded-[15px] border border-[#364153] bg-[#0F172A] px-4 text-sm text-white outline-none placeholder:text-[#6A7282] focus:border-[#65748B]"
                />
                <STTButton
                    loading={loading}
                    isConnected={isConnected}
                    setMessage={setMessage}
                    isListening={isListening}
                    setIsListening={setIsListening}
                />
                <button
                    type="submit"
                    disabled={loading || !isConnected || !message.trim()}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#BFFF0B] hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Image
                        src={ChatSendButton}
                        alt="채팅 보내기 버튼"
                        width={20}
                        height={15}
                    />
                </button>

                <button
                    type="button"
                    onClick={onScrollToBottom}
                    aria-label="채팅 맨 아래로 이동"
                    className="fixed right-4 bottom-20 z-60 flex h-9 w-9 items-center justify-center rounded-full bg-[#BFFF0B] shadow-lg transition-transform hover:scale-105 sm:right-5 sm:bottom-22"
                >
                    <ChevronDown
                        aria-hidden="true"
                        size={20}
                        strokeWidth={2.5}
                        className="text-black"
                    />
                </button>
            </form>
        </>
    );
}
