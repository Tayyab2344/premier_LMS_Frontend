"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useModal } from "@/lib/ModalContext";
import Pagination from "@/components/ui/Pagination";

interface Student {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  enrollments: {
    id: string;
    course: {
      name: string;
    };
  }[];
}

export default function AdminStudentsPage() {
  const { showAlert } = useModal();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Pagination & Search state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStudents = async (page = currentPage, search = searchTerm) => {
    setLoading(true);
    try {
      const res = await api.get("/users", {
        params: { role: "student", page, limit: 10, search },
      });
      if (res.data?.data) {
        setStudents(res.data.data);
        setTotalPages(res.data.meta.totalPages);
        setTotalItems(res.data.meta.total);
      } else {
        setStudents(res.data || []);
      }
    } catch (err) {
      console.error("Failed to load students list", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleToggleStatus = async (id: string) => {
    setActionLoading(true);
    try {
      await api.patch(`/users/${id}/toggle-active`);
      await fetchStudents();
    } catch {
      showAlert("Error", "Failed to toggle status");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading && students.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-brand-green/30 border-t-brand-green rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Enrolled Students</h1>
          <p className="text-xs text-text-secondary mt-1">Manage active students and their courses</p>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search student name or email..."
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
      </div>

      <div className="bg-white border border-border-light rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-light border-b border-border-light">
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Student Name</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Enrolled Courses</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-bg-light transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-text-primary">{student.name}</td>
                  <td className="px-6 py-4 text-xs text-text-secondary">{student.email}</td>
                  <td className="px-6 py-4 text-xs text-text-primary">
                    {student.enrollments?.map((e) => e.course?.name).filter(Boolean).join(", ") || "None"}
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      student.isActive ? "bg-green-50 text-green-600 border border-green-200" : "bg-gray-100 text-text-secondary"
                    }`}>
                      {student.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-right">
                    <button
                      onClick={() => handleToggleStatus(student.id)}
                      disabled={actionLoading}
                      className="btn-signup text-xs px-3 py-1.5"
                    >
                      Toggle Active
                    </button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-sm text-text-secondary">
                    No students found.
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
    </div>
  );
}
