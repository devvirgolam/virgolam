import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

// Import React Icons
import { FiFileText, FiFile } from "react-icons/fi"; // PDF, Excel icons
import { BiExport } from "react-icons/bi"; // Export dropdown icon

// Add custom CSS for Switch component
const switchStyles = `
  .custom-switch .ant-switch {
    background-color: #808080 !important;
  }
  .custom-switch .ant-switch-checked {
    background-color: #808080 !important;
  }
  .custom-switch .ant-switch-handle::before {
    background-color: #fff !important;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = switchStyles;
document.head.appendChild(styleSheet);

const PageHeader = ({
  title = "",
  subtitle = "",
  onAdd,
  tableData = [],
  extra = {},
  exportOptions = { pdf: true, excel: true },
}) => {
  const dataLength = tableData.length;

  // PDF export
  const handleDownloadPDF = () => {
    if (!tableData.length) return alert("No data available to export");

    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text(`${title} Report`, 14, 20);

      const headers = Object.keys(tableData[0] || {});
      const rows = tableData.map((row) =>
        headers.map((key) => {
          let value = row[key] ?? "—";
          if (value instanceof Date) value = value.toLocaleDateString();
          else if (typeof value === "object") value = JSON.stringify(value);
          else value = String(value);
          return value;
        })
      );

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [60, 141, 188] },
        columnStyles: headers.reduce((acc, _, i) => {
          acc[i] = { cellWidth: 30 };
          return acc;
        }, {}),
      });

      doc.save(`${title}.pdf`);
    } catch (error) {
      console.error(error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  // Excel export
  const handleDownloadExcel = () => {
    if (!tableData.length) return alert("No data available to export");

    try {
      const formattedData = tableData.map((row) => {
        const formattedRow = {};
        Object.keys(row).forEach((key) => {
          let value = row[key] ?? "—";
          if (value instanceof Date) value = value.toLocaleDateString();
          else if (typeof value === "object") value = JSON.stringify(value);
          else value = String(value);
          formattedRow[key] = value;
        });
        return formattedRow;
      });

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, title);
      XLSX.writeFile(workbook, `${title}.xlsx`);
    } catch (error) {
      console.error(error);
      alert("Failed to generate Excel file. Please try again.");
    }
  };

  const { viewMode, onViewToggle, showViewToggle = false } = extra;

  return (
    <div className="d-flex align-items-center justify-content-between gap-2 mb-4 flex-wrap">
      <div>
        <h4 className="mb-1">
          {title}{" "}
          <span className="badge badge-soft-primary ms-2">{dataLength}</span>
        </h4>
        {subtitle && <p className="text-muted mb-1">{subtitle}</p>}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 p-0">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
      </div>

      <div className="gap-2 d-flex align-items-center flex-wrap">
        {showViewToggle && (
          <button className="btn btn-outline-secondary" onClick={onViewToggle}>
            {viewMode ? "List View" : "Grid View"}
          </button>
        )}

        {onAdd && (
          <button className="btn btn-primary" onClick={onAdd}>
            Add New
          </button>
        )}

        {(exportOptions.pdf || exportOptions.excel) && (
          <div className="dropdown">
            <ul className="dropdown-menu dropdown-menu-end">
              {exportOptions.pdf && (
                <li>
                  <button className="dropdown-item" onClick={handleDownloadPDF}>
                    <FiFileText className="me-1" />
                  </button>
                </li>
              )}
              {exportOptions.excel && (
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleDownloadExcel}
                  >
                    <FiFile className="me-1" />
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
