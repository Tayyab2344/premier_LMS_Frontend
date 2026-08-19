# Premier LMS — Course Page UI Design System & Architecture Document

This document presents the complete UI/UX design specification, layout structure, component breakdown, visual theme, and interactive design patterns for the **Premier LMS Course Pages** (Frontend only).

---

## 🎨 1. Design Aesthetics & Visual Identity

The Premier LMS Course interface utilizes a dual aesthetic design strategy: a **High-Impact Cyber-AI Dark Mode** for the main Hero showcase, balanced with a **Clean, Premium Cream Light Mode** (`#F9F8F3`) for readability during deep course exploration.

### 🎨 Color Palette & Tokens
| Token Name | Hex / CSS Class | Visual Context & Usage |
| :--- | :--- | :--- |
| **Premier Cream** | `#F9F8F3` / `bg-premier-cream` | Primary page background for comfortable, eye-strain-free reading |
| **Premier Green** | `#0F4C3A` / `text-premier-green` | Primary brand accent for headers, key badges, and buttons |
| **Emerald Cyber Glow** | `#10B981` / `bg-emerald-500` | AI features highlight, active pills, and success indicators |
| **Cyber Dark Slate** | `#020617` / `bg-slate-950` | Featured Hero dark mode background with cyber circuit grid |
| **Cyan Spark** | `#06B6D4` / `text-cyan-400` | AI taglines, live status pulses, and accent highlights |
| **Warm Gold** | `#EAB308` / `text-amber-400` | Rating stars, achievements, and premium badges |
| **Heading Text** | `#1E293B` / `text-heading` | High-contrast slate typography for titles and subtitles |
| **Body Text** | `#475569` / `text-body` | Soft slate body text for maximum legibility |

### 🔤 Typography & Micro-Interactions
- **Headings**: `Outfit` / `Inter` bold sans-serif (`font-heading font-extrabold`).
- **Body**: Clean readable `Inter` with relaxed line height (`leading-relaxed`).
- **Animations**: Powered by **Framer Motion**:
  - `AnimatePresence` for smooth tab content switching without layout jump.
  - Hover scale effects (`whileHover={{ y: -4 }}`) on course cards.
  - Ambient glowing blobs and pulse indicators for AI-enhanced badges.

---

## 📱 2. Page Structure & Component Architecture

```
app/courses/
├── page.tsx                           # Main Course Catalog Page
└── [slug]/
    └── page.tsx                       # Course Detail Page
```

---

## 🚀 Page 1: Main Course Catalog (`/courses`)

The Main Courses Page is structured into 5 distinct full-width layout sections:

```
+-------------------------------------------------------------------+
| 1. Featured Course Hero (Dark Cyber Theme)                       |
|    - Available Flagship Course Banner + Key Stats                 |
|    - Direct Enroll & Live Demo CTAs                              |
+-------------------------------------------------------------------+
| 2. Trust & Accreditation Strip                                    |
|    - FBR, SECP, ICAP & Professional Recognition Badges            |
+-------------------------------------------------------------------+
| 3. Upcoming Academy Section                                       |
|    - Real-Time Search Bar & Category Filter Tabs                  |
|    - Categorized Upcoming Courses Grid                            |
+-------------------------------------------------------------------+
| 4. Final Conversion Call-To-Action Banner                        |
+-------------------------------------------------------------------+
| 5. Interactive "Notify Me" Dialog Modal                          |
+-------------------------------------------------------------------+
```

### Key UI Components Breakdown

#### 1. `FeaturedCourseHero.tsx`
- **Purpose**: Highlights the single active/available flagship course.
- **Visual Design**: Dark Slate (`#020617`) background with glowing radial cyan/emerald light blobs and subtle circuit pattern grid overlay.
- **Left Column**:
  - AI Tagline Pill with animated `Bot` icon.
  - Bold gradient headline: *"Learn. Practice. Advance."*
  - Key bullet points with checkmark icons (e.g. FBR IRIS filing, AI legal drafting).
  - Primary CTA (`Enroll Now`) + Secondary CTA (`View Syllabus`).
- **Right Column**:
  - Interactive Preview Card featuring course video thumbnail, live student counter, rating badge, level indicator, and mobile app download indicator.

#### 2. `TrustStrip.tsx`
- **Purpose**: Establishes immediate institutional credibility.
- **Visual Design**: Clean white frosted strip with subtle border.
- **Elements**: Icons & badges for FBR Compliance, SECP Filing, ISO Certification, and Live Hands-on Practical Training.

