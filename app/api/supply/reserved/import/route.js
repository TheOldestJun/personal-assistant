import ExcelJS from 'exceljs';
import { NextResponse } from 'next/server';

import createSheet from '@/libs/createSheet';
import { processReserved } from '@/libs/processReserved';
import prisma from '@/prisma';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  const mode = formData.get('mode');

  if (!file) {
    return NextResponse.json({ error: 'Файл не передан' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const data = await processReserved(buffer);

  // === Запись в БД ===
  if (mode === 'db') {
    await prisma.$transaction([
      prisma.reserved.deleteMany(),
      prisma.reserved.createMany({
        data: data.map(r => ({
          code: r.code,
          name: r.name,
          unit: r.unit,
          qty: r.qty,
          sum: r.sum,
          notes: r.notes,
        })),
      }),
    ]);

    return NextResponse.json({
      success: true,
      inserted: data.length,
    });
  }

  // === Формирование Excel ===
  const wbOut = new ExcelJS.Workbook();
  const railRows = data.filter(r => r.customer === 1000);
  const ferroRows = data.filter(r => r.customer === 10100);

  if (railRows.length) {
    createSheet(wbOut, 'ЖДЦ', railRows);
  }

  if (ferroRows.length) {
    createSheet(wbOut, 'ФЕРРОТРАНС', ferroRows);
  }

  const bufferOut = await wbOut.xlsx.writeBuffer();

  const filename = 'ТМЦ_сумма.xlsx';
  const encoded = encodeURIComponent(filename);

  return new NextResponse(bufferOut, {
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename=tmc_sum.xlsx; filename*=UTF-8''${encoded}`,
    },
  });
}
