import ExcelJS from "exceljs";
import { NextResponse } from "next/server";

import { processReserved } from "@/libs/processReserved";
import  prisma  from "@/prisma";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const mode = formData.get("mode");

  if (!file) {
    return NextResponse.json({ error: "Файл не передан" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const data = await processReserved(buffer);

  // === Запись в БД ===
  if (mode === "db") {
    await prisma.$transaction([
      prisma.inventory.deleteMany(),
      prisma.inventory.createMany({
        data: data.map(r => ({
          code: r.code,
          name: r.name,
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
  const wsOut = wbOut.addWorksheet("Sheet1");

  wsOut.addRow(["Код ТМЦ", "Наименование", "Кол-во", "Сумма"]);

  const greenFill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "E6F4EA" }, // светло-зелёный
  };

  data.forEach(r => {
    const row = wsOut.addRow([r.code, r.name, r.qty, r.sum]);

    if (r.customer === 1000) {
      row.eachCell(cell => {
        cell.fill = greenFill;
      });
    }
  });

  const bufferOut = await wbOut.xlsx.writeBuffer();

  const filename = "ТМЦ_сумма.xlsx";
const encoded = encodeURIComponent(filename);

  return new NextResponse(bufferOut, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename=tmc_sum.xlsx; filename*=UTF-8''${encoded}`,
    },
  });
}
