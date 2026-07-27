'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { useModal } from '@/lib/ModalContext';
import {
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  ShieldCheck,
  Building2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Lock,
} from 'lucide-react';

export default function AdmissionPage() {
  const { user } = useAuth();
  const { showAlert } = useModal();

  const [selectedBatchId, setSelectedBatchId] = useState<string>('');

  // Form State
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [cnic, setCnic] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender] = useState('male');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [postalAddress, setPostalAddress] = useState('');
  const [province, setProvince] = useState('Punjab');
  const [city, setCity] = useState('');
  const [lastQualification, setLastQualification] = useState('B.Com / M.Com');
  const [passingYear] = useState('2024');
  const [institute] = useState('University of the Punjab');

  const [emergencyName] = useState('Family Contact');
  const [emergencyRelation] = useState('Guardian');
  const [emergencyContact] = useState('0300-0000000');

  // Single course selection
  const [selectedCourse, setSelectedCourse] = useState<string>(
    'Certified Income Tax & Sales Tax Practitioner Masterclass'
  );
  const [paymentMethod] = useState('Meezan Bank Transfer');
  const [transactionId, setTransactionId] = useState('');

  // Files Upload filenames
  const [cnicFile] = useState('cnic_submitted.pdf');
  const [photoFile] = useState('portrait_submitted.jpg');
  const [paymentProof, setPaymentProof] = useState('');

  // Validation Error States
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Loading / Feedback status
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Enrollment status checks
  const [hasActiveEnrollment, setHasActiveEnrollment] = useState(false);
  const [activeCourseName, setActiveCourseName] = useState('');
  const [checkingStatus, setCheckingStatus] = useState(true);

  // Auto-format Pakistani CNIC (xxxxx-xxxxxxx-x)
  const formatCNIC = (value: string) => {
    const raw = value.replace(/\D/g, '').slice(0, 13);
    let formatted = raw;
    if (raw.length > 5 && raw.length <= 12) {
      formatted = `${raw.slice(0, 5)}-${raw.slice(5)}`;
    } else if (raw.length > 12) {
      formatted = `${raw.slice(0, 5)}-${raw.slice(5, 12)}-${raw.slice(12)}`;
    }
    return formatted;
  };

  // Auto-format Pakistani Mobile Number (03xx-xxxxxxx)
  const formatPhone = (value: string) => {
    const raw = value.replace(/\D/g, '').slice(0, 11);
    let formatted = raw;
    if (raw.length > 4) {
      formatted = `${raw.slice(0, 4)}-${raw.slice(4)}`;
    }
    return formatted;
  };

  // Handle CNIC Change with auto-hyphen
  const handleCnicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNIC(e.target.value);
    setCnic(formatted);
    if (errors.cnic) {
      setErrors((prev) => ({ ...prev, cnic: '' }));
    }
  };

  // Handle Phone Change with auto-hyphen
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setWhatsapp(formatted);
    if (errors.whatsapp) {
      setErrors((prev) => ({ ...prev, whatsapp: '' }));
    }
  };

  // Pre-fill user info if logged in
  useEffect(() => {
    if (user) {
      setFullName(user.name);
      setEmail(user.email);

      if (user.enrolledCourses && user.enrolledCourses.length > 0) {
        setHasActiveEnrollment(true);
        setActiveCourseName(user.enrolledCourses[0]);
      }
    }
    setCheckingStatus(false);
  }, [user]);

  useEffect(() => {
    api
      .get('/batches/public')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setSelectedBatchId(res.data[0].id);
        }
      })
      .catch(() => {});
  }, []);

  // Total Fee
  const totalAmount = 30000;

  // Validate form before submission
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters.';
    }

    if (!fatherName.trim() || fatherName.trim().length < 3) {
      newErrors.fatherName = "Father's Name is required.";
    }

    // CNIC format validation: 37405-1234567-1 (exactly 13 digits)
    const cnicClean = cnic.replace(/\D/g, '');
    if (cnicClean.length !== 13) {
      newErrors.cnic = 'CNIC must be a valid 13-digit Pakistani CNIC (e.g. 37405-1234567-1).';
    }

    // Phone format validation: 03xx-xxxxxxx (exactly 11 digits starting with 03)
    const phoneClean = whatsapp.replace(/\D/g, '');
    if (phoneClean.length !== 11 || !phoneClean.startsWith('03')) {
      newErrors.whatsapp = 'Mobile number must be a valid 11-digit Pakistani number (e.g. 0300-1234567).';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required.';
    }

    if (!postalAddress.trim()) {
      newErrors.postalAddress = 'Postal address is required.';
    }

    if (!city.trim()) {
      newErrors.city = 'City name is required.';
    }

    if (!selectedCourse) {
      newErrors.course = 'Please select a course to enroll in.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // File Upload Helper
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setter(res.data.filename);
      showAlert('File Uploaded', `${file.name} attached successfully.`);
    } catch {
      setter(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!validateForm()) {
      setErrorMsg('Please resolve all validation errors in the form before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/admissions', {
        fullName,
        fatherName,
        cnic,
        dateOfBirth,
        gender,
        whatsapp,
        email,
        postalAddress: `${postalAddress}, ${city}, ${province}`,
        lastQualification,
        passingYear,
        institute,
        emergencyName,
        emergencyRelation,
        emergencyContact,
        cnicFile: cnicFile || 'cnic_submitted.pdf',
        photoFile: photoFile || 'passport_photo.jpg',
        paymentProof: paymentProof || transactionId || 'receipt_submitted.png',
        selectedCourses: [selectedCourse],
        totalAmount,
        paymentMethod,
        batchId: selectedBatchId || undefined,
      });

      setSuccessMsg(
        'Your online admission application has been received! Our admissions department will review your application. Upon admin approval, your student portal login credentials and system-generated password will be emailed directly to ' + email
      );
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.message ||
          'Failed to submit application. Please check your information and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (checkingStatus) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </main>
    );
  }

  // Block if student already has active enrollment
  if (hasActiveEnrollment) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white border border-border rounded-3xl p-8 sm:p-12 max-w-md w-full text-center shadow-card space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-heading font-extrabold text-heading">Already Enrolled</h2>
            <p className="text-sm text-body leading-relaxed">
              You are currently enrolled in <strong className="text-primary">{activeCourseName}</strong> on the Premier LMS Student Mobile App.
            </p>
          </div>
          <Link href="/dashboard" className="btn-primary w-full justify-center text-xs">
            Go to Student Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* ── Standalone Top Branding Header ───────────────── */}
      <header className="bg-slate-900 border-b border-slate-800 py-4 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-heading font-extrabold text-white tracking-tight">
                Premier<span className="text-primary-400">LMS</span>
              </span>
              <span className="text-[10px] block text-slate-400 font-mono">
                Raja Gulfam Tax &amp; Legal Academy
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-heading font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-4 py-2 rounded-xl transition-colors border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* ── Form Container ───────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="text-center space-y-3 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-50 text-primary text-xs font-heading font-bold uppercase tracking-wider border border-primary-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official Student Admission Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-heading tracking-tight">
            Online Admission Application Form
          </h1>
          <p className="text-body text-sm max-w-xl mx-auto">
            Complete your registration for accredited practitioner masterclasses instructed directly by Advocate High Court &amp; ACMA Raja Gulfam.
          </p>
        </div>

        {successMsg ? (
          <div className="bg-white border border-emerald-200 rounded-3xl p-8 sm:p-12 text-center shadow-card space-y-6 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-extrabold text-heading">Application Submitted!</h2>
              <p className="text-sm text-body leading-relaxed">{successMsg}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 text-left space-y-1">
              <div><strong>Applicant:</strong> {fullName}</div>
              <div><strong>CNIC:</strong> {cnic}</div>
              <div><strong>WhatsApp:</strong> {whatsapp}</div>
              <div><strong>Course:</strong> {selectedCourse}</div>
              <div><strong>Status:</strong> Pending Fee Verification</div>
            </div>
            <Link
              href={user ? '/dashboard' : '/auth/login'}
              className="btn-primary w-full justify-center text-xs font-heading font-bold !py-3"
            >
              {user ? 'Go to Student Dashboard' : 'Proceed to Student Login'}
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-border rounded-3xl p-6 sm:p-10 shadow-card space-y-8"
          >
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl p-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* ── Section 1: Personal Profile ───────────────── */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <div className="w-8 h-8 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-heading font-bold text-xs">
                  1
                </div>
                <div>
                  <h2 className="text-base font-heading font-bold text-heading">
                    Personal Information
                  </h2>
                  <p className="text-[11px] text-body">Required for FBR &amp; SECP diploma registration</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                    Full Name (As per CNIC) *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                      }}
                      placeholder="e.g. Muhammad Ali Khan"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-heading focus:outline-none ${
                        errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-primary'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                    Father's / Guardian's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fatherName}
                    onChange={(e) => {
                      setFatherName(e.target.value);
                      if (errors.fatherName) setErrors((prev) => ({ ...prev, fatherName: '' }));
                    }}
                    placeholder="e.g. Tariq Mehmood Khan"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs text-heading focus:outline-none ${
                      errors.fatherName ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-primary'
                    }`}
                  />
                  {errors.fatherName && <p className="text-[11px] text-red-500 mt-1">{errors.fatherName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                    Pakistani CNIC Number * (13 Digits)
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      maxLength={15}
                      value={cnic}
                      onChange={handleCnicChange}
                      placeholder="37405-1234567-1"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-mono text-heading focus:outline-none ${
                        errors.cnic ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-primary'
                      }`}
                    />
                  </div>
                  {errors.cnic ? (
                    <p className="text-[11px] text-red-500 mt-1">{errors.cnic}</p>
                  ) : (
                    <p className="text-[10px] text-slate-400 mt-1">Format: 13 digits (Auto-hyphenated)</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                    Date of Birth *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      required
                      value={dateOfBirth}
                      onChange={(e) => {
                        setDateOfBirth(e.target.value);
                        if (errors.dateOfBirth) setErrors((prev) => ({ ...prev, dateOfBirth: '' }));
                      }}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-heading focus:outline-none ${
                        errors.dateOfBirth ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-primary'
                      }`}
                    />
                  </div>
                  {errors.dateOfBirth && <p className="text-[11px] text-red-500 mt-1">{errors.dateOfBirth}</p>}
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                    Pakistani Mobile / WhatsApp Contact *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      maxLength={12}
                      value={whatsapp}
                      onChange={handlePhoneChange}
                      placeholder="0300-1234567"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-mono text-heading focus:outline-none ${
                        errors.whatsapp ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-primary'
                      }`}
                    />
                  </div>
                  {errors.whatsapp ? (
                    <p className="text-[11px] text-red-500 mt-1">{errors.whatsapp}</p>
                  ) : (
                    <p className="text-[10px] text-slate-400 mt-1">11 digits starting with 03</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      placeholder="name@domain.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-heading focus:outline-none ${
                        errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-primary'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* ── Section 2: Education & Address ───────────── */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <div className="w-8 h-8 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-heading font-bold text-xs">
                  2
                </div>
                <div>
                  <h2 className="text-base font-heading font-bold text-heading">
                    Education &amp; Postal Address
                  </h2>
                  <p className="text-[11px] text-body">Where to dispatch physical certificate &amp; course manual</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                    Qualification / Background *
                  </label>
                  <select
                    value={lastQualification}
                    onChange={(e) => setLastQualification(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-heading focus:outline-none focus:border-primary bg-white"
                  >
                    <option value="LL.B / LL.M (Advocate High Court / Subordinate Bar)">LL.B / LL.M (Advocate)</option>
                    <option value="ITP (Income Tax Practitioner / Tax Bar)">ITP (Income Tax Practitioner)</option>
                    <option value="CA / ACMA / ACCA / FCMA">CA / ACMA / ACCA / FCMA</option>
                    <option value="B.Com / M.Com / BS Accounting & Finance">B.Com / M.Com / BS Accounting</option>
                    <option value="BBA / MBA Finance">BBA / MBA Finance</option>
                    <option value="Business Owner / Entrepreneur">Business Owner / Entrepreneur</option>
                    <option value="Other Student / Graduate">Other Student / Graduate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                    City Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
                    }}
                    placeholder="e.g. Lahore, Karachi, Islamabad"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs text-heading focus:outline-none ${
                      errors.city ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-primary'
                    }`}
                  />
                  {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                    Province *
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-heading focus:outline-none focus:border-primary bg-white"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
                    <option value="Azad Jammu & Kashmir">Azad Jammu &amp; Kashmir</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                    Complete Postal Address *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={postalAddress}
                      onChange={(e) => {
                        setPostalAddress(e.target.value);
                        if (errors.postalAddress) setErrors((prev) => ({ ...prev, postalAddress: '' }));
                      }}
                      placeholder="House/Office No., Street, Sector/Area"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-heading focus:outline-none ${
                        errors.postalAddress ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-primary'
                      }`}
                    />
                  </div>
                  {errors.postalAddress && <p className="text-[11px] text-red-500 mt-1">{errors.postalAddress}</p>}
                </div>
              </div>
            </div>

            {/* ── Section 3: Course Selection & Fee Payment ──── */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <div className="w-8 h-8 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-heading font-bold text-xs">
                  3
                </div>
                <div>
                  <h2 className="text-base font-heading font-bold text-heading">
                    Course Selection &amp; Fee Payment
                  </h2>
                  <p className="text-[11px] text-body">Select your course and submit fee transaction receipt</p>
                </div>
              </div>

              {/* Course Selection Radio Cards */}
              <div className="space-y-3">
                <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                  Select Target Masterclass *
                </label>

                <div className="grid gap-3">
                  <div
                    onClick={() => setSelectedCourse('Certified Income Tax & Sales Tax Practitioner Masterclass')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedCourse.includes('Income Tax')
                        ? 'border-primary bg-primary-50/40 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedCourse.includes('Income Tax') ? 'border-primary bg-primary text-white' : 'border-slate-300'}`}>
                        {selectedCourse.includes('Income Tax') && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <h4 className="text-xs font-heading font-bold text-heading">
                          Certified Income Tax &amp; Sales Tax Practitioner Masterclass
                        </h4>
                        <p className="text-[11px] text-body">12 Weeks (90+ Hours) · Instructor: Advocate Raja Gulfam</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-slate-400 line-through block">PKR 50,000</span>
                      <span className="text-sm font-mono font-extrabold text-heading">PKR 30,000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Transfer Details Box */}
              <div className="rounded-2xl bg-slate-900 text-white p-6 space-y-3 border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-heading font-bold text-amber-300 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    Official Academy Bank Account Details
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">Total Fee: PKR 30,000</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Bank Name</span>
                    <strong className="text-white">Meezan Bank Limited</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Account Title</span>
                    <strong className="text-white">Raja Gulfam Tax &amp; Legal Academy</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Account Number</span>
                    <strong className="text-white">0102030405060708</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">IBAN</span>
                    <strong className="text-white">PK92MEZN0001020304050607</strong>
                  </div>
                </div>
              </div>

              {/* Transaction ID & Receipts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                    Bank Transaction / TRX ID
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g. TRX-98432176 or ATM Receipt No."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-heading focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                    Upload Payment Receipt / Deposit Slip
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(e, setPaymentProof)}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-heading file:font-bold file:bg-primary-50 file:text-primary hover:file:bg-primary-100"
                  />
                  {paymentProof && (
                    <span className="text-[10px] text-emerald-600 font-mono mt-1 block">
                      ✓ Attached: {paymentProof}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>SSL Encrypted &amp; Verified Admission Gateway</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary !py-3.5 !px-8 text-xs font-heading font-bold w-full sm:w-auto justify-center"
              >
                {submitting ? 'Submitting Application...' : 'Submit Online Admission Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
