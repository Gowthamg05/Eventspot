
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { utils, write } from "xlsx";
import { saveAs } from "file-saver";
//faculty see the applied events
const ViewEvent = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [functionNameFilter, setFunctionNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("https://eventspot-2.onrender.com/eventfetch/application");
        setApplications(response.data);
        setFilteredApps(response.data);
      } catch (err) {
        console.error(err);
        setError("Could not fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    let filtered = applications;

    if (functionNameFilter) {
      filtered = filtered.filter(app =>
        app.eventId?.functionName?.toLowerCase().includes(functionNameFilter.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(app =>
        app.eventId?.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (departmentFilter) {
      filtered = filtered.filter(app =>
        app.department?.toLowerCase().includes(departmentFilter.toLowerCase())
      );
    }

    setFilteredApps(filtered);
  }, [functionNameFilter, categoryFilter, departmentFilter, applications]);

  // Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Student Applications", 14, 10);

    doc.text("Name", 14, 20);
    doc.text("Email", 50, 20);
    doc.text("Department", 90, 20);
    doc.text("Event Type", 130, 20);
    doc.text("Function Name", 160, 20);
    doc.text("Event Title", 200, 20);

    filteredApps.forEach((app, index) => {
      const y = 30 + index * 10;
      doc.text(app.name || "", 14, y);
      doc.text(app.email || "", 50, y);
      doc.text(app.department || "", 90, y);
      doc.text(app.eventId?.category || "N/A", 130, y);
      doc.text(app.eventId?.functionName || "N/A", 160, y);
      doc.text(app.eventId?.title || "N/A", 200, y);
    });

    doc.save("student_applications.pdf");
  };

  // Download Excel
  const downloadExcel = () => {
    const worksheet = utils.json_to_sheet(
      filteredApps.map(app => ({
        Name: app.name,
        Email: app.email,
        Department: app.department,
        Category: app.eventId?.category || "N/A",
        FunctionName: app.eventId?.functionName || "N/A",
        EventTitle: app.eventId?.title || "N/A",
      }))
    );

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Applications");

    const wbout = write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "student_applications.xlsx");
  };

  if (loading) return <div className="text-center mt-10 text-lg">⏳ Loading student applications...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-700">📋 Student Applications</h2>
        <button
          onClick={() => navigate("/faculty/dashboard")}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          ⬅️ Back
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Filter by Function Name"
          value={functionNameFilter}
          onChange={(e) => setFunctionNameFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded w-60"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded w-60"
        >
          <option value="">All Categories</option>
          <option value="Technical">Technical</option>
          <option value="Non-Technical">Non-Technical</option>
        </select>
        <input
          type="text"
          placeholder="🏫 Filter by Department"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded w-60"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">👤 Name</th>
              <th className="px-6 py-3 text-left">📧 Email</th>
              <th className="px-6 py-3 text-left">🏫 Department</th>
              <th className="px-6 py-3 text-left">📂 Event Type</th>
              <th className="px-6 py-3 text-left">🎉 Function Name</th>
              <th className="px-6 py-3 text-left">🏷️ Event Title</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <tr key={app._id} className="border-b hover:bg-indigo-50 transition">
                  <td className="px-6 py-3">{app.name}</td>
                  <td className="px-6 py-3">{app.email}</td>
                  <td className="px-6 py-3">{app.department}</td>
                  <td className="px-6 py-3">{app.eventId?.category || <span className="text-gray-400">N/A</span>}</td>
                  <td className="px-6 py-3">{app.eventId?.functionName || <span className="text-gray-400">N/A</span>}</td>
                  <td className="px-6 py-3">{app.eventId?.title || <span className="text-gray-400">N/A</span>}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No applications found with selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={downloadPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          📥 Download as PDF
        </button>

        <button
          onClick={downloadExcel}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          📥 Download as Excel
        </button>
      </div>
    </div>
  );
};

export default ViewEvent;
