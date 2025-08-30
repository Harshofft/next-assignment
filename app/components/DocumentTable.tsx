// components/DocumentTable.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import img4 from "./../../public/assets/Button.png"
import PDf from "./../../public/assets/File type icon.png"
import DOC from "./../../public/assets/File type icon (1).png"
type Stage = "Full" | "Onboarding" | "Franchisee" | "Prospect";

interface DocumentItem {
  id: number;
  name: string;
  size: string;
  type: "PDF" | "DOC" | "IMG" | "MP3" | "MP4";
  category: string;
  aiApp: boolean;
  dashboard: boolean;
  stage: Stage;
}

const initialDocuments: DocumentItem[] = [
  { id: 1, name: "Tech requirements.pdf", size: "200 KB", type: "PDF", category: "Legal", aiApp: true, dashboard: true, stage: "Full" },
  { id: 2, name: "Dashboard screenshot.jpg", size: "720 KB", type: "PDF", category: "Vendors & Assets", aiApp: true, dashboard: true, stage: "Onboarding" },
  { id: 3, name: "Dashboard prototype recording.mp4", size: "16 MB", type: "DOC", category: "Technology", aiApp: false, dashboard: true, stage: "Franchisee" },
  { id: 4, name: "Financial Overview", size: "4.2 MB", type: "DOC", category: "Financial", aiApp: true, dashboard: false, stage: "Prospect" },
  { id: 5, name: "UX Design Guidelines.docx", size: "400 KB", type: "DOC", category: "Legal", aiApp: false, dashboard: false, stage: "Onboarding" },
  { id: 6, name: "Dashboard interaction.aep", size: "12 MB", type: "PDF", category: "Legal", aiApp: true, dashboard: true, stage: "Onboarding" },
  { id: 7, name: "Briefing call recording.mp3", size: "18.6 MB", type: "PDF", category: "Financial", aiApp: false, dashboard: false, stage: "Prospect" },
];

export default function DocumentTable() {
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectedAll) {
      setSelectedAll(false);
      setSelectedIds([]);
    } else {
      setSelectedAll(true);
      setSelectedIds(documents.map(d => d.id));
    }
  };

  const toggleSelect = (id: number) =>
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  const toggleSwitch = (id: number, field: "aiApp" | "dashboard") =>
    setDocuments(prev => prev.map(d => (d.id === id ? { ...d, [field]: !d[field] } : d)));

  const updateStage = (id: number, stage: Stage) =>
    setDocuments(prev => prev.map(d => (d.id === id ? { ...d, stage } : d)));

  const handleDelete = (id: number) => setDocuments(prev => prev.filter(d => d.id !== id));

  const categoryClass = (cat: string) => {
    if (cat === "Legal") return "bg-blue-100 text-blue-700";
    if (cat === "Technology") return "bg-orange-100 text-orange-700";
    if (cat === "Financial") return "bg-pink-100 text-pink-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm w-[1128px] h-{616px} border-[1px] border-[#999999]">
      {/* Topbar */}
      <div className="flex items-center px-[16px] py-[12px] justify-between h-[68px] ">
        <div className="relative">
          <input
            type="text"
            placeholder="     Search here..."
            className="py-[10px] px-[14px] h-[44px] rounded-lg border-[#999999] w-[320px] text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <svg className="absolute left-1  w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            <circle cx="11" cy="11" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <button className="flex items-center gap-2 border-[#999999] rounded-lg  text-sm h-[40px] hover:bg-gray-50"><Image src={img4} className="h-[40px]" alt="Filter"/></button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl ">
        <table className="w-full border-collapse border-[#999999] text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-600 text-sm">
              <th className="p-3 w-12"><input type="checkbox" checked={selectedAll} onChange={toggleSelectAll} /></th>
              <th className="p-3">Document Name</th>
              <th className="p-3">Document Type</th>
              <th className="p-3">AI App Inclusion</th>
              <th className="p-3">Dashboard Inclusion</th>
              <th className="p-3">Stage Access</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(doc => (
              <tr key={doc.id} className="border border-[#818181] hover:bg-gray-50">
                <td className="p-3"><input type="checkbox" checked={selectedIds.includes(doc.id)} onChange={() => toggleSelect(doc.id)} /></td>

                <td className="p-3 flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-xs font-semibold">{doc.type=="PDF"?<Image src={PDf} alt="pdf"/>:<Image src={DOC} alt="pdf"/>}</div>
                  <div>
                    <div className="text-gray-800">{doc.name}</div>
                    <div className="text-xs text-gray-400">{doc.size}</div>
                  </div>
                </td>

                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${categoryClass(doc.category)}`}>{doc.category}</span>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => toggleSwitch(doc.id, "aiApp")}
                    className={`w-10 h-5 rounded-full p-0.5 ${doc.aiApp ? "bg-sky-500" : "bg-gray-300"} transition`}
                    aria-pressed={doc.aiApp}
                  >
                    <span className={`block w-4 h-4 bg-white rounded-full transform transition ${doc.aiApp ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => toggleSwitch(doc.id, "dashboard")}
                    className={`w-10 h-5 rounded-full p-0.5 ${doc.dashboard ? "bg-sky-500" : "bg-gray-300"} transition`}
                    aria-pressed={doc.dashboard}
                  >
                    <span className={`block w-4 h-4 bg-white rounded-full transform transition ${doc.dashboard ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </td>

                <td className="p-3">
                  <select value={doc.stage} onChange={(e) => updateStage(doc.id, e.target.value as Stage)} className="border border-[#999999] rounded-lg px-3 py-1 text-sm">
                    <option value="Full">Full</option>
                    <option value="Onboarding">Onboarding</option>
                    <option value="Franchisee">Franchisee</option>
                    <option value="Prospect">Prospect</option>
                  </select>
                </td>

                <td className="p-3 text-right">
                  <div className="flex justify-end gap-4">
                    <button onClick={() => handleDelete(doc.id)} className="text-red-500 hover:underline">Delete</button>
                    <button className="text-sky-600 hover:underline">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
