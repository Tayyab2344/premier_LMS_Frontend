"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Pagination from "@/components/ui/Pagination";

interface Application {
  id: string;
  fullName: string;
  cnic: string;
  email: string;
  whatsapp: string;
  selectedCourses: string[];
  totalAmount: number;
  status: string;
  paymentProof?: string;
  cnicFile?: string;
  photoFile?: string;
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [remarks, setRemarks] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [newCredentials, setNewCredentials] = useState<{ email: string; password: string } | null>(null);

  // Pagination & Filter States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const fetchApplications = async (page = currentPage, status = statusFilter, search = searchTerm) => {
    setLoading(true);
    try {
      const res = await api.get("/admissions", {
        params: { page, limit: 10, status, search },
      });
      if (res.data?.data) {
        setApplications(res.data.data);
        setTotalPages(res.data.meta.totalPages);
        setTotalItems(res.data.meta.total);
      } else {
        setApplications(res.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch applications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(currentPage, statusFilter, searchTerm);
  }, [currentPage, statusFilter, searchTerm]);

  const handleUpdateStatus = async (status: string) => {
    if (!selectedApp) return;
    setActionLoading(true);
    try {
      const res = await api.patch(`/admissions/${selectedApp.id}/status`, {
        status,
        remarks,
      });
      setActionLoading(false);

      if (res.data?.generatedPassword) {
        setNewCredentials({
          email: res.data.user.email,
          password: res.data.generatedPassword,
        });
        navigator.clipboard.writeText(`Email: ${res.data.user.email}\nPassword: ${res.data.generatedPassword}`).catch(() => {});
        showToast("Application approved! Credentials copied to clipboard.");
      } else {
        showToast(`Application marked as ${status}`);
      }
      setSelectedApp(null);
      setRemarks("");
      await fetchApplications();
    } catch (err: any) {
      setActionLoading(false);
      showToast(err.response?.data?.message || "Failed to update status", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-brand-green/30 border-t-brand-green rounded-full animate-spin" />
      </div>
    );
  }

  const getMediaUrl = (path: string) => {
    if (!path) return "#";
    // Check if absolute or relative
    if (path.startsWith("http")) return path;
    const cleanPath = path.replace(/^\.?\//, "");
    return `${api.defaults.baseURL}/uploads/${cleanPath}`;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-bold text-text-primary">Admissions Applications</h1>
        <p className="text-xs text-text-secondary mt-1">Review student applications and verify payment proofs</p>
      </div>

      {newCredentials && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start justify-between gap-4 animate-fade-in">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-600 font-bold">✓</div>
            <div>
              <h4 className="text-sm font-bold text-green-800">Student Account Created Successfully</h4>
              <p className="text-xs text-green-700 mt-1">Share these credentials with the student (already copied to clipboard):</p>
              <div className="mt-2 text-xs font-mono bg-white border border-green-200 rounded-lg p-2.5 space-y-1 text-text-primary select-all">
                <p><strong>Email:</strong> {newCredentials.email}</p>
                <p><strong>Password:</strong> {newCredentials.password}</p>
              </div>
            </div>
          </div>
          <button onClick={() => setNewCredentials(null)} className="text-green-500 hover:text-green-700 font-bold text-xs shrink-0">✕ Dismiss</button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search applicant name, email, CNIC..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 text-xs border border-border-light rounded-xl bg-white text-text-primary placeholder:text-gray-400 focus:border-brand-green"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-text-secondary font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs border border-border-light rounded-xl bg-white text-text-primary font-medium focus:border-brand-green"
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-border-light rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-light border-b border-border-light">
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Full Name</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">CNIC</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">WhatsApp</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Selected Courses</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-bg-light transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-text-primary">
                    <div>
                      <span>{app.fullName}</span>
                      <span className="text-[10px] text-text-secondary block font-normal">{app.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-text-secondary">{app.cnic}</td>
                  <td className="px-6 py-4 text-xs text-text-secondary">{app.whatsapp}</td>
                  <td className="px-6 py-4 text-xs text-text-primary">
                    {app.selectedCourses.join(", ")}
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      app.status === "approved"
                        ? "bg-green-50 text-green-600 border border-green-200"
                        : app.status === "rejected"
                        ? "bg-red-50 text-red-600 border border-red-200"
                        : "bg-amber-50 text-amber-600 border border-amber-200"
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-right">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="btn-signup text-xs px-3 py-1.5"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-sm text-text-secondary">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Review Application Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md overflow-y-auto py-10 select-none animate-fade-in">
          <div className="bg-slate-900 border border-slate-700/60 rounded-3xl p-6 sm:p-8 w-full max-w-2xl mx-4 shadow-2xl max-h-[85vh] overflow-y-auto text-white space-y-6 animate-scale-up relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-600" />
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  Application Review
                </span>
                <h2 className="font-heading font-extrabold text-white text-lg mt-1">Review Student Admission</h2>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-800 space-y-2.5">
                <h3 className="font-bold text-[11px] uppercase text-slate-400 tracking-wider font-mono">Personal Information</h3>
                <p><strong className="text-slate-300">Name:</strong> <span className="text-white font-medium">{selectedApp.fullName}</span></p>
                <p><strong className="text-slate-300">CNIC:</strong> <span className="text-amber-300 font-mono">{selectedApp.cnic}</span></p>
                <p><strong className="text-slate-300">Email:</strong> <span className="text-slate-200">{selectedApp.email}</span></p>
                <p><strong className="text-slate-300">WhatsApp:</strong> <span className="text-slate-200 font-mono">{selectedApp.whatsapp}</span></p>
                <p><strong className="text-slate-300">Selected Courses:</strong> <span className="text-emerald-400 font-bold">{selectedApp.selectedCourses.join(", ")}</span></p>
                <p><strong className="text-slate-300">Total Paid:</strong> <span className="text-emerald-400 font-mono font-bold">PKR {selectedApp.totalAmount.toLocaleString()}</span></p>
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-800 space-y-3">
                <h3 className="font-bold text-[11px] uppercase text-slate-400 tracking-wider font-mono">Attached Documents</h3>
                <div className="flex flex-col gap-2.5">
                  {selectedApp.paymentProof ? (
                    <a href={getMediaUrl(selectedApp.paymentProof)} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl flex items-center gap-2 transition-colors">
                      <span>📄 View Payment Proof Receipt</span>
                    </a>
                  ) : (
                    <span className="text-slate-500 italic">No receipt attached</span>
                  )}
                  {selectedApp.cnicFile ? (
                    <a href={getMediaUrl(selectedApp.cnicFile)} target="_blank" rel="noopener noreferrer" className="text-xs text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-xl flex items-center gap-2 transition-colors">
                      <span>🆔 View CNIC Copy</span>
                    </a>
                  ) : (
                    <span className="text-slate-500 italic">No CNIC copy attached</span>
                  )}
                  {selectedApp.photoFile ? (
                    <a href={getMediaUrl(selectedApp.photoFile)} target="_blank" rel="noopener noreferrer" className="text-xs text-sky-400 hover:text-sky-300 bg-sky-500/10 border border-sky-500/20 px-3 py-2 rounded-xl flex items-center gap-2 transition-colors">
                      <span>🖼️ View Photo</span>
                    </a>
                  ) : (
                    <span className="text-slate-500 italic">No photo attached</span>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-5 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">Remarks / Admin Reason</label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  rows={3}
                  placeholder="Add optional notes or reason for rejection/approval"
                />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={() => handleUpdateStatus("rejected")}
                  className="px-5 py-2.5 text-xs font-bold bg-rose-600/90 hover:bg-rose-600 text-white rounded-xl shadow-md transition-all cursor-pointer border border-rose-500/30"
                >
                  Reject Application
                </button>
                <button
                  onClick={() => handleUpdateStatus("approved")}
                  className="px-6 py-2.5 text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl shadow-md shadow-emerald-950 transition-all cursor-pointer border border-emerald-500/40"
                >
                  Approve & Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {actionLoading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/75 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700/60 rounded-3xl p-6 flex flex-col items-center space-y-4 shadow-2xl text-white">
            <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">Processing Request...</p>
          </div>
        </div>
      )}

      {toast && (
        <div className={`fixed bottom-6 right-6 z-[99999] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border animate-scale-up max-w-md ${
          toast.type === "success"
            ? "bg-slate-900 border-emerald-500/40 text-emerald-300 shadow-emerald-950/50"
            : "bg-slate-900 border-rose-500/40 text-rose-300 shadow-rose-950/50"
        }`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
            toast.type === "success" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
          }`}>
            {toast.type === "success" ? "✓" : "!"}
          </div>
          <p className="text-xs font-semibold leading-normal font-sans text-white">{toast.message}</p>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white text-sm ml-2 font-bold cursor-pointer">✕</button>
        </div>
      )}
    </div>
  );
}
