interface OneButtonModalProps {
    isModal: boolean;
    closeModal: () => void;
    activeModal?: () => void;
    title: string;
    content: string;
}

export default function OneButtonModal({ isModal, closeModal, activeModal, title, content }: OneButtonModalProps) {
    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <div
                className="bg-gradient-to-br from-[#101828] to-[#000] w-4/5 sm:w-md h-52 rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <h3 className="font-bold md:text-xl text-lg mb-4 text-[#E8EAF0]">{title}</h3>
                    <p className="font-normal mb-auto whitespace-pre-wrap md:text-base text-sm text-[#E8EAF0]">{content}</p>
                </article>
                <article className='flex gap-3'>
                    <button
                        onClick={() => { activeModal?.(); closeModal(); }}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B]'
                    >
                        확인
                    </button>
                </article>
            </div>
        </section>

    );
}