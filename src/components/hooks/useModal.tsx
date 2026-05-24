'use client'

import { useState } from "react"


function useModal(activefunc?: () => void) {
    const [isModal, setIsModal] = useState<boolean>(false);

    //모달 여는 함수 
    const openModal = (): void => {
        setIsModal(true);
    }

    //모달 닫히는 함수
    const closeModal = (): void => {
        setIsModal(false);
    }

    //모달이 실행될 때 일어나는 함수
    const activeModal = (): void => {
        setIsModal(false);
        activefunc?.();
    }

    return { openModal, closeModal, activeModal, isModal }
}

export default useModal