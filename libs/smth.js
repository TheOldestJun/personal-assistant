import ExcelJS from 'exceljs';

const input = "ferro.xlsx";
const output = "ТМЦ_сумма.xlsx";

(async () => {
    // Загружаем книгу
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(input);

    const ws = wb.getWorksheet("Снимок экрана");

    // Правим P3
    const p3 = ws.getCell("P3");
    if (p3.value !== "Кол-во") {
        p3.value = "Кол-во";
        await wb.xlsx.writeFile(input);
        console.log("Значение P3 исправлено на 'Кол-во'");
    }

    // Чтение данных, пропусан первых двух строк
    const rows = ws.getSheetValues().slice(3); // header=1 + skiprows=[0]
    
    // Индексы колонок
    const headerRow = ws.getRow(2).values;
    const idxCode = headerRow.indexOf("Код ТМЦ");
    const idxName = headerRow.indexOf("Наименование");
    const idxQty = headerRow.indexOf("Кол-во");
    const idxSum = headerRow.indexOf("Сумма");

    // Группировка
    const map = new Map();

    for (const row of rows) {
        if (!row) continue;
        const code = row[idxCode];
        const name = row[idxName];
        const qty = Number(row[idxQty]) || 0;
        const sum = Number(row[idxSum]) || 0;

        if (!map.has(code)) {
            map.set(code, { code, name, qty: 0, sum: 0 });
        }
        const obj = map.get(code);
        obj.qty += qty;
        obj.sum += sum;
    }

    // Создаем новый файл
    const wbOut = new ExcelJS.Workbook();
    const wsOut = wbOut.addWorksheet("Sheet1");

    wsOut.addRow(["Код ТМЦ", "Наименование", "Кол-во", "Сумма"]);

    [...map.values()].forEach(r => {
        wsOut.addRow([r.code, r.name, r.qty, r.sum]);
    });

    // Стили
    const thin = { style: "thin" };
    const border = {
        top: thin, left: thin, bottom: thin, right: thin
    };

    wsOut.eachRow((row, rowNumber) => {
        row.eachCell(cell => {
            cell.border = border;
            if (cell.col === 4) {
                cell.numFmt = '# ##0.00';
            }
        });

        const sumVal = row.getCell(4).value;

        if (typeof sumVal === "number") {
            if (sumVal > 100000) {
                row.eachCell(c => c.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFC7CE" }
                });
            } else if (sumVal > 50000) {
                row.eachCell(c => c.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "ECF96A" }
                });
            }
        }
    });

    await wbOut.xlsx.writeFile(output);
    console.log("Готово:", output);
})();