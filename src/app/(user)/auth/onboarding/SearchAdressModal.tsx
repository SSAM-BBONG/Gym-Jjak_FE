import DaumPostcode from "react-daum-postcode";

export default function SearchAdressModal({ isModal, closeModal, completeHandler }: { isModal: boolean; closeModal: () => void; completeHandler: (data: any) => void }) {
    if (!isModal) return null;

    return (
        <div>

            <section
                className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
                onClick={closeModal} >
                <div
                    className="p-6 w-lg h-100 z-1000 fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                    onClick={(e) => e.stopPropagation()}>
                    <DaumPostcode
                        onComplete={completeHandler}
                        autoClose={false}
                    />

                </div>
            </section>

        </div>
    );
}