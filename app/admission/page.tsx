'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { useModal } from '@/lib/ModalContext';
import {
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
  GraduationCap,
  Copy,
  Check,
  UploadCloud,
  Eye,
  Trash2,
  ChevronRight,
  BookOpen,
  Award,
  CreditCard,
  Smartphone,
  HelpCircle,
  Edit3,
  X
} from 'lucide-react';

export default function AdmissionPage() {
  const { user } = useAuth();
  const { showAlert } = useModal();

  // Multi-step State (1 to 5)
  const [step, setStep] = useState(1);

  const [coursesList, setCoursesList] = useState<{ id: string; name: string; discountedFee?: number }[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // Step 1: Personal Information
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [cnic, setCnic] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('Male');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');

  // Step 2: Academic Background & Address
  const [lastQualification, setLastQualification] = useState('');
  const [passingYear, setPassingYear] = useState('');
  const [institute, setInstitute] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('Punjab');
  const [postalAddress, setPostalAddress] = useState('');

  // Step 3: Emergency Contact
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState('Guardian');
  const [emergencyContact, setEmergencyContact] = useState('');

  // Step 4: Application Pathway (Course Enrollment vs. Test/Certification Only)
  const [applicationType, setApplicationType] = useState<'Course Enrollment' | 'Test / Certification Only'>('Course Enrollment');
  const [selectedCourse, setSelectedCourse] = useState<string>('Certified Tax Practitioner (CTP)');
  const classMode = 'Online Live Class (Premier LMS Student App & Portal)';

  // Test / Certification Only fields
  const [testReason, setTestReason] = useState('I already have sufficient knowledge of the subject');
  const [otherTestReason, setOtherTestReason] = useState('');
  const [previousTraining, setPreviousTraining] = useState('');
  const [professionalExperience, setProfessionalExperience] = useState('');
  const [assessmentMode, setAssessmentMode] = useState('Online Assessment');
  const [preferredAssessmentDate, setPreferredAssessmentDate] = useState('');

  // Payment Method & Details
  const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer' | 'EasyPaisa' | 'JazzCash'>('Bank Transfer');
  const [transactionId, setTransactionId] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Files Uploads
  const [cnicFile, setCnicFile] = useState('');
  const [cnicFileSize, setCnicFileSize] = useState('');
  const [photoFile, setPhotoFile] = useState('');
  const [photoFileSize, setPhotoFileSize] = useState('');
  const [paymentProof, setPaymentProof] = useState('');
  const [paymentProofSize, setPaymentProofSize] = useState('');
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  // Document Viewer Modal State
  const [viewingFile, setViewingFile] = useState<{ name: string; url: string } | null>(null);

  // Declarations & Final Confirmations
  const [courseDeclarationAgreed, setCourseDeclarationAgreed] = useState(true);
  const [testDeclarationAgreed, setTestDeclarationAgreed] = useState(true);
  const [finalConfirmationAgreed, setFinalConfirmationAgreed] = useState(false);

  // Validation Error States
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Loading / Feedback status
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ referenceId: string; msg: string } | null>(null);
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

  // Handle CNIC Change
  const handleCnicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNIC(e.target.value);
    setCnic(formatted);
    if (errors.cnic) setErrors((prev) => ({ ...prev, cnic: '' }));
  };

  // Handle Phone Change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setWhatsapp(formatted);
    if (errors.whatsapp) setErrors((prev) => ({ ...prev, whatsapp: '' }));
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

  // Load available courses
  useEffect(() => {
    api
      .get('/courses')
      .then((res) => {
        const fetched = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        if (fetched && fetched.length > 0) {
          setCoursesList(fetched);
          setSelectedCourse((prev) => {
            if (fetched.some((c: any) => c.name === prev)) return prev;
            return fetched[0].name;
          });
        }
      })
      .catch((err) => {
        console.error('Failed to load active courses:', err);
      })
      .finally(() => {
        setLoadingCourses(false);
      });
  }, []);

  // Unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (fullName || cnic || whatsapp || email) {
        e.preventDefault();
        e.returnValue = 'You have unsaved application information. Are you sure you want to leave?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [fullName, cnic, whatsapp, email]);

  // Dynamic fee calculation
  const selectedCourseObj = coursesList.find((c) => c.name === selectedCourse);
  const currentFee = selectedCourseObj?.discountedFee || 30000;

  // Copy to clipboard helper
  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // File Upload Helper (Max 5MB, JPG/PNG/WEBP/PDF)
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldKey: string,
    setter: (val: string) => void,
    sizeSetter?: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileErrors((prev) => ({ ...prev, [fieldKey]: '' }));

    if (file.size > MAX_FILE_SIZE) {
      const errorText = `File "${file.name}" exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB). Please upload a smaller file.`;
      setFileErrors((prev) => ({ ...prev, [fieldKey]: errorText }));
      e.target.value = '';
      return;
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const isAllowedExt = ['jpg', 'jpeg', 'png', 'webp', 'pdf'].includes(fileExt || '');
    if (!ALLOWED_FILE_TYPES.includes(file.type) && !isAllowedExt) {
      const errorText = `Invalid file format for "${file.name}". Only JPG, PNG, WEBP, and PDF documents are allowed.`;
      setFileErrors((prev) => ({ ...prev, [fieldKey]: errorText }));
      e.target.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setter(res.data.filename);
      if (sizeSetter) sizeSetter(formatBytes(file.size));
      showAlert('File Attached', `${file.name} (${formatBytes(file.size)}) uploaded successfully.`);
    } catch (err: any) {
      const apiMsg = err?.response?.data?.message || `Failed to upload ${file.name}. Please try again.`;
      setFileErrors((prev) => ({ ...prev, [fieldKey]: apiMsg }));
    }
  };

  // Step Validation Logic
  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!fullName.trim() || fullName.trim().length < 3) {
        newErrors.fullName = 'Full Name (as per CNIC) is required.';
      }
      if (!fatherName.trim() || fatherName.trim().length < 3) {
        newErrors.fatherName = "Father's / Guardian's Name is required.";
      }
      const cnicClean = cnic.replace(/\D/g, '');
      if (cnicClean.length !== 13) {
        newErrors.cnic = 'Please enter a valid 13-digit Pakistani CNIC number.';
      }
      if (!dateOfBirth) {
        newErrors.dateOfBirth = 'Please select your Date of Birth.';
      }
      const phoneClean = whatsapp.replace(/\D/g, '');
      if (phoneClean.length !== 11 || !phoneClean.startsWith('03')) {
        newErrors.whatsapp = 'Please enter a valid 11-digit Pakistani mobile number (03xx-xxxxxxx).';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (currentStep === 2) {
      if (!lastQualification.trim()) newErrors.lastQualification = 'Last qualification is required.';
      if (!passingYear.trim()) newErrors.passingYear = 'Passing year is required.';
      if (!institute.trim()) newErrors.institute = 'Institute / University name is required.';
      if (!city.trim()) newErrors.city = 'City name is required.';
      if (!postalAddress.trim()) newErrors.postalAddress = 'Complete postal address is required.';
    }

    if (currentStep === 3) {
      if (!emergencyName.trim()) newErrors.emergencyName = 'Emergency contact name is required.';
      if (!emergencyRelation.trim()) newErrors.emergencyRelation = 'Relation is required.';
      const ePhoneClean = emergencyContact.replace(/\D/g, '');
      if (ePhoneClean.length !== 11 || !ePhoneClean.startsWith('03')) {
        newErrors.emergencyContact = 'Please enter a valid emergency mobile number (03xx-xxxxxxx).';
      }
    }

    if (currentStep === 4) {
      if (!selectedCourse) newErrors.selectedCourse = 'Please select a course / certification.';

      if (applicationType === 'Test / Certification Only') {
        if (testReason === 'Other' && !otherTestReason.trim()) {
          newErrors.otherTestReason = 'Please specify your reason for test-only assessment.';
        }
        if (!testDeclarationAgreed) {
          newErrors.testDeclaration = 'You must agree to the Test/Certification declaration to proceed.';
        }
      } else {
        if (!courseDeclarationAgreed) {
          newErrors.courseDeclaration = 'You must agree to the course rules & declaration to proceed.';
        }
      }

      if (!transactionId.trim()) {
        newErrors.transactionId = `Please enter the ${paymentMethod} transaction / reference ID.`;
      }
      if (!paymentProof) {
        newErrors.paymentProof = 'Please upload your payment screenshot or receipt.';
      }
      if (!cnicFile) {
        newErrors.cnicFile = 'Please upload a copy of your CNIC / ID Front.';
      }
      if (!photoFile) {
        newErrors.photoFile = 'Please upload a passport-size photograph.';
      }
    }

    setErrors(newErrors);

    // Auto-scroll to top error if any
    if (Object.keys(newErrors).length > 0) {
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleEditJump = (targetStep: number) => {
    setStep(targetStep);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleSubmitFinal = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!finalConfirmationAgreed) {
      setErrorMsg('Please confirm that all information provided above is correct before submitting.');
      return;
    }

    setSubmitting(true);

    // Generate reference ID (PTA-2026-XXXXXX)
    const refNum = `PTA-2026-${Math.floor(100000 + Math.random() * 900000)}`;

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
        applicationType,
        selectedCourses: [selectedCourse],
        classMode: applicationType === 'Course Enrollment' ? classMode : 'N/A (Test Only)',
        testReason: applicationType === 'Test / Certification Only' ? (testReason === 'Other' ? otherTestReason : testReason) : undefined,
        previousTraining: applicationType === 'Test / Certification Only' ? previousTraining : undefined,
        professionalExperience: applicationType === 'Test / Certification Only' ? professionalExperience : undefined,
        assessmentMode: applicationType === 'Test / Certification Only' ? assessmentMode : undefined,
        preferredAssessmentDate: applicationType === 'Test / Certification Only' ? preferredAssessmentDate : undefined,
        totalAmount: currentFee,
        paymentMethod,
        transactionId,
        paymentProof: paymentProof || 'receipt_submitted.png',
        cnicFile: cnicFile || 'cnic_submitted.pdf',
        photoFile: photoFile || 'passport_photo.jpg',
        referenceId: refNum
      });

      setSuccessData({
        referenceId: refNum,
        msg: `Your application has been received! Our admissions department will review your application. Upon approval, your credentials will be sent to ${email}.`
      });
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
        <div className="w-10 h-10 border-4 border-premier-green/30 border-t-emerald-400 rounded-full animate-spin" />
      </main>
    );
  }

  // Block if student already has active enrollment
  if (hasActiveEnrollment) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 max-w-md w-full text-center shadow-card space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-heading font-extrabold text-heading">Already Enrolled</h2>
            <p className="text-sm text-body leading-relaxed">
              You are currently enrolled in <strong className="text-premier-green">{activeCourseName}</strong> on the Premier LMS Student Mobile App.
            </p>
          </div>
          <Link href="/dashboard" className="btn-primary w-full justify-center text-xs focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2">
            Go to Student Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      
      {/* ── Standalone Top Branding Header ───────────────── */}
      <header className="bg-slate-900 border-b border-slate-800 py-4 px-6 sm:px-12 sticky top-0 z-40 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <Image
              src="/logo-icon.svg"
              alt="Premier Academy Crest Logo"
              width={44}
              height={44}
              className="h-11 w-11 object-contain rounded-xl shadow-sm"
              priority
            />
            <div className="flex flex-col leading-none">
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                Premier <span className="text-emerald-400">Academy</span>
              </span>
              <span className="text-[10px] font-body text-slate-400 uppercase tracking-widest font-semibold mt-1">
                Tax &amp; Accounting School
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-heading font-bold text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-800 px-4 py-2 rounded-xl transition-colors border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* ── Form Container ───────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        
        {/* Portal Titles */}
        <div className="text-center space-y-3 mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-heading font-bold uppercase tracking-wider border border-emerald-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Official Student Admission &amp; Certification Portal
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-heading tracking-tight">
            Online Admission &amp; Certification Application Form
          </h1>
          <p className="text-body text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Instructed directly by <strong className="text-heading font-bold">Advocate High Court &amp; ACMA Raja Gulfam Kayani</strong>. Enroll in complete masterclasses or apply directly for certification assessments.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SUCCESS CONFIRMATION SCREEN */}
        {/* ========================================================================= */}
        {successData ? (
          <div className="bg-white border border-emerald-200 rounded-3xl p-8 sm:p-12 text-center shadow-card space-y-6 max-w-2xl mx-auto animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-heading">
                Application Submitted Successfully
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
                Thank you, <strong className="text-heading">{fullName}</strong>. {successData.msg}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 text-left space-y-3 max-w-lg mx-auto shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 uppercase font-mono text-[10px] font-bold">Application Reference</span>
                <strong className="text-emerald-700 font-mono text-sm tracking-wider">{successData.referenceId}</strong>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 font-body">
                <div>
                  <span className="text-[10px] text-slate-500 block">Applicant Name</span>
                  <strong className="text-slate-900">{fullName}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Application Type</span>
                  <strong className="text-slate-900">{applicationType}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Course / Certification</span>
                  <strong className="text-slate-900">{selectedCourse}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Status</span>
                  <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">Application Received</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
              The academy will review your application and payment proof. You will receive further updates via WhatsApp ({whatsapp}) and Email ({email}).
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="btn-primary justify-center text-xs font-heading font-bold !py-3 px-8"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : !loadingCourses && coursesList.length === 0 ? (
          /* ADMISSIONS CLOSED SCREEN */
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center shadow-card space-y-6 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-2xl font-bold">
              🚫
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-extrabold text-heading">Admissions Currently Closed</h2>
              <p className="text-sm text-body leading-relaxed">
                Online admissions are currently closed as there are no active batches accepting applications right now.
              </p>
            </div>
            <Link href="/" className="btn-primary justify-center text-xs font-heading font-bold !py-3 inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Return to Homepage
            </Link>
          </div>
        ) : (
          /* ========================================================================= */
          /* MAIN MULTI-STEP FORM APPLICATION */
          /* ========================================================================= */
          <div className="bg-white border border-slate-200/90 rounded-3xl shadow-card overflow-hidden">
            
            {/* ── Desktop & Mobile Progress Indicator ──────────────── */}
            <div className="bg-slate-900 text-white p-5 sm:p-6 border-b border-slate-800">
              
              {/* Desktop Stepper */}
              <div className="hidden sm:flex items-center justify-between relative max-w-3xl mx-auto">
                {[
                  { num: 1, title: 'Personal' },
                  { num: 2, title: 'Academic' },
                  { num: 3, title: 'Emergency' },
                  { num: 4, title: 'Application' },
                  { num: 5, title: 'Review' },
                ].map((s, idx) => {
                  const isCurrent = step === s.num;
                  const isCompleted = step > s.num;

                  return (
                    <div key={s.num} className="flex items-center gap-2 relative z-10">
                      <button
                        type="button"
                        onClick={() => {
                          if (isCompleted) setStep(s.num);
                        }}
                        disabled={!isCompleted}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
                          isCurrent
                            ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20 scale-110'
                            : isCompleted
                            ? 'bg-emerald-600/90 text-white hover:bg-emerald-500 cursor-pointer'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {isCompleted ? <Check className="w-4 h-4" /> : `0${s.num}`}
                      </button>
                      <span className={`text-xs font-heading font-bold ${isCurrent ? 'text-emerald-400' : isCompleted ? 'text-white' : 'text-slate-400'}`}>
                        {s.title}
                      </span>
                      {idx < 4 && <ChevronRight className="w-4 h-4 text-slate-600 mx-1" />}
                    </div>
                  );
                })}
              </div>

              {/* Mobile Stepper */}
              <div className="sm:hidden space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">
                    Step {step} of 5
                  </span>
                  <span className="text-slate-300 font-heading font-bold">
                    {step === 1 && 'Personal Information'}
                    {step === 2 && 'Academic & Address'}
                    {step === 3 && 'Emergency Contact'}
                    {step === 4 && 'Application & Payment'}
                    {step === 5 && 'Review & Submit'}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${(step / 5) * 100}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Error Notification Banner */}
            {errorMsg && (
              <div className="m-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="p-6 sm:p-10">
              
              {/* ========================================================================= */}
              {/* STEP 1: PERSONAL INFORMATION */}
              {/* ========================================================================= */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="pb-3 border-b border-slate-200">
                    <h2 className="text-xl font-heading font-extrabold text-heading">
                      Step 1: Personal Information
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Required for official diploma registration &amp; student records.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                        Full Name (As per CNIC) *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                          }}
                          placeholder="e.g. Muhammad Ali Khan"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-heading focus:outline-none ${
                            errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                          }`}
                        />
                      </div>
                      {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Father Name */}
                    <div>
                      <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                        Father's / Guardian's Name *
                      </label>
                      <input
                        type="text"
                        value={fatherName}
                        onChange={(e) => {
                          setFatherName(e.target.value);
                          if (errors.fatherName) setErrors((prev) => ({ ...prev, fatherName: '' }));
                        }}
                        placeholder="e.g. Tariq Mehmood Khan"
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs text-heading focus:outline-none ${
                          errors.fatherName ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                        }`}
                      />
                      {errors.fatherName && <p className="text-[11px] text-red-500 mt-1">{errors.fatherName}</p>}
                    </div>

                    {/* CNIC */}
                    <div>
                      <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                        Pakistani CNIC Number * (13 Digits)
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          maxLength={15}
                          value={cnic}
                          onChange={handleCnicChange}
                          placeholder="37405-1234567-1"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-mono text-heading focus:outline-none ${
                            errors.cnic ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                          }`}
                        />
                      </div>
                      {errors.cnic ? (
                        <p className="text-[11px] text-red-500 mt-1">{errors.cnic}</p>
                      ) : (
                        <p className="text-[10px] text-slate-400 mt-1">Format: 13 digits (Auto-hyphenated)</p>
                      )}
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                        Date of Birth *
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => {
                            setDateOfBirth(e.target.value);
                            if (errors.dateOfBirth) setErrors((prev) => ({ ...prev, dateOfBirth: '' }));
                          }}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-heading focus:outline-none ${
                            errors.dateOfBirth ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                          }`}
                        />
                      </div>
                      {errors.dateOfBirth && <p className="text-[11px] text-red-500 mt-1">{errors.dateOfBirth}</p>}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                        Gender *
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-heading focus:outline-none focus:border-emerald-600 bg-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    {/* Mobile / WhatsApp */}
                    <div>
                      <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                        Pakistani Mobile / WhatsApp Contact *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          maxLength={12}
                          value={whatsapp}
                          onChange={handlePhoneChange}
                          placeholder="0300-1234567"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-mono text-heading focus:outline-none ${
                            errors.whatsapp ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                          }`}
                        />
                      </div>
                      {errors.whatsapp ? (
                        <p className="text-[11px] text-red-500 mt-1">{errors.whatsapp}</p>
                      ) : (
                        <p className="text-[10px] text-slate-400 mt-1">11 digits starting with 03</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                          }}
                          placeholder="name@domain.com"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-heading focus:outline-none ${
                            errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                    </div>

                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* STEP 2: ACADEMIC & ADDRESS */}
              {/* ========================================================================= */}
              {step === 2 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="pb-3 border-b border-slate-200">
                    <h2 className="text-xl font-heading font-extrabold text-heading">
                      Step 2: Academic Background &amp; Address
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Enter your highest education details and certificate dispatch address.
                    </p>
                  </div>

                  {/* Qualification Group */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono font-bold uppercase text-emerald-800 tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                      Academic Qualification
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                          Last Qualification *
                        </label>
                        <input
                          type="text"
                          value={lastQualification}
                          onChange={(e) => {
                            setLastQualification(e.target.value);
                            if (errors.lastQualification) setErrors((prev) => ({ ...prev, lastQualification: '' }));
                          }}
                          placeholder="e.g. B.Com, LL.B, CA, MBA"
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs text-heading focus:outline-none ${
                            errors.lastQualification ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                          }`}
                        />
                        {errors.lastQualification && <p className="text-[11px] text-red-500 mt-1">{errors.lastQualification}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                          Passing Year *
                        </label>
                        <input
                          type="text"
                          value={passingYear}
                          onChange={(e) => {
                            setPassingYear(e.target.value);
                            if (errors.passingYear) setErrors((prev) => ({ ...prev, passingYear: '' }));
                          }}
                          placeholder="e.g. 2023"
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono text-heading focus:outline-none ${
                            errors.passingYear ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                          }`}
                        />
                        {errors.passingYear && <p className="text-[11px] text-red-500 mt-1">{errors.passingYear}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                          Institute / University *
                        </label>
                        <input
                          type="text"
                          value={institute}
                          onChange={(e) => {
                            setInstitute(e.target.value);
                            if (errors.institute) setErrors((prev) => ({ ...prev, institute: '' }));
                          }}
                          placeholder="e.g. University of the Punjab"
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs text-heading focus:outline-none ${
                            errors.institute ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                          }`}
                        />
                        {errors.institute && <p className="text-[11px] text-red-500 mt-1">{errors.institute}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Address Group */}
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <h3 className="text-xs font-mono font-bold uppercase text-emerald-800 tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      Dispatch &amp; Postal Address
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                          City Name *
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                            if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
                          }}
                          placeholder="e.g. Lahore, Karachi, Islamabad"
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs text-heading focus:outline-none ${
                            errors.city ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
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
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-heading focus:outline-none focus:border-emerald-600 bg-white"
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

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                          Complete Postal Address *
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={postalAddress}
                            onChange={(e) => {
                              setPostalAddress(e.target.value);
                              if (errors.postalAddress) setErrors((prev) => ({ ...prev, postalAddress: '' }));
                            }}
                            placeholder="House/Office No., Street, Sector/Area"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-heading focus:outline-none ${
                              errors.postalAddress ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                            }`}
                          />
                        </div>
                        {errors.postalAddress && <p className="text-[11px] text-red-500 mt-1">{errors.postalAddress}</p>}
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* ========================================================================= */}
              {/* STEP 3: EMERGENCY CONTACT */}
              {/* ========================================================================= */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="pb-3 border-b border-slate-200">
                    <h2 className="text-xl font-heading font-extrabold text-heading">
                      Step 3: Emergency Contact Information
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Used only if the academy needs to contact your emergency contact.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                        Emergency Contact Name *
                      </label>
                      <input
                        type="text"
                        value={emergencyName}
                        onChange={(e) => {
                          setEmergencyName(e.target.value);
                          if (errors.emergencyName) setErrors((prev) => ({ ...prev, emergencyName: '' }));
                        }}
                        placeholder="e.g. Tariq Mehmood"
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs text-heading focus:outline-none ${
                          errors.emergencyName ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                        }`}
                      />
                      {errors.emergencyName && <p className="text-[11px] text-red-500 mt-1">{errors.emergencyName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                        Relation *
                      </label>
                      <input
                        type="text"
                        value={emergencyRelation}
                        onChange={(e) => {
                          setEmergencyRelation(e.target.value);
                          if (errors.emergencyRelation) setErrors((prev) => ({ ...prev, emergencyRelation: '' }));
                        }}
                        placeholder="e.g. Father / Brother / Spouse"
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs text-heading focus:outline-none ${
                          errors.emergencyRelation ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                        }`}
                      />
                      {errors.emergencyRelation && <p className="text-[11px] text-red-500 mt-1">{errors.emergencyRelation}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                        Emergency Contact Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          maxLength={12}
                          value={emergencyContact}
                          onChange={(e) => {
                            setEmergencyContact(formatPhone(e.target.value));
                            if (errors.emergencyContact) setErrors((prev) => ({ ...prev, emergencyContact: '' }));
                          }}
                          placeholder="0300-0000000"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-mono text-heading focus:outline-none ${
                            errors.emergencyContact ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                          }`}
                        />
                      </div>
                      {errors.emergencyContact && <p className="text-[11px] text-red-500 mt-1">{errors.emergencyContact}</p>}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Privacy Guarantee:</strong> Emergency contact information is strictly confidential and will only be accessed in urgent administrative scenarios.
                    </span>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* STEP 4: APPLICATION TYPE & PAYMENT */}
              {/* ========================================================================= */}
              {step === 4 && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* 1. PATHWAY SELECTOR: How would you like to proceed? */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-heading font-extrabold text-heading">
                        Step 4: Application &amp; Payment
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Choose your application pathway, course, payment method, and upload required verification documents.
                      </p>
                    </div>

                    <label className="block text-xs font-heading font-extrabold text-heading uppercase tracking-wider">
                      How would you like to proceed? *
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Option 1: Course Enrollment */}
                      <div
                        onClick={() => setApplicationType('Course Enrollment')}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 relative ${
                          applicationType === 'Course Enrollment'
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-600/20'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            applicationType === 'Course Enrollment' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                          }`}>
                            {applicationType === 'Course Enrollment' && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-base font-heading font-bold text-heading">
                            Option 1: Course Enrollment
                          </h3>
                          <p className="text-xs font-semibold text-emerald-800 mt-0.5">Enroll in the complete course</p>
                          <p className="text-[11px] text-slate-600 mt-2 leading-relaxed font-body">
                            Attend the complete masterclass, access live lectures, course materials, and fulfill full diploma requirements.
                          </p>
                        </div>
                      </div>

                      {/* Option 2: Test / Certification Only */}
                      <div
                        onClick={() => setApplicationType('Test / Certification Only')}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 relative ${
                          applicationType === 'Test / Certification Only'
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-600/20'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                            <Award className="w-5 h-5" />
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            applicationType === 'Test / Certification Only' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                          }`}>
                            {applicationType === 'Test / Certification Only' && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-base font-heading font-bold text-heading">
                            Option 2: Test / Certification Only
                          </h3>
                          <p className="text-xs font-semibold text-amber-800 mt-0.5">Already know the subject?</p>
                          <p className="text-[11px] text-slate-600 mt-2 leading-relaxed font-body">
                            Apply directly for the assessment and certification without enrolling in the complete course lectures.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* 2. CONDITIONAL PATHWAY CONTENT */}
                  {applicationType === 'Course Enrollment' ? (
                    /* COURSE ENROLLMENT PATH */
                    <div className="space-y-5 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                          Course Enrollment Selection
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-700">Course Fee: PKR {currentFee.toLocaleString()}</span>
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-bold text-heading uppercase mb-2">
                          Select Desired Course *
                        </label>
                        {loadingCourses ? (
                          <div className="p-4 text-center text-xs text-slate-500">Loading courses...</div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {coursesList.map((c: any) => {
                              const isSel = selectedCourse === c.name;
                              return (
                                <label
                                  key={c.id || c.name}
                                  onClick={() => setSelectedCourse(c.name)}
                                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-2 select-none ${
                                    isSel
                                      ? 'border-emerald-600 bg-white shadow-xs font-bold text-emerald-950 ring-1 ring-emerald-600/30'
                                      : 'border-slate-200 bg-white hover:bg-slate-100/50 text-slate-700'
                                  }`}
                                >
                                  <span className="text-xs font-heading">{c.name}</span>
                                  <span className="text-[11px] font-mono font-semibold text-emerald-700">Rs. {(c.discountedFee || 30000).toLocaleString()}</span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Class Mode */}
                      <div>
                        <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                          Class Mode *
                        </label>
                        <div className="p-3 rounded-xl border border-emerald-300 bg-emerald-50 text-xs font-bold text-emerald-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                          <span>💻 {classMode}</span>
                        </div>
                      </div>

                      {/* Course Declaration Checkbox */}
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={courseDeclarationAgreed}
                            onChange={(e) => setCourseDeclarationAgreed(e.target.checked)}
                            className="mt-0.5 w-4 h-4 rounded text-emerald-600 border-slate-300 accent-emerald-600"
                          />
                          <span className="text-xs text-slate-700 leading-relaxed font-body">
                            <strong>DECLARATION:</strong> I hereby declare that the information provided above is correct to the best of my knowledge and I agree to abide by the rules and regulations of Premier Tax Corporate &amp; Accounting School.
                          </span>
                        </label>
                        {errors.courseDeclaration && <p className="text-[11px] text-red-500 mt-1">{errors.courseDeclaration}</p>}
                      </div>
                    </div>
                  ) : (
                    /* TEST / CERTIFICATION ONLY PATH */
                    <div className="space-y-6 p-5 rounded-2xl bg-amber-50/50 border border-amber-200">
                      
                      {/* Info Card */}
                      <div className="p-4 rounded-xl bg-amber-100/80 border border-amber-200 text-xs text-amber-950 space-y-1">
                        <h4 className="font-heading font-bold text-amber-900 flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-amber-700" />
                          Already know the material?
                        </h4>
                        <p className="leading-relaxed font-body text-amber-900/90">
                          If you already have sufficient knowledge, previous training, education, or professional experience in the selected subject, you may apply directly for the assessment without enrolling in the complete course.
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                        <span className="text-xs font-mono font-bold text-amber-900 uppercase tracking-wider">
                          Certification Assessment Details
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-800">Assessment Fee: PKR {currentFee.toLocaleString()}</span>
                      </div>

                      {/* Select Certification */}
                      <div>
                        <label className="block text-xs font-heading font-bold text-heading uppercase mb-2">
                          Select Certification / Course *
                        </label>
                        <select
                          value={selectedCourse}
                          onChange={(e) => setSelectedCourse(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-heading focus:outline-none focus:border-emerald-600 bg-white"
                        >
                          {coursesList.map((c) => (
                            <option key={c.id || c.name} value={c.name}>
                              {c.name} — PKR {(c.discountedFee || 30000).toLocaleString()}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Why applying for test-only */}
                      <div>
                        <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                          Why are you applying for the assessment without taking the complete course? *
                        </label>
                        <select
                          value={testReason}
                          onChange={(e) => setTestReason(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-heading focus:outline-none focus:border-emerald-600 bg-white"
                        >
                          <option value="I already have sufficient knowledge of the subject">I already have sufficient knowledge of the subject</option>
                          <option value="I have completed equivalent training elsewhere">I have completed equivalent training elsewhere</option>
                          <option value="I am self-taught">I am self-taught</option>
                          <option value="I have professional experience">I have professional experience</option>
                          <option value="I have previously studied this subject">I have previously studied this subject</option>
                          <option value="Other">Other</option>
                        </select>

                        {testReason === 'Other' && (
                          <div className="mt-3">
                            <label className="block text-xs font-heading font-bold text-heading uppercase mb-1">Please specify *</label>
                            <input
                              type="text"
                              value={otherTestReason}
                              onChange={(e) => setOtherTestReason(e.target.value)}
                              placeholder="Describe your reason"
                              className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs text-heading focus:outline-none focus:border-emerald-600"
                            />
                            {errors.otherTestReason && <p className="text-[11px] text-red-500 mt-1">{errors.otherTestReason}</p>}
                          </div>
                        )}
                      </div>

                      {/* Optional Training & Experience */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                            Previous Training / Qualification (Optional)
                          </label>
                          <input
                            type="text"
                            value={previousTraining}
                            onChange={(e) => setPreviousTraining(e.target.value)}
                            placeholder="Briefly describe relevant course, training or certification"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-heading focus:outline-none focus:border-emerald-600 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                            Relevant Professional Experience (Optional)
                          </label>
                          <input
                            type="text"
                            value={professionalExperience}
                            onChange={(e) => setProfessionalExperience(e.target.value)}
                            placeholder="Briefly describe your relevant practical experience"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-heading focus:outline-none focus:border-emerald-600 bg-white"
                          />
                        </div>
                      </div>

                      {/* Assessment Mode & Preferred Date */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                            Assessment Mode *
                          </label>
                          <select
                            value={assessmentMode}
                            onChange={(e) => setAssessmentMode(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-heading focus:outline-none focus:border-emerald-600 bg-white"
                          >
                            <option value="Online Assessment">Online Assessment</option>
                            <option value="On-site Assessment">On-site Assessment</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                            Preferred Assessment Date (Optional)
                          </label>
                          <input
                            type="date"
                            value={preferredAssessmentDate}
                            onChange={(e) => setPreferredAssessmentDate(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-heading focus:outline-none focus:border-emerald-600 bg-white"
                          />
                          <p className="text-[10px] text-slate-500 mt-1">
                            Your preferred assessment date is subject to academy approval and availability.
                          </p>
                        </div>
                      </div>

                      {/* Test-Only Declaration */}
                      <div className="p-4 rounded-xl bg-white border border-amber-200">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={testDeclarationAgreed}
                            onChange={(e) => setTestDeclarationAgreed(e.target.checked)}
                            className="mt-0.5 w-4 h-4 rounded text-emerald-600 border-slate-300 accent-emerald-600"
                          />
                          <span className="text-xs text-slate-700 leading-relaxed font-body">
                            <strong>TEST / CERTIFICATION DECLARATION:</strong> I hereby confirm that I am applying for assessment and certification only and do not wish to enroll in the complete course. I confirm that I have sufficient knowledge, previous training, education, or professional experience relevant to the selected certification. I understand that certification is subject to successfully passing the required assessment.
                          </span>
                        </label>
                        {errors.testDeclaration && <p className="text-[11px] text-red-500 mt-1">{errors.testDeclaration}</p>}
                      </div>

                    </div>
                  )}

                  {/* 3. PAYMENT METHOD CARDS */}
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <div>
                      <label className="block text-xs font-heading font-extrabold text-heading uppercase tracking-wider">
                        Select Payment Method *
                      </label>
                      <p className="text-xs text-slate-500 mt-0.5">Select how you transferred your fee to the academy.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      {/* Bank Transfer */}
                      <div
                        onClick={() => setPaymentMethod('Bank Transfer')}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          paymentMethod === 'Bank Transfer'
                            ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20 font-bold'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-heading font-bold text-slate-900">Bank Transfer</p>
                            <p className="text-[10px] text-slate-500">Meezan Bank</p>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'Bank Transfer' ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'}`}>
                          {paymentMethod === 'Bank Transfer' && <Check className="w-2.5 h-2.5" />}
                        </div>
                      </div>

                      {/* EasyPaisa */}
                      <div
                        onClick={() => setPaymentMethod('EasyPaisa')}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          paymentMethod === 'EasyPaisa'
                            ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20 font-bold'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                            <Smartphone className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-heading font-bold text-slate-900">EasyPaisa</p>
                            <p className="text-[10px] text-slate-500">Mobile Wallet</p>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'EasyPaisa' ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'}`}>
                          {paymentMethod === 'EasyPaisa' && <Check className="w-2.5 h-2.5" />}
                        </div>
                      </div>

                      {/* JazzCash */}
                      <div
                        onClick={() => setPaymentMethod('JazzCash')}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          paymentMethod === 'JazzCash'
                            ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20 font-bold'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-heading font-bold text-slate-900">JazzCash</p>
                            <p className="text-[10px] text-slate-500">Mobile Wallet</p>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'JazzCash' ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'}`}>
                          {paymentMethod === 'JazzCash' && <Check className="w-2.5 h-2.5" />}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* 4. DYNAMIC PAYMENT INSTRUCTIONS */}
                  <div className="rounded-2xl bg-slate-900 text-white p-6 space-y-4 shadow-md border border-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-xs font-heading font-bold text-amber-400 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4" />
                        {paymentMethod === 'Bank Transfer' && 'Bank Transfer Account Details'}
                        {paymentMethod === 'EasyPaisa' && 'EasyPaisa Mobile Account Details'}
                        {paymentMethod === 'JazzCash' && 'JazzCash Mobile Account Details'}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        Amount to Pay: PKR {currentFee.toLocaleString()}
                      </span>
                    </div>

                    {paymentMethod === 'Bank Transfer' && (
                      <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Bank Name</span>
                          <strong className="text-white text-sm">Meezan Bank Limited</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Account Title</span>
                          <strong className="text-white text-sm">Raja Gulfam Tax &amp; Legal Academy</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Account Number</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <strong className="text-emerald-300 text-sm">0102030405060708</strong>
                            <button
                              type="button"
                              onClick={() => copyToClipboard('0102030405060708', 'accNum')}
                              className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                            >
                              {copiedField === 'accNum' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedField === 'accNum' ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">IBAN</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <strong className="text-emerald-300 text-sm">PK92MEZN0001020304050607</strong>
                            <button
                              type="button"
                              onClick={() => copyToClipboard('PK92MEZN0001020304050607', 'iban')}
                              className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                            >
                              {copiedField === 'iban' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedField === 'iban' ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'EasyPaisa' && (
                      <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Account Name</span>
                          <strong className="text-white text-sm">Raja Gulfam Tax &amp; Legal Academy</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">EasyPaisa Mobile Number</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <strong className="text-emerald-300 text-sm">0334-8972072</strong>
                            <button
                              type="button"
                              onClick={() => copyToClipboard('03348972072', 'epNum')}
                              className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                            >
                              {copiedField === 'epNum' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedField === 'epNum' ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'JazzCash' && (
                      <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Account Name</span>
                          <strong className="text-white text-sm">Raja Gulfam Tax &amp; Legal Academy</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">JazzCash Mobile Number</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <strong className="text-emerald-300 text-sm">0334-8972072</strong>
                            <button
                              type="button"
                              onClick={() => copyToClipboard('03348972072', 'jcNum')}
                              className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                            >
                              {copiedField === 'jcNum' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedField === 'jcNum' ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 5. TRANSACTION ID & FILE UPLOADS */}
                  <div className="space-y-6 pt-2">
                    
                    {/* Transaction ID */}
                    <div>
                      <label className="block text-xs font-heading font-bold text-heading uppercase mb-1.5">
                        Transaction / Reference ID *
                      </label>
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => {
                          setTransactionId(e.target.value);
                          if (errors.transactionId) setErrors((prev) => ({ ...prev, transactionId: '' }));
                        }}
                        placeholder={
                          paymentMethod === 'Bank Transfer'
                            ? 'Enter your bank transaction/reference number (e.g. TRX-98432176)'
                            : paymentMethod === 'EasyPaisa'
                            ? 'Enter the EasyPaisa transaction/reference ID'
                            : 'Enter the JazzCash transaction/reference ID'
                        }
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono text-heading focus:outline-none ${
                          errors.transactionId ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                        }`}
                      />
                      {errors.transactionId && <p className="text-[11px] text-red-500 mt-1">{errors.transactionId}</p>}
                    </div>

                    {/* UPLOAD CARDS GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      
                      {/* Payment Proof Card */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <label className="block text-xs font-heading font-bold text-heading uppercase">
                          Payment Proof *
                        </label>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          Upload screenshot, receipt, or transaction slip. (Max 5MB)
                        </p>

                        {!paymentProof ? (
                          <div className="relative border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-4 text-center cursor-pointer transition-colors group">
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png,.webp,.pdf"
                              onChange={(e) => handleFileUpload(e, 'paymentProof', setPaymentProof, setPaymentProofSize)}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                            <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 mx-auto" />
                            <span className="text-xs font-bold text-slate-700 block mt-1">Browse Files</span>
                            <span className="text-[10px] text-slate-400">JPG, PNG, PDF up to 5MB</span>
                          </div>
                        ) : (
                          <div className="p-3 rounded-xl bg-white border border-emerald-300 space-y-2">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-emerald-800 font-bold truncate max-w-[140px]">✓ {paymentProof}</span>
                              <span className="text-[10px] text-slate-500">{paymentProofSize}</span>
                            </div>
                            <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                              <button
                                type="button"
                                onClick={() => setViewingFile({ name: 'Payment Proof', url: `/uploads/${paymentProof}` })}
                                className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1"
                              >
                                <Eye className="w-3 h-3" /> View
                              </button>
                              <button
                                type="button"
                                onClick={() => setPaymentProof('')}
                                className="text-[11px] font-bold text-red-600 hover:underline flex items-center gap-1 ml-auto"
                              >
                                <Trash2 className="w-3 h-3" /> Remove
                              </button>
                            </div>
                          </div>
                        )}
                        {fileErrors.paymentProof && <p className="text-[11px] text-red-500">{fileErrors.paymentProof}</p>}
                        {errors.paymentProof && <p className="text-[11px] text-red-500">{errors.paymentProof}</p>}
                      </div>

                      {/* CNIC Front Copy Card */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <label className="block text-xs font-heading font-bold text-heading uppercase">
                          CNIC / ID Front Copy *
                        </label>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          Upload clear front image of CNIC/ID. (Max 5MB)
                        </p>

                        {!cnicFile ? (
                          <div className="relative border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-4 text-center cursor-pointer transition-colors group">
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png,.webp,.pdf"
                              onChange={(e) => handleFileUpload(e, 'cnicFile', setCnicFile, setCnicFileSize)}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                            <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 mx-auto" />
                            <span className="text-xs font-bold text-slate-700 block mt-1">Browse Files</span>
                            <span className="text-[10px] text-slate-400">JPG, PNG, PDF up to 5MB</span>
                          </div>
                        ) : (
                          <div className="p-3 rounded-xl bg-white border border-emerald-300 space-y-2">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-emerald-800 font-bold truncate max-w-[140px]">✓ {cnicFile}</span>
                              <span className="text-[10px] text-slate-500">{cnicFileSize}</span>
                            </div>
                            <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                              <button
                                type="button"
                                onClick={() => setCnicFile('')}
                                className="text-[11px] font-bold text-red-600 hover:underline flex items-center gap-1 ml-auto"
                              >
                                <Trash2 className="w-3 h-3" /> Remove
                              </button>
                            </div>
                          </div>
                        )}
                        {fileErrors.cnicFile && <p className="text-[11px] text-red-500">{fileErrors.cnicFile}</p>}
                        {errors.cnicFile && <p className="text-[11px] text-red-500">{errors.cnicFile}</p>}
                      </div>

                      {/* Passport Photograph Card */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <label className="block text-xs font-heading font-bold text-heading uppercase">
                          Passport Photograph *
                        </label>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          Upload recent passport-size photo. (Max 5MB)
                        </p>

                        {!photoFile ? (
                          <div className="relative border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-4 text-center cursor-pointer transition-colors group">
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png,.webp"
                              onChange={(e) => handleFileUpload(e, 'photoFile', setPhotoFile, setPhotoFileSize)}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                            <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 mx-auto" />
                            <span className="text-xs font-bold text-slate-700 block mt-1">Browse Files</span>
                            <span className="text-[10px] text-slate-400">JPG, PNG up to 5MB</span>
                          </div>
                        ) : (
                          <div className="p-3 rounded-xl bg-white border border-emerald-300 space-y-2">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-emerald-800 font-bold truncate max-w-[140px]">✓ {photoFile}</span>
                              <span className="text-[10px] text-slate-500">{photoFileSize}</span>
                            </div>
                            <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                              <button
                                type="button"
                                onClick={() => setPhotoFile('')}
                                className="text-[11px] font-bold text-red-600 hover:underline flex items-center gap-1 ml-auto"
                              >
                                <Trash2 className="w-3 h-3" /> Remove
                              </button>
                            </div>
                          </div>
                        )}
                        {fileErrors.photoFile && <p className="text-[11px] text-red-500">{fileErrors.photoFile}</p>}
                        {errors.photoFile && <p className="text-[11px] text-red-500">{errors.photoFile}</p>}
                      </div>

                    </div>

                    <p className="text-[11px] text-slate-500 italic">
                      Make sure the payment proof clearly shows the transaction/reference number, amount, date, and payment status.
                    </p>
                  </div>

                  {/* 6. DYNAMIC PAYMENT SUMMARY BOX */}
                  <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2 font-mono text-xs">
                    <h4 className="font-heading font-bold text-emerald-950 uppercase tracking-wider text-[11px]">
                      Payment Summary
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-emerald-900 pt-1">
                      <div>
                        <span className="text-slate-500 block">Pathway</span>
                        <strong>{applicationType}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Method</span>
                        <strong>{paymentMethod}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Amount</span>
                        <strong className="text-emerald-700">PKR {currentFee.toLocaleString()}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Payment Proof</span>
                        <strong>{paymentProof ? '✓ Attached' : 'Pending'}</strong>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* ========================================================================= */}
              {/* STEP 5: REVIEW & SUBMIT */}
              {/* ========================================================================= */}
              {step === 5 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="pb-3 border-b border-slate-200">
                    <h2 className="text-2xl font-heading font-extrabold text-heading">
                      Review Your Application
                    </h2>
                    <p className="text-xs text-slate-600 mt-1">
                      Please carefully review your information before submitting your application. You can edit any section if something needs to be corrected.
                    </p>
                  </div>

                  <div className="space-y-4">
                    
                    {/* Review Card 1: Personal Info */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <User className="w-4 h-4 text-emerald-600" />
                          Personal Information
                        </h3>
                        <button
                          type="button"
                          onClick={() => handleEditJump(1)}
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Full Name</span>
                          <strong className="text-slate-900">{fullName}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Father / Guardian</span>
                          <strong className="text-slate-900">{fatherName}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">CNIC Number</span>
                          <strong className="text-slate-900 font-mono">{cnic}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Date of Birth</span>
                          <strong className="text-slate-900">{dateOfBirth}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Gender</span>
                          <strong className="text-slate-900">{gender}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Mobile / WhatsApp</span>
                          <strong className="text-slate-900 font-mono">{whatsapp}</strong>
                        </div>
                        <div className="sm:col-span-3">
                          <span className="text-slate-500 block text-[10px] uppercase">Email Address</span>
                          <strong className="text-slate-900">{email}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Review Card 2: Academic & Address */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <GraduationCap className="w-4 h-4 text-emerald-600" />
                          Academic &amp; Address
                        </h3>
                        <button
                          type="button"
                          onClick={() => handleEditJump(2)}
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Qualification</span>
                          <strong className="text-slate-900">{lastQualification}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Passing Year</span>
                          <strong className="text-slate-900 font-mono">{passingYear}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Institute</span>
                          <strong className="text-slate-900">{institute}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">City</span>
                          <strong className="text-slate-900">{city}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Province</span>
                          <strong className="text-slate-900">{province}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Postal Address</span>
                          <strong className="text-slate-900">{postalAddress}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Review Card 3: Emergency Contact */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Phone className="w-4 h-4 text-emerald-600" />
                          Emergency Contact
                        </h3>
                        <button
                          type="button"
                          onClick={() => handleEditJump(3)}
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Name</span>
                          <strong className="text-slate-900">{emergencyName}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Relation</span>
                          <strong className="text-slate-900">{emergencyRelation}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Contact Number</span>
                          <strong className="text-slate-900 font-mono">{emergencyContact}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Review Card 4: Application Details */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-emerald-600" />
                          Application Pathway &amp; Details
                        </h3>
                        <button
                          type="button"
                          onClick={() => handleEditJump(4)}
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit Application
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Application Type</span>
                          <strong className="text-emerald-800 font-bold">{applicationType}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Course / Certification</span>
                          <strong className="text-slate-900">{selectedCourse}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Fee Amount</span>
                          <strong className="text-emerald-700 font-mono">PKR {currentFee.toLocaleString()}</strong>
                        </div>

                        {applicationType === 'Course Enrollment' ? (
                          <div>
                            <span className="text-slate-500 block text-[10px] uppercase">Class Mode</span>
                            <strong className="text-slate-900">{classMode}</strong>
                          </div>
                        ) : (
                          <>
                            <div>
                              <span className="text-slate-500 block text-[10px] uppercase">Test Reason</span>
                              <strong className="text-slate-900">{testReason === 'Other' ? otherTestReason : testReason}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[10px] uppercase">Assessment Mode</span>
                              <strong className="text-slate-900">{assessmentMode}</strong>
                            </div>
                            {preferredAssessmentDate && (
                              <div>
                                <span className="text-slate-500 block text-[10px] uppercase">Preferred Date</span>
                                <strong className="text-slate-900 font-mono">{preferredAssessmentDate}</strong>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Review Card 5: Payment & Documents */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-emerald-600" />
                          Payment &amp; Uploaded Documents
                        </h3>
                        <button
                          type="button"
                          onClick={() => handleEditJump(4)}
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit Payment
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Payment Method</span>
                          <strong className="text-slate-900">{paymentMethod}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Transaction / TRX ID</span>
                          <strong className="text-emerald-700 font-mono">{transactionId}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Payment Proof</span>
                          <strong className="text-emerald-800 font-mono">✓ {paymentProof}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">CNIC Document</span>
                          <strong className="text-emerald-800 font-mono">✓ {cnicFile}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase">Passport Photograph</span>
                          <strong className="text-emerald-800 font-mono">✓ {photoFile}</strong>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Ready to submit banner */}
                  <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 shadow-md">
                    <div>
                      <h4 className="text-base font-heading font-extrabold text-white">
                        Ready to Submit?
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Please confirm your declaration below before submitting your official application.
                      </p>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer p-3.5 rounded-xl bg-slate-800/90 border border-slate-700">
                      <input
                        type="checkbox"
                        checked={finalConfirmationAgreed}
                        onChange={(e) => setFinalConfirmationAgreed(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-emerald-500 border-slate-600 accent-emerald-500"
                      />
                      <span className="text-xs text-white leading-relaxed font-body">
                        <strong>FINAL CONFIRMATION:</strong> I confirm that all information provided above is correct and verified. I understand that false or misleading details may lead to cancellation of my registration.
                      </span>
                    </label>
                  </div>

                </div>
              )}

              {/* ========================================================================= */}
              {/* STEP NAVIGATION BUTTONS (STICKY FOOTER IN STEP CONTAINER) */}
              {/* ========================================================================= */}
              <div className="pt-8 mt-8 border-t border-slate-200 flex items-center justify-between gap-4">
                
                {/* Back Button */}
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-2.5 rounded-xl border border-slate-300 text-xs font-heading font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : <div />}

                {/* Continue / Submit Buttons */}
                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-primary !py-3 !px-8 text-xs font-heading font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitFinal}
                    disabled={submitting || !finalConfirmationAgreed}
                    className={`btn-primary !py-3.5 !px-8 text-xs font-heading font-bold flex items-center gap-2 cursor-pointer shadow-lg ${
                      !finalConfirmationAgreed ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  >
                    <Lock className="w-4 h-4 text-emerald-300" />
                    <span>
                      {submitting
                        ? 'Submitting...'
                        : applicationType === 'Course Enrollment'
                        ? 'Submit Admission Application'
                        : 'Submit Certification Assessment Application'}
                    </span>
                  </button>
                )}

              </div>

            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* DOCUMENT PREVIEW MODAL */}
      {/* ========================================================================= */}
      {viewingFile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-heading font-bold text-slate-900">{viewingFile.name}</h3>
              <button
                onClick={() => setViewingFile(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 text-center font-mono text-xs text-slate-600 space-y-2">
              <FileText className="w-12 h-12 text-emerald-600 mx-auto" />
              <p className="font-bold text-slate-900">{viewingFile.url}</p>
              <p className="text-[10px] text-slate-400">Attached successfully to your application draft.</p>
            </div>
            <button
              onClick={() => setViewingFile(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
