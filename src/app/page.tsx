"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const screenshots = [
  { src: "/assets/screenshot-1.png", title: "HR360 — AI-Powered HR & Payroll Portal", tag: "Full Stack + AI", isApp: false },
  { src: "/assets/screenshot-2.png", title: "AIQP — AI Question Paper Generator", tag: "Python · FastAPI · OpenAI", isApp: false },
  { src: "/assets/screenshot-3.png", title: "AIQP — Source PDF Parsing & Diagram Extraction", tag: "AIQP · Document Processing", isApp: false },
  { src: "/assets/screenshot-4.png", title: "AIQP — Question Bank & Duplicate Detection", tag: "AIQP · Vector Search", isApp: false },
  { src: "/assets/screenshot-5.png", title: "AIQP — Syllabus Mapping & Exam Paper Reviewer", tag: "AIQP · Publishing Workflow", isApp: false },
  { src: "/assets/balmukund.jpeg", title: "EmpQuick — AI Job Portal & Candidate Dashboard", tag: "React.js · Node.js · OpenAI", isApp: true },
  { src: "/assets/empquick.jpeg", title: "Balmukund Super Steel — Mobile Ordering & Attendance App", tag: "React Native · AiSensy", isApp: true },
  { src: "/assets/aiqp.jpeg", title: "Civils Adda — Exam Prep Platform Mobile App", tag: "React Native · Firebase", isApp: true },
  { src: "/assets/proctor-ai.jpeg", title: "Balmukund Super Steel — Orders & Admin Dashboard", tag: "React Native · AiSensy", isApp: true },
];

function ProjectScreenshotSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (idx: number, direction?: "next" | "prev") => {
      if (isAnimating || idx === current) return;
      const dir = direction ?? (idx > current ? "next" : "prev");
      const xFrom = dir === "next" ? "100%" : "-100%";
      const xTo = dir === "next" ? "-100%" : "100%";

      setIsAnimating(true);
      const outSlide = slideRefs.current[current];
      const inSlide = slideRefs.current[idx];
      if (!outSlide || !inSlide) {
        setCurrent(idx);
        setIsAnimating(false);
        return;
      }

      // Position incoming slide off-screen
      gsap.set(inSlide, { x: xFrom, opacity: 1, zIndex: 2 });
      gsap.set(outSlide, { zIndex: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(outSlide, { x: "0%", zIndex: 0, opacity: 0 });
          setCurrent(idx);
          setIsAnimating(false);
        },
      });

      tl.to(outSlide, { x: xTo, duration: 0.55, ease: "power3.inOut" }, 0)
        .to(inSlide, { x: "0%", duration: 0.55, ease: "power3.inOut" }, 0);

      // Caption fade
      const caption = inSlide.querySelector(".slider-caption-inner");
      if (caption) {
        gsap.fromTo(caption, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.35, ease: "power2.out" });
      }
    },
    [current, isAnimating]
  );

  const next = useCallback(() => {
    const nextIdx = (current + 1) % screenshots.length;
    goTo(nextIdx, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    const prevIdx = (current - 1 + screenshots.length) % screenshots.length;
    goTo(prevIdx, "prev");
  }, [current, goTo]);

  // Initialize all slides
  useEffect(() => {
    slideRefs.current.forEach((slide, i) => {
      if (slide) {
        gsap.set(slide, { x: "0%", opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 });
      }
    });
  }, []);

  // Auto play
  useEffect(() => {
    autoPlayRef.current = setInterval(next, 4000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [next]);

  // Entrance animation
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 40, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
          );
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="gsap-slider-wrap" ref={containerRef}>
      {/* Slide track */}
      <div className="gsap-slider-track">
        {screenshots.map((s, i) => (
          <div
            key={i}
            ref={(el) => { slideRefs.current[i] = el; }}
            className={`gsap-slide ${s.isApp ? "is-app-slide" : ""}`}
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            {s.isApp && (
              <div className="gsap-slide-bg-blur">
                <Image src={s.src} alt="" fill sizes="100vw" style={{ objectFit: "cover", filter: "blur(24px) brightness(0.25)" }} />
              </div>
            )}
            <Image
              src={s.src}
              alt={s.title}
              width={1200}
              height={720}
              className={`gsap-slide-img ${s.isApp ? "fit-contain" : ""}`}
              draggable={false}
              priority={i === 0}
            />
            <div className="gsap-caption">
              <div className="slider-caption-inner">
                <span className="gsap-cap-tag">{s.tag}</span>
                <div className="gsap-cap-title">{s.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nav buttons */}
      <button
        className="gsap-nav-btn gsap-nav-left"
        onClick={() => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); prev(); }}
        aria-label="Previous"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="gsap-nav-btn gsap-nav-right"
        onClick={() => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); next(); }}
        aria-label="Next"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Progress bar */}
      <div className="gsap-progress-bar">
        <div
          className="gsap-progress-fill"
          style={{ width: `${((current + 1) / screenshots.length) * 100}%` }}
        />
      </div>

      {/* Dots */}
      <div className="gsap-dots">
        {screenshots.map((_, i) => (
          <button
            key={i}
            className={`gsap-dot ${i === current ? "active" : ""}`}
            onClick={() => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); goTo(i); }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="gsap-counter">
        <span>{String(current + 1).padStart(2, "0")}</span>
        <span className="gsap-counter-sep">/</span>
        <span>{String(screenshots.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

function TerminalAnimation() {
  const [copied, setCopied] = useState(false);

  const code = `class Developer:
    name = "Shalini Sinha"
    role = "Full Stack Developer — AI"
    stack = ["React", "Python", "FastAPI", "Node.js"]
    status = "Available for opportunities"`;

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal">
      <div className="term-head">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ background: "#e5534b", width: 10, height: 10, borderRadius: "50%", display: "inline-block" }} />
          <span style={{ background: "#e0a64d", width: 10, height: 10, borderRadius: "50%", display: "inline-block" }} />
          <span style={{ background: "#57ab5a", width: 10, height: 10, borderRadius: "50%", display: "inline-block" }} />
          <span className="term-title" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 12, marginLeft: 6 }}>whoami.py</span>
        </div>
        <button
          onClick={copyCode}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: copied ? "var(--accent)" : "var(--muted)",
            background: "transparent",
            border: "1px solid var(--line)",
            borderRadius: "6px",
            padding: "3px 10px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>

      <div className="term-body" style={{ padding: "20px 22px", minHeight: "auto" }}>
        <pre style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "13px", lineHeight: "1.85" }}>
          <code>
            <span style={{ color: "#C792EA" }}>class</span> <span style={{ color: "#5EEAD4" }}>Developer</span>:<br />
            {"    "}<span style={{ color: "#F0B429" }}>name</span> = <span style={{ color: "#5EEAD4" }}>&quot;Shalini Sinha&quot;</span><br />
            {"    "}<span style={{ color: "#F0B429" }}>role</span> = <span style={{ color: "#5EEAD4" }}>&quot;Full Stack Developer — AI&quot;</span><br />
            {"    "}<span style={{ color: "#F0B429" }}>stack</span> = [<span style={{ color: "#34d399" }}>&quot;React&quot;</span>, <span style={{ color: "#34d399" }}>&quot;Python&quot;</span>, <span style={{ color: "#34d399" }}>&quot;FastAPI&quot;</span>, <span style={{ color: "#34d399" }}>&quot;Node.js&quot;</span>]<br />
            {"    "}<span style={{ color: "#F0B429" }}>status</span> = <span style={{ color: "#34d399" }}>&quot;Available for opportunities 🟢&quot;</span>
          </code>
        </pre>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const revealEls = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "experience", "projects", "screenshots", "achievements", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 64 }}>
          <div className="nav-mark">SHALINI <span>SINHA</span></div>
          <div className="nav-links" style={{ alignItems: "center" }}>
            {[
              { id: "about", name: "About" },
              { id: "skills", name: "Skills" },
              { id: "experience", name: "Experience" },
              { id: "projects", name: "Projects" },
              { id: "screenshots", name: "Screenshots" },
              { id: "achievements", name: "Achievements" },
              { id: "contact", name: "Contact" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                style={{ color: activeSection === item.id ? "#E9EEF3" : undefined }}
              >
                {item.name}
              </a>
            ))}
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Shalini_Sinha_Resume.pdf"
              className="btn btn-primary"
              style={{ padding: "6px 14px", fontSize: "12px", borderRadius: "6px", textDecoration: "none", marginLeft: "8px" }}
            >
              Resume 📄
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="avatar-ring">
              <Image src="/assets/profile.jpeg" alt="Shalini Sinha" width={76} height={76} />
            </div>
            <div className="eyebrow-row">
              <span className="dot" /> Available For Opportunities
            </div>
            <h1 className="headline">
              Full Stack Developer<br />
              <span className="line2">Building AI Into Everyday Products.</span>
            </h1>
            <p className="hero-desc">
              3+ Years Shipping Production Apps with <b>React, React Native, Node.js, Python &amp; FastAPI</b> — Resume Scoring, PDF Parsing, Exam Proctoring, and Chatbots Used by Real People, Not Demos.
            </p>
            <div className="hero-cta" style={{ flexWrap: "wrap", gap: "10px" }}>
              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Shalini_Sinha_Resume.pdf"
                className="btn btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>
              <a href="#projects" className="btn btn-ghost" onClick={(e) => { e.preventDefault(); scrollToSection("projects"); }}>View Projects →</a>
              <a href="mailto:shalinisinha.cspatna@gmail.com" className="btn btn-ghost">Get In Touch</a>
            </div>
          </div>
          <TerminalAnimation />
        </div>
      </header>

      {/* ABOUT */}
      <section id="about">
        <div className="wrap">
          <div className="sec-head reveal" data-reveal>
            <span className="sec-num">01</span>
            <span className="sec-title">About</span>
          </div>
          <p className="about-text reveal" data-reveal>
            Currently building at <b>DgCrux Technology</b>, where I&apos;ve architected an AI Question-Paper Platform, a Real-Time Exam-Proctoring System using Computer Vision, and an AI-driven Job Portal with Resume Parsing and Scoring. Before that, I spent nearly two years at <b>Mania Group of Technology</b> shipping Full-Stack MERN applications with Real-Time features and Payment Integrations. I care about production quality — API performance, clean database queries, and apps that hold up under real usage.
          </p>
          <div className="stat-row">
            <div className="stat reveal" data-reveal>
              <div className="stat-num">3+</div>
              <div className="stat-label">YEARS IN PRODUCTION</div>
            </div>
            <div className="stat reveal" data-reveal>
              <div className="stat-num">10+</div>
              <div className="stat-label">SHIPPED APPLICATIONS</div>
            </div>
            <div className="stat reveal" data-reveal>
              <div className="stat-num">6</div>
              <div className="stat-label">AI-POWERED FEATURES</div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="wrap">
          <div className="sec-head reveal" data-reveal>
            <span className="sec-num">02</span>
            <span className="sec-title">Skills</span>
          </div>
          <div className="skill-groups">
            {[
              { cat: "LANGUAGES", skills: ["JavaScript", "Python", "SQL"] },
              { cat: "FRONTEND", skills: ["React.js", "Next.js", "React Native", "Redux", "Tailwind CSS", "Material UI"] },
              { cat: "BACKEND", skills: ["Node.js", "Express.js", "FastAPI", "Spring Boot", "Socket.IO", "REST APIs"] },
              { cat: "DATABASES", skills: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"] },
              { cat: "AI / CV", skills: ["OpenAI API", "OpenCV", "MediaPipe", "WebRTC VAD", "Resume Parsing"] },
              { cat: "DEVOPS", skills: ["Docker", "Redis", "AWS EC2", "DigitalOcean", "Nginx", "Git"] },
            ].map((group) => (
              <div key={group.cat} className="skill-row reveal" data-reveal>
                <div className="skill-cat">{group.cat}</div>
                <div className="skill-tags">
                  {group.skills.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="wrap">
          <div className="sec-head reveal" data-reveal>
            <span className="sec-num">03</span>
            <span className="sec-title">Experience</span>
          </div>
          <div className="timeline">
            <div className="tl-item reveal" data-reveal>
              <div className="tl-role">Software Developer</div>
              <div className="tl-org">DgCrux Technology Pvt. Ltd.</div>
              <div className="tl-date">May 2025 — Present</div>
              <ul className="tl-list">
                <li>Architected <b>AIQP</b>, an AI Question-Paper Platform with PDF Parsing, Diagram Support, and Duplicate Detection, on Python, FastAPI &amp; OpenAI.</li>
                <li>Built <b>Proctor AI</b> — Real-Time Exam Proctoring with Live Noise Detection and Activity-Flag Detection via Google MediaPipe.</li>
                <li>Developed <b>EmpQuick</b>, an AI Job Portal with Resume Parsing, AI-based Scoring, and One-Click Easy Apply.</li>
                <li>Delivered Recruitment Portals for <b>AIIMS Patna</b> (Spring Boot) and <b>FTII</b> (React.js, Node.js).</li>
                <li>Own End-to-End Mobile Delivery for <b>FindTeacher</b> and <b>Ezamu</b>, including App Store Releases.</li>
              </ul>
            </div>
            <div className="tl-item reveal" data-reveal>
              <div className="tl-role">Full Stack Developer</div>
              <div className="tl-org">Mania Group of Technology</div>
              <div className="tl-date">Jul 2023 — Apr 2025</div>
              <ul className="tl-list">
                <li>Built Full-Stack MERN Applications with REST APIs and Responsive UI.</li>
                <li>Shipped Real-Time Features via Socket.IO, Integrated PhonePe Payments and MSG91 OTP Authentication.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="wrap">
          <div className="sec-head reveal" data-reveal>
            <span className="sec-num">04</span>
            <span className="sec-title">Selected Projects</span>
          </div>
          <div className="proj-grid reveal" data-reveal>
            {[
              { title: "HR360", desc: "End-to-end HR & employee management portal — attendance, payroll, recruitment, ATS resume scoring, and auto-generated job links, backed by an AI chatbot that answers employees' company and policy questions directly, with Gmail and Google Calendar integration for scheduling and notifications.", stack: ["Python", "OpenAI", "Google Mail API", "Google Calendar API", "ATS Scoring"] },
              { title: "AIQP", desc: "AI-powered question-paper platform for exam bodies — parses source PDFs including diagrams, generates fresh questions with OpenAI, flags duplicates against the existing question bank, and lets reviewers bookmark and manage syllabus-wise content before publishing.", stack: ["Python", "FastAPI", "OpenAI"] },
              { title: "Proctor AI", desc: "Real-time exam proctoring system built for remote testing — detects background noise with WebRTC VAD, tracks candidate activity and posture with Google MediaPipe, and streams live flags to invigilators over Socket.IO during the exam window.", stack: ["MediaPipe", "Socket.IO", "WebRTC VAD"] },
              { title: "EmpQuick", desc: "AI-driven job portal that parses uploaded resumes, scores them against job requirements with OpenAI, and surfaces matched roles to candidates — with a one-click Easy Apply flow that removes the usual friction from applying.", stack: ["React.js", "Node.js", "OpenAI"] },
              { title: "Civils Adda", desc: "Government exam prep platform spanning web and mobile — handles full test workflows, instant results and rankings, exam scheduling, and Firebase push notifications to keep aspirants updated on new tests and results.", stack: ["React Native", "Firebase"] },
              { title: "Balmukund Super Steel", desc: "Android/iOS app serving six role types — Admin, Sales, Dealer, Distributor, Mason, Employee — covering attendance, leave, and paginated order management, plus WhatsApp ordering via AiSensy with automated alerts for orders, attendance, and leave.", stack: ["React Native", "AiSensy"] },
              { title: "AIIMS Patna Recruitment Portal", desc: "Backend system for AIIMS Patna's recruitment drives — built candidate application APIs, role-based access for admin and reviewers, application status tracking, and document handling, with Spring Boot powering the core service layer for a high-traffic government hiring cycle.", stack: ["Spring Boot", "Java", "REST APIs", "MySQL"] },
              { title: "FTII Recruitment Portal", desc: "Full candidate-facing recruitment platform for FTII — built the UI in React.js along with backend workflows in Node.js, covering job listings, application forms, submission tracking, and admin review screens, integrated end-to-end with REST APIs.", stack: ["React.js", "Node.js", "Express.js", "MongoDB"] },
            ].map((proj, i) => (
              <div key={i} className="proj-card">
                <div className="proj-title">{proj.title}</div>
                <div className="proj-desc">{proj.desc}</div>
                <div className="proj-stack">
                  {proj.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="wrap">
          <div className="sec-head reveal" data-reveal>
            <span className="sec-num">05</span>
            <span className="sec-title">Education</span>
          </div>
          <div className="edu-card reveal" data-reveal>
            <div>
              <div className="edu-name">Bachelor of Computer Applications</div>
              <div className="edu-org">Patna Women&apos;s College, Patna · 2021</div>
            </div>
            <div className="edu-score">CGPA 9.64</div>
          </div>
          <div className="edu-mini reveal" data-reveal>
            12th — Holy Mission Senior Secondary School (89%) · 10th — St. John Residential Public School (9.8 CGPA)
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements">
        <div className="wrap">
          <div className="sec-head reveal" data-reveal>
            <span className="sec-num">06</span>
            <span className="sec-title">Achievements</span>
          </div>
          <div className="ach-grid">
            {/* Card 1 — Certificate */}
            <div className="ach-card reveal" data-reveal>
              <div className="ach-img-wrap">
                <Image src="/assets/certificate.jpeg" alt="MERN Stack mentorship certificate" width={600} height={400} />
              </div>
              <div className="ach-body">
                <span className="ach-tag">MENTORSHIP</span>
                <div className="ach-title">Trained An Intern In MERN Stack Fundamentals</div>
                <div className="ach-desc">Mentored an engineering student from Siwan on a MERN Stack internship program at DgCrux Technology, guiding them from fundamentals through hands-on project work — recognized as Mentor on their completion certificate.</div>
              </div>
            </div>

            {/* Card 2 — Manager Message */}
            <div className="ach-card reveal" data-reveal>
              <div className="ach-img-wrap dark">
                <Image src="/assets/msg.jpeg" alt="Manager appreciation message" width={600} height={400} />
              </div>
              <div className="ach-body">
                <span className="ach-tag">RECOGNITION</span>
                <div className="ach-title">Called Out By Leadership For The AIIMS Patna Delivery</div>
                <div className="ach-desc">When the AIIMS Patna Recruitment Portal shipped on schedule, the Managing Director recognized my dedication and effort by name to the whole team.</div>
              </div>
            </div>

            {/* Card 3 — Google Reviews (student.png) — full width */}
            <div className="ach-card ach-card-wide reveal" data-reveal>
              <div className="ach-img-wrap ach-img-reviews">
                <Image
                  src="/assets/student.png"
                  alt="Student & client Google reviews for DgCrux Technology"
                  width={1200}
                  height={750}
                  className="ach-review-img"
                  quality={95}
                />
              </div>
              <div className="ach-body">
                <span className="ach-tag">STUDENT REVIEWS</span>
                <div className="ach-title">Google Reviews — 5.0 ★ Student &amp; Client Feedback</div>
                <div className="ach-desc">
                  Positive feedback and appreciation from students and clients for MERN stack mentorship, hands-on training, and project delivery at DgCrux Technology.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT SCREENSHOTS */}
      <section id="screenshots">
        <div className="wrap">
          <div className="sec-head reveal" data-reveal>
            <span className="sec-num">07</span>
            <span className="sec-title">Project Screenshots</span>
          </div>
          <ProjectScreenshotSlider />
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact">
        <div className="wrap">
          <div className="contact-title reveal" data-reveal>
            Let&apos;s Build Something <span>Useful</span> Together.
          </div>
          <p className="about-text reveal" data-reveal style={{ maxWidth: "50ch" }}>
            Open to full-stack and AI-focused roles. Reach out directly, or find me on GitHub and LinkedIn.
          </p>
          <div className="contact-links reveal" data-reveal>
            <a className="clink" href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" download="Shalini_Sinha_Resume.pdf" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>📄 Download Resume (PDF)</a>
            <a className="clink" href="mailto:shalinisinha.cspatna@gmail.com">✉ Email: shalinisinha.cspatna@gmail.com</a>
            <a className="clink" href="tel:+916201041137">☎ Call: +91 6201041137</a>
            <a className="clink" href="https://github.com/Shalinisinha22" target="_blank" rel="noopener noreferrer">⌥ GitHub</a>
            <a className="clink" href="https://www.linkedin.com/in/shalini-sinha-bbb943202" target="_blank" rel="noopener noreferrer">in LinkedIn</a>
            <a className="clink" href="#about">◆ Portfolio</a>
          </div>
          <div className="foot-bottom">
            <span>Shalini Sinha — Patna, India</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
