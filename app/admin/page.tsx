"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import api from "@/lib/api";

// ── Helpers ──────────────────────────────────────────────────────────

function AnimatedNumber({ value, duration = 800 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (value === 0) { setDisplay(0); return; }
    let start = 0;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(start);
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <>{display}</>;
}

// ── SVG Donut Chart ──────────────────────────────────────────────────

function DonutChart({ segments, size = 180 }: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <svg width={size} height={size} viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="70" fill="none" stroke="#f1f5f9" strokeWidth="20" />
          <text x="90" y="85" textAnchor="middle" className="fill-gray-400" fontSize="13" fontWeight="600">No Data</text>
          <text x="90" y="105" textAnchor="middle" className="fill-gray-300" fontSize="11">Yet</text>
        </svg>
      </div>
    );
  }

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox="0 0 180 180" className="drop-shadow-sm">
        {segments.map((seg, i) => {
          const pct = seg.value / total;
          const dashLen = pct * circumference;
          const dashOffset = -offset * circumference / total * (total / 1);
          const currentOffset = offset;
          offset += seg.value;
          const strokeDashoffset = -(currentOffset / total) * circumference;
          return (
            <circle
              key={i}
              cx="90" cy="90" r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="22"
              strokeDasharray={`${dashLen} ${circumference - dashLen}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
              transform="rotate(-90 90 90)"
              style={{ transition: "stroke-dasharray 0.8s ease, stroke-dashoffset 0.8s ease" }}
            />
          );
        })}
        <text x="90" y="82" textAnchor="middle" className="fill-gray-900" fontSize="28" fontWeight="800">{total}</text>
        <text x="90" y="102" textAnchor="middle" className="fill-gray-400" fontSize="11" fontWeight="500">Total</text>
      </svg>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="text-xs text-gray-500 font-medium">{seg.label}</span>
            <span className="text-xs font-bold text-gray-800">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SVG Bar Chart ────────────────────────────────────────────────────

function BarChart({ data, maxBarHeight = 120 }: {
  data: { label: string; value: number; subLabel?: string }[];
  maxBarHeight?: number;
}) {
  const maxVal = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex items-end justify-between gap-3 px-2" style={{ minHeight: maxBarHeight + 40 }}>
      {data.map((d, i) => {
        const barH = (d.value / maxVal) * maxBarHeight;
        return (
          <div key={i} className="flex flex-col items-center gap-1.5 flex-1 group">
            <span className="text-[11px] font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
              {d.value}
            </span>
            <div
              className="w-full max-w-[44px] rounded-t-lg transition-all duration-500 ease-out relative overflow-hidden"
              style={{
                height: Math.max(barH, 4),
                background: d.value > 0
                  ? "linear-gradient(180deg, #166534 0%, #22c55e 100%)"
                  : "#f1f5f9",
              }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-center">
              <span className="text-[11px] font-bold text-gray-700 block">{d.label}</span>
              {d.subLabel && (
                <span className="text-[9px] text-gray-400 block">{d.subLabel}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Dashboard ───────────────────────────────────────────────────

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  // Stats
  const [admissionStats, setAdmissionStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [studentCount, setStudentCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [upcomingClasses, setUpcomingClasses] = useState(0);

  // Chart data
  const [batchesHierarchy, setBatchesHierarchy] = useState<any[]>([]);
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [coursesList, setCoursesList] = useState<any[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [statsRes, studentsRes, coursesRes, classesRes, hierarchyRes, appsRes] =
          await Promise.allSettled([
            api.get("/admissions/stats"),
            api.get("/users/count/students"),
            api.get("/courses/all"),
            api.get("/classes/count/upcoming"),
            api.get("/classes/dashboard/hierarchy"),
            api.get("/admissions?limit=5"),
          ]);

        // Admission stats
        if (statsRes.status === "fulfilled") {
          setAdmissionStats(statsRes.value.data);
        }

        // Student count (returns raw number)
        if (studentsRes.status === "fulfilled") {
          const val = studentsRes.value.data;
          setStudentCount(typeof val === "number" ? val : val?.count || 0);
        }

        // Course count (paginated response)
        if (coursesRes.status === "fulfilled") {
          const d = coursesRes.value.data;
          const arr = Array.isArray(d) ? d : d?.data || [];
          setCourseCount(d?.meta?.total || arr.length);
          setCoursesList(arr);
        }

        // Upcoming classes (returns raw number)
        if (classesRes.status === "fulfilled") {
          const val = classesRes.value.data;
          setUpcomingClasses(typeof val === "number" ? val : val?.count || 0);
        }

        // Hierarchy for batch cards + weekly chart
        if (hierarchyRes.status === "fulfilled") {
          setBatchesHierarchy(hierarchyRes.value.data || []);
        }

        // Recent applications (paginated)
        if (appsRes.status === "fulfilled") {
          const d = appsRes.value.data;
          const arr = Array.isArray(d) ? d : d?.data || [];
          setRecentApplications(arr.slice(0, 5));
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  // ── Derived chart data ──────────────────────────────────────────────

  const admissionDonutSegments = useMemo(() => [
    { label: "Pending", value: admissionStats.pending, color: "#f59e0b" },
    { label: "Approved", value: admissionStats.approved, color: "#22c55e" },
    { label: "Rejected", value: admissionStats.rejected, color: "#ef4444" },
  ], [admissionStats]);

  const weeklyClassesData = useMemo(() => {
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today);
    monday.setDate(diff);
    monday.setHours(0, 0, 0, 0);

    const counts = Array(7).fill(0);
    const dates: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      dates.push(d.toISOString().split("T")[0]);
    }

    batchesHierarchy.forEach((batch: any) => {
      batch.courses?.forEach((course: any) => {
        course.classes?.forEach((cls: any) => {
          const clsDate = new Date(cls.scheduledStart).toISOString().split("T")[0];
          const idx = dates.indexOf(clsDate);
          if (idx >= 0) counts[idx]++;
        });
      });
    });

    return dayNames.map((name, i) => ({
      label: name,
      value: counts[i],
      subLabel: new Date(dates[i]).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    }));
  }, [batchesHierarchy]);

  const activeBatches = useMemo(() =>
    batchesHierarchy.filter(b => b.isActive && new Date(b.endDate) >= new Date()),
    [batchesHierarchy]
  );

  // ── Stat cards config ───────────────────────────────────────────────

  const statCards = [
    {
      label: "Total Applications",
      value: admissionStats.total,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
      href: "/admin/applications",
    },
    {
      label: "Active Students",
      value: studentCount,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "from-emerald-500 to-emerald-600",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600",
      href: "/admin/students",
    },
    {
      label: "Total Courses",
      value: courseCount,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "from-violet-500 to-violet-600",
      bgLight: "bg-violet-50",
      textColor: "text-violet-600",
      href: "/admin/courses",
    },
    {
      label: "Upcoming Classes",
      value: upcomingClasses,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      color: "from-amber-500 to-amber-600",
      bgLight: "bg-amber-50",
      textColor: "text-amber-600",
      href: "/admin/classes",
    },
  ];

  // ── Render ──────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-brand-green/30 border-t-brand-green rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-xs text-text-secondary mt-1">Academy overview and statistics</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
          <span className="text-[10px] text-text-secondary font-medium">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group bg-white border border-border-light rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 no-underline block"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${card.bgLight} flex items-center justify-center ${card.textColor} group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-1">{card.label}</p>
            <p className="text-3xl font-extrabold text-text-primary">
              <AnimatedNumber value={card.value} />
            </p>
          </Link>
        ))}
      </div>

      {/* ── Charts Row ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Status Donut */}
        <div className="bg-white border border-border-light rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold text-text-primary">Application Status</h2>
              <p className="text-[10px] text-text-secondary mt-0.5">Breakdown of all admission applications</p>
            </div>
            <Link
              href="/admin/applications"
              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 hover:underline no-underline transition-colors"
            >
              View All →
            </Link>
          </div>
          <DonutChart segments={admissionDonutSegments} />
        </div>

        {/* Weekly Classes Bar Chart */}
        <div className="bg-white border border-border-light rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold text-text-primary">This Week&apos;s Classes</h2>
              <p className="text-[10px] text-text-secondary mt-0.5">Scheduled classes per day this week</p>
            </div>
            <Link
              href="/admin/classes"
              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 hover:underline no-underline transition-colors"
            >
              Manage →
            </Link>
          </div>
          <BarChart data={weeklyClassesData} />
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
            <span className="text-[10px] text-text-secondary font-medium">
              Total this week: <strong className="text-text-primary">{weeklyClassesData.reduce((s, d) => s + d.value, 0)}</strong> classes
            </span>
            <span className="text-[10px] text-text-secondary font-medium">
              Avg: <strong className="text-text-primary">{(weeklyClassesData.reduce((s, d) => s + d.value, 0) / 7).toFixed(1)}</strong>/day
            </span>
          </div>
        </div>
      </div>

      {/* ── Active Batches ─────────────────────────────────────────── */}
      <div className="bg-white border border-border-light rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-sm font-bold text-text-primary">Active Batches</h2>
            <p className="text-[10px] text-text-secondary mt-0.5">Currently running batches with enrollment progress</p>
          </div>
          <Link
            href="/admin/batches"
            className="text-[10px] font-bold text-blue-600 hover:text-blue-800 hover:underline no-underline transition-colors"
          >
            Manage Batches →
          </Link>
        </div>

        {activeBatches.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 border border-gray-100 rounded-xl">
            <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-gray-400 font-medium">No active batches right now</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeBatches.map((batch: any) => {
              const totalClasses = batch.courses?.reduce((sum: number, c: any) => sum + (c.classes?.length || 0), 0) || 0;
              const startDate = new Date(batch.startDate);
              const endDate = new Date(batch.endDate);
              const now = new Date();
              const totalDuration = endDate.getTime() - startDate.getTime();
              const elapsed = now.getTime() - startDate.getTime();
              const progressPct = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);

              return (
                <div key={batch.id} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 hover:shadow-sm transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-text-primary truncate pr-2">{batch.name}</h3>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${
                      batch.status === "admission"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : batch.status === "classes"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-gray-100 text-gray-500 border border-gray-200"
                    }`}>
                      {batch.status === "admission" ? "Admission" : batch.status === "classes" ? "Classes" : batch.status}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] text-gray-400 font-medium">Progress</span>
                      <span className="text-[9px] font-bold text-gray-600">{Math.round(progressPct)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${progressPct}%`,
                          background: "linear-gradient(90deg, #166534, #22c55e)",
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center py-2 bg-gray-50 rounded-lg">
                      <span className="text-[9px] text-gray-400 block font-medium">Courses</span>
                      <span className="text-sm font-extrabold text-text-primary">{batch.courses?.length || 0}</span>
                    </div>
                    <div className="text-center py-2 bg-gray-50 rounded-lg">
                      <span className="text-[9px] text-gray-400 block font-medium">Classes</span>
                      <span className="text-sm font-extrabold text-text-primary">{totalClasses}</span>
                    </div>
                    <div className="text-center py-2 bg-gray-50 rounded-lg">
                      <span className="text-[9px] text-gray-400 block font-medium">Applicants</span>
                      <span className="text-sm font-extrabold text-text-primary">{batch.totalApplicants || 0}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-[9px] text-gray-400 font-medium">
                      {startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} — {endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Bottom Row: Recent Applications + Quick Actions ────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2 bg-white border border-border-light rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold text-text-primary">Recent Applications</h2>
              <p className="text-[10px] text-text-secondary mt-0.5">Latest admission submissions</p>
            </div>
            <Link
              href="/admin/applications"
              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 hover:underline no-underline transition-colors"
            >
              View All →
            </Link>
          </div>

          {recentApplications.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 border border-gray-100 rounded-xl">
              <p className="text-xs text-gray-400 font-medium">No applications yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Applicant</th>
                    <th className="pb-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Courses</th>
                    <th className="pb-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Date</th>
                    <th className="pb-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentApplications.map((app: any) => (
                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-gray-500">
                              {app.fullName?.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-text-primary m-0 leading-tight">{app.fullName}</p>
                            <p className="text-[10px] text-text-secondary m-0 leading-tight">{app.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-[10px] text-text-secondary font-medium">
                          {app.selectedCourses?.join(", ") || "—"}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-[10px] text-text-secondary font-medium">
                          {new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          app.status === "pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : app.status === "approved"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-red-50 text-red-600 border border-red-200"
                        }`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-border-light rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-text-primary mb-4">Quick Actions</h2>
          <div className="space-y-2.5">
            {[
              { label: "Schedule a Class", href: "/admin/classes", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
              { label: "Add New Course", href: "/admin/courses", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", color: "bg-violet-50 text-violet-600 border-violet-100" },
              { label: "Review Applications", href: "/admin/applications", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", color: "bg-amber-50 text-amber-600 border-amber-100" },
              { label: "Manage Batches", href: "/admin/batches", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "bg-blue-50 text-blue-600 border-blue-100" },
              { label: "View Students", href: "/admin/students", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", color: "bg-rose-50 text-rose-600 border-rose-100" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-sm no-underline ${action.color}`}
              >
                <svg className="w-4.5 h-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
                </svg>
                <span className="text-xs font-bold">{action.label}</span>
              </Link>
            ))}
          </div>

          {/* Course Distribution mini-stat */}
          {coursesList.length > 0 && (
            <div className="mt-5 pt-4 border-t border-gray-100">
              <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-3">Course Library</h3>
              <div className="space-y-2">
                {coursesList.slice(0, 4).map((course: any) => (
                  <div key={course.id} className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-text-primary truncate pr-3">{course.name}</span>
                    <span className="text-[10px] font-bold text-gray-400 shrink-0">
                      {course.modules?.length || 0} modules
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
