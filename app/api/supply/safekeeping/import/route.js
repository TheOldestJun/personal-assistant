import ExcelJS from 'exceljs';
import { NextResponse } from 'next/server';

import prisma from '@/prisma';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const sheet = workbook.worksheets[0]; // первая вкладка

    const rows = [];
    const header = [];

    // ---- 1. Собираем заголовки (первую строку) ----
    sheet.getRow(1).eachCell((cell, col) => {
      header[col] = cell.value;
    });

    // ---- 2. Читаем строки начиная со 2-й ----
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // пропускаем заголовок

      const obj = {};

      row.eachCell((cell, col) => {
        const colName = header[col];
        obj[colName] = cell.value;
      });

      rows.push(obj);
    });

    // ---- 3. Маппинг колонок Excel → DB ----
    const mapped = rows.map(r => ({
      code: r['Код ТМЦ']?.toString() ?? null,
      name: r['Наименование'] ?? null,
      units: r['ЕИ'] ?? null,
      quantity: Number(r['Кол-во']) || 0,
      gok: Number(r['ГОК']) || 0,
      ferro: Number(r['Забрано']) || 0,
      order: Number(r['Забрать']) || 0,
      notes: r['Примечание'] ?? null,
    }));

    // ---- 4. Сохраняем в БД ----
    await prisma.safekeeping.createMany({
      data: mapped,
    });

    return NextResponse.json({
      success: true,
      inserted: mapped.length,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
