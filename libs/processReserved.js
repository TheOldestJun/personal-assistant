import ExcelJS from 'exceljs';

const RECEIVER_ALLOWED = '(21601) ДП "Ферротранс"';

export async function processReserved(buffer) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(buffer);

  const ws = wb.getWorksheet('Снимок экрана');
  if (!ws) throw new Error('Лист не найден');

  // === Исправление заголовков ===
  ws.getCell('A3').value = 'Заказчик';
  ws.getCell('B3').value = 'Получатель';
  ws.getCell('P3').value = 'Кол-во';

  const headerRow = ws.getRow(3).values;

  const idxCustomer = headerRow.indexOf('Заказчик');
  const idxReceiver = headerRow.indexOf('Получатель');
  const idxCode = headerRow.indexOf('Код ТМЦ');
  const idxName = headerRow.indexOf('Наименование');
  const idxQty = headerRow.indexOf('Кол-во');
  const idxSum = headerRow.indexOf('Сумма');
  const idxUnit = headerRow.indexOf('ЕИ');

  const rows = ws.getSheetValues().slice(4);
  const map = new Map();

  for (const row of rows) {
    if (!row) continue;

    const receiver = row[idxReceiver];
    if (receiver !== RECEIVER_ALLOWED) continue;

    const customer = Number(row[idxCustomer]);
    const code = row[idxCode];
    if (!code || !customer) continue;

    const name = row[idxName];
    const qty = Number(row[idxQty]) || 0;
    const sum = Number(row[idxSum]) || 0;
    const unit = row[idxUnit] || '';

    let notes = null;
    if (customer === 1000) notes = 'rail';
    if (customer === 10100) notes = 'ferro';

    const key = `${code}_${customer}`;

    if (!map.has(key)) {
      map.set(key, {
        code,
        name,
        qty: 0,
        sum: 0,
        notes,
        customer,
        unit,
      });
    }

    const obj = map.get(key);
    obj.qty += qty;
    obj.sum += sum;
  }

  return [...map.values()];
}