#### 3. `UpcomingAcademySection.tsx` & `CourseFilterBar.tsx`
- **Purpose**: Showcases upcoming masterclasses organized by domain categories.
- **Interactive Controls**:
  - **Search Bar**: Real-time keyword filtering.
  - **Category Pills**: Filter by `All`, `Taxation & Compliance`, `Corporate & Legal`, `AI & Tech`, `Audit & Accounts`.
- **Card Grid**: Responsive 1 / 2 / 3 column grid of `UpcomingCourseCard.tsx`.

#### 4. `UpcomingCourseCard.tsx`
- **Visual Design**: Sleek white card with shadow hover elevation.
- **Content Elements**:
  - Category Badge & "Coming Soon" status tag.
  - Course Title & Short Summary.
  - Instructor Avatar, Name, and Designation.
  - Duration & Skill Level Pills.
  - **"Notify Me When Available"** action button.

#### 5. `NotifyModal.tsx`
- **Purpose**: Accessible popup modal allowing users to register interest for upcoming courses.
- **Fields**: Full Name, Email Address, WhatsApp Number.
- **Feedback**: Instant interactive checkmark success view upon submission.

---

## 🎓 Page 2: Course Detail Page (`/courses/[slug]`)

The Course Detail page uses a 2-Column Responsive Layout (Main Content 8 Cols / Sticky Sidebar 4 Cols) with sticky tab navigation.

```
+-------------------------------------------------------------------+
| 1. Course Detail Hero Header (Light Aesthetic)                     |
|    - Breadcrumbs, Category Pill, Title, Subtitle                  |
|    - Instructor Info, Ratings, Students Count, Meta Pills         |
+-------------------------------------------------------------------+
| 2. Sticky Tab Navigation Bar (Overview, Curriculum, Instructor...) |
+-------------------------------------------------------------------+
| MAIN CONTENT GRID (12 Cols)                                       |
|                                                                   |
| [ Left Column: 8 Cols ]         | [ Right Column: 4 Cols ]        |
| Tab Content View (Dynamic)      | Sticky Course Sidebar           |
|  - TabOverview                  |  - Course Price & Discount      |
|  - TabCurriculum                |  - Primary Action Button        |
|  - TabInstructor                |  - What's Included Checklist    |
|  - TabProjects                  |  - App Access & Certificate UI  |
|  - TabRequirements              |                                 |
|  - TabReviews                   |                                 |
|  - TabFAQs                      |                                 |
+---------------------------------+---------------------------------+
| 3. Related Courses Carousel                                       |
+-------------------------------------------------------------------+
```

### Detailed Component Specifications

#### 1. `CourseDetailHero.tsx`
- **Design**: Clean light background header with breadcrumb path (`Home > Courses > Course Name`).
- **Highlights**:
  - High-visibility category badge.
  - Large main course title.
  - Quick metadata strip: ⭐ Rating & Review count, 👥 Student count, ⏱️ Total Duration, 🌐 Language, 📱 Format (`Mobile App + Live/Recorded`).

#### 2. `StickyCourseTabs.tsx`
- **Design**: Fixed/Sticky top navigation bar (`top-20 z-30`) with backdrop blur.
- **Tabs**:
  1. `Overview`
  2. `Curriculum`
  3. `Instructor`
  4. `Projects`
  5. `Requirements`
  6. `Reviews`
  7. `FAQs`
- **Interaction**: Active tab indicated by emerald pill indicator with smooth slide animations.

#### 3. Interactive Tab Views (`components/courses/detail/`)

- 📌 **`TabOverview.tsx`**:
  - Detailed Description body text.
  - Key Learning Objectives grid with green checkmark cards.
  - "Who Is This Course For?" bulleted cards.
  - Career Opportunities & Skill Badges tag cloud.
  - Certificate Preview Card highlighting accreditation.

- 📚 **`TabCurriculum.tsx`**:
  - Interactive module accordions with expandable lesson lists.
  - Lesson type indicators (`video`, `practical_demo`, `case_study`).
  - Total module count and hours summary header.

- 👨‍🏫 **`TabInstructor.tsx`**:
  - Comprehensive instructor profile card with avatar image.
  - Biography, Teaching Philosophy, Years of Experience.
  - Areas of Expertise tags & Education/Certifications checklist.
  - Direct LinkedIn & Social buttons.

