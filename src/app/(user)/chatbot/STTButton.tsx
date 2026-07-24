import { ChatSendButton } from "@/components/ui/image";
import { Mic, MicOff } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface Props {
    loading: boolean,
    isConnected: boolean,
    setMessage: Dispatch<SetStateAction<string>>
    isListening: boolean
    setIsListening: Dispatch<SetStateAction<boolean>>
}

export default function STTButton({ loading, isConnected, setMessage, isListening, setIsListening }: Props) {


    const [hasSTTSupport, setHasSTTSupport] = useState(false);

    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window == "undefined") return;


        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).WebkitSpeechRecognition;
        if (SpeechRecognition) {
            setHasSTTSupport(true);

            const recognition = new SpeechRecognition();
            recognition.lang = 'ko-KR';
            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onend = () => {
                setIsListening(false);
            }

            recognition.onerror = () => {
                setIsListening(false);
            }

            recognition.onresult = (event: any) => {
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const result = event.results[i];
                    if (result.isFinal) {
                        setMessage((prev) => prev + result[0].transcript + '\n');
                    }
                }

            }

            recognitionRef.current = recognition;
        }
    }, [])

    const handleStartListening = () => {
        if (!hasSTTSupport || !recognitionRef.current) return;

        try {
            recognitionRef.current.start();
            setIsListening(true);
        } catch (error) { }
    };

    const handleStopListening = () => {
        if (!recognitionRef.current) return;
        try {
            recognitionRef.current.stop();
            setIsListening(false);
        } catch (error) { }
    };

    return (
        <button
            onClick={() => { !isListening ? handleStartListening() : handleStopListening() }}
            type="button"
            disabled={loading || !isConnected}
            className="hidden md:flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#BFFF0B] hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {isListening ? (
                <MicOff size={20} />
            ) : (
                <Mic size={20} />
            )}
        </button >
    );
}