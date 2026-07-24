import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportPDF = (tasks) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Task Management Report", 14, 18);

  // Date
  doc.setFontSize(10);
  doc.text(
    `Generated on: ${new Date().toLocaleString()}`,
    14,
    26
  );

  // Table
  autoTable(doc, {
    startY: 35,
    head: [[
      "Title",
      "Status",
      "Priority",
      "Due Date",
      "Created"
    ]],

    body: tasks.map((task) => [
      task.title,
      task.status,
      task.priority || "Medium",
      task.dueDate
        ? new Date(task.dueDate).toLocaleDateString("en-IN")
        : "-",
      new Date(task.createdAt).toLocaleDateString("en-IN"),
    ]),

    styles: {
      fontSize: 10,
      cellPadding: 3,
    },

    headStyles: {
      fillColor: [13, 110, 253],
      textColor: 255,
      fontStyle: "bold",
    },

    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });

  doc.save("Task_Report.pdf");
};

export default exportPDF;