document.getElementById("saveRecordsBtn").addEventListener("click", () => {
    generateExcelFromGradesheet();
});

function generateExcelFromGradesheet() {
    const table = document.getElementById("gradesheetTable");
    const gradesheetBody = document.getElementById("gradesheet-body");

    // Array to store references to all grade input elements for temporary replacement
    const inputs = [];

    // --- 1. TEMPORARY DATA TRANSFORMATION (Replacing Inputs with Values) ---
    gradesheetBody.querySelectorAll('tr').forEach(row => {
        row.querySelectorAll('td').forEach(cell => {
            const input = cell.querySelector('input[type="number"], input[type="text"]');
            
            if (input) {
                // Store the reference
                inputs.push({ parent: cell, element: input });
                
                // Replace the input field with its current value (as plain text)
                const valueNode = document.createTextNode(input.value);
                cell.replaceChild(valueNode, input);
            }
        });
    });

    // --- 2. PERFORM EXCEL CONVERSION AND TEXT FORMATTING ---
    try {
        // Convert table into a SheetJS workbook
        const workbook = XLSX.utils.table_to_book(table, { sheet: "Gradesheet" });
        const sheet = workbook.Sheets["Gradesheet"];
        
        // Loop through all cells in the sheet to apply text format to the Student ID column (Column A)
        for (const cellAddress in sheet) {
            // Check if the property is a cell and if the column is 'A' (Student ID)
            if (cellAddress.startsWith('A') && cellAddress.length > 1) {
                const cell = sheet[cellAddress];
                
                // Ensure the cell is treated as text by adding the format property
                // This prevents Excel from stripping leading zeros.
                if (cell && cell.v) {
                     cell.t = 's'; // 's' stands for string (text) type
                     cell.z = '@'; // '@' is the text number format code in Excel
                }
            }
        }

        // Generate Excel file
        const excelFile = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
            cellStyles: true // Essential to apply the format we defined above
        });

        // Create blob & trigger download
        const blob = new Blob([excelFile], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `COSC1046_Gradesheet_${new Date().toISOString().split("T")[0]}.xlsx`;
        a.click();

        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error generating Excel file:", error);
    }

    // --- 3. REVERSE DATA TRANSFORMATION (Putting Inputs Back) ---
    inputs.forEach(item => {
        // Remove the temporary text node
        const textNode = item.parent.firstChild;
        item.parent.removeChild(textNode);
        
        // Re-insert the original input element
        item.parent.appendChild(item.element);
    });
}