import DaumPostcode from "react-daum-postcode";

export default function SearchAdressModal({ isModal, closeModal, completeHandler }: { isModal: boolean; closeModal: () => void; completeHandler: (data: any) => void }) {
    if (!isModal) return null;

    return (
        <div>

            <section
                className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
                onClick={closeModal} >
                <div
                    className="sm:p-4 md:p-5 lg:p-6 w-5/6 sm:w-4/5 md:w-3/5 lg:w-lg h-80 sm:h-90 md:h-100 lg:h-100 z-1000 fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
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
