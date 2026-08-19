# UI, UX, and Motion Architecture Specifications — Premier LMS

## Core Visual Token System
- Primary Canvas: Dark Cosmic Slate (`bg-[#090D16]`)
- Panel Blocks: Translucent Charcoal (`bg-[#121826]/60`) accented with a strict `backdrop-blur-md`
- Border Profiles: Low-opacity slate (`border-slate-800/60`) flashing to dynamic neon-emerald transitions (`hover:border-emerald-500/40`) upon cursor proximity
- Brand Accent Gradients: From deep indigo (`from-indigo-500`) to vibrant emerald (`to-emerald-400`)

## Standard Motion Configuration Array
- Micro-interactions (Buttons/Triggers): `whileHover={{ scale: 1.02 }}` and `whileTap={{ scale: 0.98 }}`
- Card Entrances: `initial={{ opacity: 0, y: 20 }}` with smooth physics transition setups (`animate={{ opacity: 1, y: 0 }}`) using a transition config of `duration: 0.4, ease: "easeOut"`
- Staggered Lists: Children components must append an intrinsic multiplier delay of `0.05s`