- 🛠️ **`TabProjects.tsx`**:
  - Real-world case study cards.
  - Tool badges (e.g. `FBR Iris Portal`, `SECP eServices`, `MS Excel`, `AI Prompt Studio`).
  - Difficulty level tag (`Beginner`, `Intermediate`, `Advanced`) and estimated hours.

- 📋 **`TabRequirements.tsx`**:
  - Prerequisites checklist (e.g., Basic accounting knowledge, Laptop with Internet).

- ⭐ **`TabReviews.tsx`**:
  - Overall rating summary card with star distribution progress bars (5-star down to 1-star).
  - Student review cards with avatars, date, rating stars, comment text, and helpful count buttons.

- ❓ **`TabFAQs.tsx`**:
  - Searchable accordion list answering key course questions.

#### 4. `CourseSidebar.tsx`
- **Design**: Sticky right-side panel (`sticky top-28`).
- **Elements**:
  - Video/Image Preview Thumbnail with play overlay.
  - Pricing box showing Current Price, Original Price (strikethrough), and Discount Percentage.
  - Direct Action Button (`Enroll Now` for available courses or `Get Notified` for upcoming).
  - Guarantee/Highlight strip (e.g., 7-Day Money-Back Guarantee, Lifetime Access on Mobile & Web).
  - "This Course Includes" checklist with icons (Full Lifetime Access, Certificate of Completion, Downloadable Case Studies, Mobile App Access).

#### 5. `RelatedCoursesCarousel.tsx`
- **Design**: Touch-friendly horizontal slider for related masterclasses.
- **Controls**: Previous / Next navigation buttons with smooth scroll.

---

## 🛠️ 3. Complete UI Component File Map

All UI components are organized within `premier_LMS_Frontend/`:

```
premier_LMS_Frontend/
├── app/
│   └── courses/
│       ├── page.tsx                           # Main Course Catalog Page View
│       └── [slug]/
│           └── page.tsx                       # Course Detail Page View
│
├── components/courses/
│   ├── FeaturedCourseHero.tsx                 # Main Cyber Hero Banner
│   ├── TrustStrip.tsx                         # Institutional Accreditation Strip
│   ├── UpcomingAcademySection.tsx            # Upcoming Courses Container
│   ├── CourseFilterBar.tsx                    # Search & Category Filter Bar
│   ├── CourseCard.tsx                         # General Course Card
│   ├── UpcomingCourseCard.tsx                 # Upcoming Course Card UI
│   ├── CourseStats.tsx                        # Course Metrics Counter Strip
│   ├── NotifyModal.tsx                        # Registration Popup Modal
│   └── detail/
│       ├── CourseDetailHero.tsx               # Course Detail Page Header
│       ├── StickyCourseTabs.tsx               # Sticky Tab Navigation Bar
│       ├── TabOverview.tsx                    # Overview Tab Content
│       ├── TabCurriculum.tsx                  # Curriculum Accordions Tab
│       ├── TabInstructor.tsx                  # Instructor Profile Tab
│       ├── TabProjects.tsx                    # Hands-on Practical Projects Tab
│       ├── TabRequirements.tsx                # Requirements & Prerequisites Tab
│       ├── TabReviews.tsx                     # Rating & Reviews Tab
│       ├── TabFAQs.tsx                        # Accordion FAQ Tab
│       ├── CourseSidebar.tsx                  # Sticky Pricing & Enrollment Sidebar
│       ├── CourseCTA.tsx                      # Conversion Banner
│       └── RelatedCoursesCarousel.tsx         # Related Courses Carousel
│
└── lib/
    └── coursesData.ts                         # Course UI Data Interfaces & Mock Data
```

---

## 📋 4. Interface Types Reference (`lib/coursesData.ts`)

```typescript
export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: 'Available' | 'Coming Soon';
  badge?: string;
  duration: string;
  weeksCount: number;
  level: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
    bio: string;
    experience: string;
    expertise: string[];
  };
  rating: number;
  reviewCount: number;
  price: number | null;
  originalPrice: number;
  discountPercent?: number;
  thumbnail: string;
  shortDescription: string;
  fullDescription: string;
  modules: CurriculumModule[];
  projects: CourseCaseStudy[];
  reviews: CourseReview[];
  faqs: CourseFAQ[];
}
```

---
*Documented for Premier LMS Frontend UI Design Specification.*
