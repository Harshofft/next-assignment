// app/components/DocumentTable.tsx
"use client";
import { useState } from "react";

type Document = {
  id: number;
  name: string;
  size: string;
  type: "PDF" | "DOC" | "IMG" | "MP3" | "MP4";
  category: string;
  aiInclusion: boolean;
  dashboardInclusion: boolean;
  stage: string;
};

const initialDocuments: Document[] = [
  {
    id: 1,
    name: "Tech requirements.pdf",
    size: "200 KB",
    type: "PDF",
    category: "Legal",
    aiInclusion: true,
    dashboardInclusion: true,
    stage: "Full",
  },
  {
    id: 2,
    name: "Dashboard screenshot.jpg",
    size: "720 KB",
    type: "IMG",
    category: "Vendors & Assets",
    aiInclusion: true,
    dashboardInclusion: true,
    stage: "Onboarding",
  },
  {
    id: 3,
    name: "Dashboard prototype recording.mp4",
    size: "16 MB",
    type: "DOC",
    category: "Technology",
    aiInclusion: false,
    dashboardInclusion: true,
    stage: "Franchisee",
  },
  {
    id: 4,
    name: "Financial Overview",
    size: "4.2 MB",
    type: "DOC",
    category: "Financial",
    aiInclusion: true,
    dashboardInclusion: false,
    stage: "Prospect",
  },
  {
    id: 5,
    name: "UX Design Guidelines.docx",
    size: "400 KB",
    type: "DOC",
    category: "Legal",
    aiInclusion: true,
    dashboardInclusion: true,
    stage: "Onboarding",
  },
  {
    id: 6,
    name: "Dashboard interaction.aep",
    size: "6 MB",
    type: "PDF",
    category: "Legal",
    aiInclusion: true,
    dashboardInclusion: true,
    stage: "Onboarding",
  },
  {
    id: 7,
    name: "Briefing call recording.mp3",
    size: "18 MB",
    type: "MP3",
    category: "Financial",
    aiInclusion: true,
    dashboardInclusion: true,
    stage: "Prospect",
  },
];

export default function DocumentTable() {
  const [documents, setDocuments] = useState(initialDocuments);

  const toggleSwitch = (id: number, field: "aiInclusion" | "dashboardInclusion") => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, [field]: !doc[field] } : doc
      )
    );
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search here..."
          className="w-1/3 border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-100">
          Filters
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-gray-500 text-sm border-b">
            <th className="py-2 px-3">Document Name</th>
            <th className="py-2 px-3">Document Type</th>
            <th className="py-2 px-3">AI App Inclusion</th>
            <th className="py-2 px-3">Dashboard Inclusion</th>
            <th className="py-2 px-3">Stage Access</th>
            <th className="py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="border-b text-sm hover:bg-gray-50">
              {/* Document name */}
              <td className="py-2 px-3 flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-xs font-medium">
                  {doc.type}
                </span>
                <div>
                  <p>{doc.name}</p>
                  <span className="text-xs text-gray-400">{doc.size}</span>
                </div>
              </td>

              {/* Category */}
              <td className="py-2 px-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full 
                  ${
                    doc.category === "Legal"
                      ? "bg-blue-100 text-blue-700"
                      : doc.category === "Technology"
                      ? "bg-orange-100 text-orange-700"
                      : doc.category === "Financial"
                      ? "bg-pink-100 text-pink-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {doc.category}
                </span>
              </td>

              {/* AI App Inclusion */}
              <td className="py-2 px-3">
                <button
                  onClick={() => toggleSwitch(doc.id, "aiInclusion")}
                  className={`w-10 h-5 flex items-center rounded-full p-0.5 transition ${
                    doc.aiInclusion ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`w-4 h-4 bg-white rounded-full transform transition ${
                      doc.aiInclusion ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></span>
                </button>
              </td>

              {/* Dashboard Inclusion */}
              <td className="py-2 px-3">
                <button
                  onClick={() => toggleSwitch(doc.id, "dashboardInclusion")}
                  className={`w-10 h-5 flex items-center rounded-full p-0.5 transition ${
                    doc.dashboardInclusion ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`w-4 h-4 bg-white rounded-full transform transition ${
                      doc.dashboardInclusion ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></span>
                </button>
              </td>

              {/* Stage Dropdown */}
              <td className="py-2 px-3">
                <select
                  value={doc.stage}
                  onChange={(e) =>
                    setDocuments((prev) =>
                      prev.map((d) =>
                        d.id === doc.id ? { ...d, stage: e.target.value } : d
                      )
                    )
                  }
                  className="border rounded-lg px-2 py-1 text-sm"
                >
                  <option value="Full">Full</option>
                  <option value="Onboarding">Onboarding</option>
                  <option value="Franchisee">Franchisee</option>
                  <option value="Prospect">Prospect</option>
                </select>
              </td>

              {/* Actions */}
              <td className="py-2 px-3 flex gap-3">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
