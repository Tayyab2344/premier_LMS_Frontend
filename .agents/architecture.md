# Engineering & System Architecture Specs — Premier LMS

## Technology Stack Blueprint
- Framework: Next.js (App Router, utilizing Server Components for layouts and Client Components for motion hooks)
- Styling: Tailwind CSS (Strictly using utility primitives; no plain inline styles)
- Animation System: Framer Motion
- UI Primitive System: Radix UI / Token-Based Layouts
- Iconographic Engine: Lucide React (Strokes configured strictly to `1.5` or `2` for elegance)

## System Constraints
- Group all customized visual components inside `src/components/premier-lms/`.
- All layouts must feature responsive grid matrices; pixel-fixed width wrappers are strictly prohibited.
