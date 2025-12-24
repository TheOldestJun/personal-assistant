export default function createSheet(wb, name, rows, fill) {
  const ws = wb.addWorksheet(name);

  ws.addRow(['Код ТМЦ', 'Наименование', 'ЕИ', 'Кол-во', 'Сумма']);

  rows.forEach(r => {
    const row = ws.addRow([r.code, r.name, r.unit, r.qty, r.sum]);
    row.eachCell(c => (c.fill = fill));
  });

  // Немного красоты
  ws.columns.forEach(col => {
    col.width = 25;
  });
}
