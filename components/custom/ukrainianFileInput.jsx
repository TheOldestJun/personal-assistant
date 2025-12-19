import { Button } from '@heroui/react';

export default function UkrainianFileInput({
  id,
  accept,
  onChange,
  file,
  chooseFile,
  className,
}) {
  return (
    <div className={className}>
      <input
        id={id}
        type="file"
        accept={accept}
        className="hidden"
        onChange={e => {
          onChange(e);
        }}
      />
      <Button variant="flat" onPress={chooseFile} className="w-full">
        {file ? `Обрано: ${file.name}` : 'Файл не обрано'}
      </Button>
    </div>
  );
}
