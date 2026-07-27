"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { useModal } from "@/lib/ModalContext";

import Pagination from "@/components/ui/Pagination";

interface Course {
  id: string;
  name: string;
  category?: string;
  originalFee: number;
  discountedFee: number;
  isActive: boolean;
}

export default function AdminCoursesPage() {
  const { showAlert } = useModal();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "Tax & Accounting",
    originalFee: 50000,
    discountedFee: 30000,
    level: "Intermediate",
    duration: 36,
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=340&fit=crop",
    description: "Learn practical tax filing, corporate compliance, and legal frameworks.",
  });

  const fetchCourses = async (page = currentPage, search = searchTerm) => {
    setLoading(true);
    try {
      const res = await api.get("/courses/all", {
        params: { page, limit: 10, search },
      });
      if (res.data?.data) {
        setCourses(res.data.data);
        setTotalPages(res.data.meta.totalPages);
        setTotalItems(res.data.meta.total);
      } else {
        setCourses(res.data || []);
      }
    } catch (err) {
      console.error("Failed to load courses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleCreate = async () => {
    if (!form.name.trim()) {
      showAlert("Alert", "Course Name is required.");
      return;
    }
    setActionLoading(true);
    try {
      await api.post("/courses", form);
      setShowModal(false);
      setForm({
        name: "",
        category: "Tax & Accounting",
        originalFee: 50000,
        discountedFee: 30000,
        level: "Intermediate",
        duration: 36,
        thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=340&fit=crop",
        description: "Learn practical tax filing, corporate compliance, and legal frameworks.",
      });
      showAlert("Success", "Course created successfully! You can now configure curriculum and details.");
      await fetchCourses();
    } catch (err: any) {
      showAlert("Error", err.response?.data?.message || "Failed to create course");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleActive = async (id: string) => {
    setActionLoading(true);
    try {
      await api.patch(`/courses/${id}`);
      await fetchCourses();
    } catch {
      showAlert("Error", "Failed to toggle course status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to deactivate/delete this course?")) return;
    setActionLoading(true);
    try {
      await api.delete(`/courses/${id}`);
      showAlert("Success", "Course deactivated successfully");
      await fetchCourses();
    } catch {
      showAlert("Error", "Failed to delete course");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-brand-green/30 border-t-brand-green rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Courses Management</h1>
          <p className="text-xs text-text-secondary mt-1">Manage dynamic academy masterclasses, fees, curriculum, and instructors</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 text-xs border border-border-light rounded-lg bg-white text-text-primary focus:outline-none focus:ring-1 focus:ring-brand-green"
          />
          <button onClick={() => setShowModal(true)} className="btn-signup text-xs px-4 py-2 shrink-0">
            + Add New Course
          </button>
        </div>
      </div>

      <div className="bg-white border border-border-light rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-light border-b border-border-light">
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Course Name</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Original Fee</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Discounted Fee</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-bg-light transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-text-primary">{course.name}</td>
                  <td className="px-6 py-4 text-xs text-text-secondary">{course.category || "Tax & Legal"}</td>
                  <td className="px-6 py-4 text-xs font-mono text-text-secondary">PKR {course.originalFee.toLocaleString()}</td>
                  <td className="px-6 py-4 text-xs font-mono text-brand-green font-bold">
                    {course.discountedFee === 0 ? "FREE" : `PKR ${course.discountedFee.toLocaleString()}`}
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      course.isActive ? "bg-green-50 text-green-600 border border-green-200" : "bg-gray-100 text-text-secondary border border-gray-200"
                    }`}>
                      {course.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/courses/${course.id}`} className="btn-signup text-[10px] px-3 py-1.5 bg-brand-green text-white hover:bg-brand-green-dark no-underline inline-block">
                        Edit &amp; Curriculum
                      </Link>
                      <button onClick={() => handleToggleActive(course.id)} className="px-3 py-1.5 text-[10px] font-bold bg-white border border-border-light text-text-primary hover:bg-bg-light rounded-lg">
                        {course.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button onClick={() => handleDelete(course.id)} className="px-2.5 py-1.5 text-[10px] font-bold bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-lg">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-sm text-text-secondary">
                    No courses found. Click &quot;+ Add New Course&quot; to create one.
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

      {/* Add Course Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white border border-border-light rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border-light pb-3">
              <div>
                <h2 className="font-bold text-text-primary text-base">Add New Masterclass Course</h2>
                <p className="text-xs text-text-secondary">Create a new course entry to build curriculum &amp; pricing</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-text-secondary hover:text-text-primary text-xl font-bold">×</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5">Course Name *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2 text-sm border border-border-light rounded-lg bg-white text-text-primary" placeholder="e.g. Certified Corporate Expert (CCE)" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5">Category</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2 text-sm border border-border-light rounded-lg bg-white text-text-primary" placeholder="e.g. Corporate Law" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5">Level</label>
                  <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="w-full px-4 py-2 text-sm border border-border-light rounded-lg bg-white text-text-primary">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5">Original Fee (PKR)</label>
                  <input type="number" value={form.originalFee} onChange={(e) => setForm({ ...form, originalFee: Number(e.target.value) })} className="w-full px-4 py-2 text-sm border border-border-light rounded-lg bg-white text-text-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5">Discounted Fee (PKR)</label>
                  <input type="number" value={form.discountedFee} onChange={(e) => setForm({ ...form, discountedFee: Number(e.target.value) })} className="w-full px-4 py-2 text-sm border border-border-light rounded-lg bg-white text-text-primary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5">Duration (Hours)</label>
                  <input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })} className="w-full px-4 py-2 text-sm border border-border-light rounded-lg bg-white text-text-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5">Thumbnail Image URL</label>
                  <input value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} className="w-full px-4 py-2 text-sm border border-border-light rounded-lg bg-white text-text-primary" placeholder="https://..." />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase mb-1.5">Short Overview</label>
                <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 text-sm border border-border-light rounded-lg bg-white text-text-primary" placeholder="Short course description..." />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-xs font-bold text-text-secondary border border-border-light rounded-lg hover:bg-bg-light">Cancel</button>
                <button onClick={handleCreate} className="btn-signup py-2.5 px-6 text-xs">Create Course Record</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {actionLoading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/25 backdrop-blur-[2px]">
          <div className="bg-white border border-border-light rounded-2xl p-6 flex flex-col items-center space-y-4 shadow-2xl">
            <div className="w-10 h-10 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin" />
            <p className="text-xs font-bold text-text-primary uppercase tracking-wider">Processing Request...</p>
          </div>
        </div>
      )}
    </div>
  );
}
