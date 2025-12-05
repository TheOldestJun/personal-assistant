import { useState } from 'react';
import axios from 'axios';

import UkrainianFileInput from '@/components/custom/ukrainianFileInput';
import {
  Card,
  CardBody,
  Button,
  Input,
  Progress,
  addToast,
} from '@heroui/react';

export default function ImportSafekeeping() {
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState(null);

  async function handleUpload() {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    try {
      const response = await axios.post(
        '/api/supply/safekeeping/import',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            const percent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100,
            );
            setPercent(percent);
          },
        },
      );
      if (response.data.error) {
        addToast({
          title: 'Помилка',
          description: response.data.error,
          color: 'danger',
        });
      } else {
        addToast({
          title: `Успішно імпортовано ${response.data.inserted} записів`,
          type: 'success',
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Card className="w-full max-w-md">
      <CardBody className="flex flex-col gap-4">
        <div className="text-sm font-semibold">Імпорт даних з Excel</div>
        <div className="relative flex w-full flex-col gap-2 md:flex-row">
          <UkrainianFileInput
            id="excel-file"
            accept=".xlsx"
            onChange={e => {
              const f = e.target.files[0];
              setFile(f || null);
            }}
            file={file}
            chooseFile={() => document.getElementById('excel-file').click()}
            className="w-full"
          />
          <Button
            color="primary"
            isDisabled={!file || loading}
            onPress={handleUpload}
            className="w-full md:w-28"
          >
            {loading ? 'Імпортую...' : 'Імпортувати'}
          </Button>
        </div>
        {loading && (
          <Progress
            size="sm"
            aria-label="Импорт..."
            value={percent}
            className="mt-1"
          />
        )}
      </CardBody>
    </Card>
  );
}