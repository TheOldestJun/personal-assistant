'use client';
import { useState } from 'react';
import axios from 'axios';

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  addToast,
} from '@heroui/react';

export function ClearTableButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  async function handleClear(onClose) {
    setLoading(true);

    try {
      const res = await axios.post('/api/supply/safekeeping/clear');

      onClose();
      addToast({
        title: 'Таблицю успішно очищено',
        description: 'Видалено рядків: ' + res.data.deleted,
        type: 'success',
      });
    } catch (err) {
      addToast({
        title: 'Помилка',
        description: err.message,
        color: 'danger',
      });
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
          {onClose => (
            <>
              <ModalHeader className="text-lg font-semibold">
                Підтвердження дії
              </ModalHeader>

              <ModalBody>
                <div className="text-center">
                  Ви впевнені, що хочете{' '}
                  <b>повністю очистити дані відповідального зберігання</b>?
                </div>
                <div className="text-center text-red-500">
                  Цю дію не можна буде скасувати.
                </div>
              </ModalBody>

              <ModalFooter className="flex justify-center">
                <Button variant="flat" onPress={onClose} isDisabled={loading}>
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
