import { useState } from 'react';
import axios from 'axios';

import UkrainianFileInput from '@/components/custom/ukrainianFileInput';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Spinner,
  addToast,
} from '@heroui/react';

export default function Reserved() {
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
        throw new Error('Ошибка обработки файла');
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
        alert(`✅ Таблица перезаписана\nСтрок: ${json.inserted}`);
      }
    } catch (e) {
      alert(`❌ ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <div>Завантажити файл із резервами?</div>
          <UkrainianFileInput
            className="mt-2 w-full"
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
            className="mt-2 w-full"
          >
            Завантажити опрацьований Excel
          </Button>
          {loading && (
            <div className="text-default-500 flex items-center gap-2 text-sm">
              <Spinner size="sm" />
              Опрацювання файла…
            </div>
          )}
        </div>
      </CardHeader>
      <CardBody>Зарезервовано</CardBody>
    </Card>
  );
}
