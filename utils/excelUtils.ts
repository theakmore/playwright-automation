import ExcelJS from "exceljs";

export async function readExcelData(filePath: string) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet("Sheet1");
  if (!worksheet) throw new Error("Sheet1 not found");

  const loginData: any[] = [];

  for (let i = 2; i <= worksheet.rowCount; i++) {
    const row = worksheet.getRow(i);

    loginData.push({
      testCase: row.getCell(1).text.trim(),
      email: row.getCell(2).text.trim(),
      password: row.getCell(3).text.trim(),
      expected: row.getCell(4).text.trim().toLowerCase()
    });
  }

  return loginData;
}
