"use client";
import { useState } from "react";
import axios from "axios";

import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/react";

export function ClearTableButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loading, setLoading] = useState(false);

    async function handleClear(onClose) {
        setLoading(true);

        try {
            const res = await axios.post("/api/supply/safekeeping/clear");

            onClose();
            alert(`Таблицю очищено!\nВидалено рядків: ${res.data.deleted}`);
        } catch (err) {
            alert("Помилка: " + (err.response?.data?.error ?? err.message));
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Кнопка открытия модалки */}
            <Button color="danger" variant="flat" onPress={onOpen}>
                Очистити таблицю
            </Button>

            {/* Модальное окно */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-lg font-semibold">
                                Підтвердження дії
                            </ModalHeader>

                            <ModalBody>
                                Ви впевнені, що хочете <b>повністю очистити таблицю Material</b>?
                                <br />
                                Цю дію не можна буде скасувати.
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    variant="flat"
                                    onPress={onClose}
                                    isDisabled={loading}
                                >
                                    Скасувати
                                </Button>

                                <Button
                                    color="danger"
                                    onPress={() => handleClear(onClose)}
                                    isLoading={loading}
                                >
                                    Так, очистити
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
