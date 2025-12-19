import { useState } from 'react';

import { useEditProductMutation } from '@/store/services/products';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  addToast,
  Input,
} from '@heroui/react';

export default function EditButton({ value }) {
  const [editProduct] = useEditProductMutation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newValue, setNewValue] = useState(null);

  async function handleClear(onClose) {
    try {
      const result = await editProduct(newValue);
      onClose();
      if (result.data) {
        addToast({
          title: 'ТМЦ успішно змінено',
          description: 'Назва: ' + result.data.title,
          type: 'success',
        });
      }
    } catch (err) {
      addToast({
        title: 'Помилка',
        description: err.message,
        color: 'danger',
      });
    }
  }

  return (
    <>
      {/* Кнопка открытия модалки */}
      <Button color="primary" onPress={onOpen} className="mt-2 w-full">
        Редагувати
      </Button>

      {/* Модальное окно */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="text-lg font-semibold">
                Редагування ТМЦ
              </ModalHeader>

              <ModalBody>
                <Input
                  defaultValue={value.label}
                  onChange={e =>
                    setNewValue({
                      id: value.value,
                      title: e.target.value.toUpperCase(),
                    })
                  }
                />
              </ModalBody>

              <ModalFooter className="flex justify-center">
                <Button variant="flat" onPress={onClose}>
                  Скасувати
                </Button>

                <Button color="success" onPress={() => handleClear(onClose)}>
                  Зберегти
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
