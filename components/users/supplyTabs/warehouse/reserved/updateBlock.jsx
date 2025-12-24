import { useState } from 'react';

import UkrainianFileInput from '@/components/custom/ukrainianFileInput';
import { Button, Spinner, addToast, Card } from '@heroui/react';

export default function UpdateBlock({ className }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async mode => {
    if (!file) return;

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('mode', mode);

      const res = await fetch('/api/supply/reserved/import', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        addToast({
          title: 'Ошибка',
          description: 'Помилка опрацювання файлу',
          color: 'danger',
        });
      }

      if (mode === 'file') {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'ТМЦ_сумма.xlsx';
        a.click();

        URL.revokeObjectURL(url);
      } else {
        const json = await res.json();
        if (json.inserted) {
          addToast({
            title: 'Таблиця успішно оновлена',
            description: `Строк: ${json.inserted}`,
            color: 'success',
          });
        }
      }
    } catch (e) {
      addToast({
        title: 'Помилка',
        description: e.message,
        color: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <div className="text-center">Завантажити файл із резервами?</div>
      <div className="">
        <div className="flex justify-items-center gap-1">
          <UkrainianFileInput
            className="m-2"
            id="excel-file"
            accept=".xlsx"
            onChange={e => {
              const f = e.target.files[0];
              setFile(f || null);
            }}
            file={file}
            chooseFile={() => document.getElementById('excel-file').click()}
          />
          <Button
            color="primary"
            isDisabled={!file || loading}
            onPress={() => submit('file')}
            className="mt-2"
          >
            Завантажити опрацьований Excel
          </Button>
          <Button
            color="danger"
            isDisabled={!file || loading}
            onPress={() => submit('db')}
            className="mt-2"
          >
            Оновити базу даних
          </Button>
        </div>
        {loading && (
          <div className="text-default-500 flex items-center gap-2 text-sm">
            <Spinner size="sm" />
            Опрацювання файла…
          </div>
        )}
      </div>
    </div>
  );
}
