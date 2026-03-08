"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  Globe,
  Server,
  Database,
  Brain,
  Smartphone,
  Code,
  Layout,
  Briefcase,
  GraduationCap,
  Trophy,
  ArrowRight,
  MessageCircle,
  Menu,
  X
} from "lucide-react";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-indigo-500/30">

      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050505] to-[#050505]"></div>
      <div className="fixed inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tighter text-white">Shalini<span className="text-indigo-500">.dev</span></span>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#achievements" className="hover:text-white transition-colors">Achievements</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
            >
              <Download size={16} /> Resume
            </a>
            <button
              className="md:hidden text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-16 left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 p-6 flex flex-col gap-4 shadow-xl text-center"
            >
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white text-lg font-medium transition-colors py-2">About</a>
              <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white text-lg font-medium transition-colors py-2">Skills</a>
              <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white text-lg font-medium transition-colors py-2">Experience</a>
              <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white text-lg font-medium transition-colors py-2">Projects</a>
              <a href="#achievements" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white text-lg font-medium transition-colors py-2">Achievements</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white text-lg font-medium transition-colors py-2">Contact</a>

              <a
                href="/resume.pdf"
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 mt-4 px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-all"
              >
                <Download size={20} /> Download Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">

        {/* Hero Section */}
        <section id="about" className="min-h-[80vh] flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <Image
              src="/profile.jpeg"
              alt="Shalini Sinha"
              width={160}
              height={160}
              className="relative rounded-full border-2 border-white/10 object-cover shadow-2xl h-40 w-40"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6"
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Shalini Sinha</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-10 leading-relaxed text-center"
          >
            Software Developer specializing in <strong className="text-slate-200 font-medium">Full Stack (MERN)</strong> and <strong className="text-slate-200 font-medium">AI Systems</strong>. Building scalable, intelligent, and engaging applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a href="mailto:shalinisinha.cspatna@gmail.com" className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-all hover:scale-110">
              <Mail size={24} />
            </a>
            <a href="https://wa.me/916201041137" target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-green-400 hover:text-green-300 transition-all hover:scale-110">
              <MessageCircle size={24} />
            </a>
            <a href="https://github.com/Shalinisinha22" target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-all hover:scale-110">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/shalini-sinha-bbb943202" target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-all hover:scale-110">
              <Linkedin size={24} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <a href="#projects" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-all hover:scale-105 flex items-center gap-2">
              View My Work <ArrowRight size={18} />
            </a>
            <a href="#contact" className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-medium transition-all hover:scale-105">
              Contact Me
            </a>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 border-t border-white/5">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Arsenal</h2>
            <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <SkillCard
              icon={<Code className="text-blue-400" size={32} />}
              title="Frontend"
              skills="React.js, Next.js, React Native, Redux, Tailwind CSS, Material UI, HTML5, CSS3"
            />
            <SkillCard
              icon={<Server className="text-green-400" size={32} />}
              title="Backend"
              skills="Node.js, Express.js, FastAPI, Spring Boot, REST APIs, Socket.IO"
            />
            <SkillCard
              icon={<Database className="text-yellow-400" size={32} />}
              title="Databases"
              skills="MongoDB, MySQL, Firebase"
            />
            <SkillCard
              icon={<Brain className="text-purple-400" size={32} />}
              title="AI / Computer Vision"
              skills="OpenAI API, OpenCV, MediaPipe, WebRTC VAD"
            />
            <SkillCard
              icon={<Layout className="text-pink-400" size={32} />}
              title="Languages & Tools"
              skills="JavaScript, Python, Git, Nginx, Apache, Expo, Render, Postman"
            />
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 border-t border-white/5">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Professional Experience</h2>
            <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
          </motion.div>

          <div className="space-y-12">
            <ExperienceItem
              title="Software Developer"
              company="DgCrux Technology Pvt. Ltd."
              date="May 2025 – Present" // Used exact dates from resume, though it overlaps with present
              description={[
                "Built AIQP, an AI-powered question paper generator using Python, FastAPI, and OpenAI APIs to automatically generate exams.",
                "Implemented LLM-based automated answer evaluation with grading and feedback generation.",
                "Developed Proctor AI, an AI-based remote exam monitoring platform using React.js, Python, OpenCV, MediaPipe, and WebRTC.",
                "Contributed to the AIIMS Recruitment Portal using React.js with Spring Boot backend.",
                "Developed EmpQuick, a React Native job marketplace app published on Google Play Store."
              ]}
            />
            <ExperienceItem
              title="Full Stack Developer"
              company="Mania Group of Technology"
              date="Jul 2023 – Feb 2024"
              description={[
                "Developed MERN stack applications using React.js, Node.js, Express.js, and MongoDB.",
                "Implemented real-time communication functionality using Socket.IO.",
                "Integrated PhonePe payment gateway and Msg91 OTP authentication handles."
              ]}
            />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 border-t border-white/5">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <ProjectCard
              title="AIQP – AI Question Paper Generator"
              tech="Python, FastAPI, OpenAI API"
              description="AI-based platform generating exam papers based on syllabus and difficulty levels automatically, integrated with LLM evaluation."
            />
            <ProjectCard
              title="Proctor AI – Online Exam Monitoring"
              tech="React.js, Python, OpenCV, MediaPipe"
              description="AI-powered proctoring system detecting suspicious activity using facial recognition tracking and advanced noise monitoring algorithms."
            />
            <ProjectCard
              title="EmpQuick – Job Marketplace"
              tech="React Native, Node.js, MongoDB"
              description="Comprehensive mobile recruitment platform directly connecting employers and job seekers, published on the Google Play Store."
            />
            <ProjectCard
              title="Balmukund Super Steel"
              tech="React Native, React.js, Node.js"
              description="Developed the official company mobile application and core website focusing on highly optimized UI and overall performance gains."
            />
          </motion.div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 border-t border-white/5">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Education</h2>
            <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                <GraduationCap size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Bachelor of Computer Applications</h3>
                <p className="text-indigo-400 font-medium mb-2">Patna Women's College, Patna</p>
                <p className="text-slate-400 text-sm mb-4">Graduated: 2021 | CGPA: 9.64</p>

                <div className="space-y-2 text-sm text-slate-300">
                  <p><span className="text-slate-500">2018:</span> 12th - Holy Mission Senior Secondary School, Patna (89%)</p>
                  <p><span className="text-slate-500">2016:</span> 10th - St. John Residential Public School, Patna (9.8 CGPA)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      {/* Achievements Section */}
      <section id="achievements" className="py-24 border-t border-white/5 max-w-6xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Achievements</h2>
          <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <AchievementCard
            title="15-Day MERN Bootcamp"
            description="Completed an intensive 15-day MERN Stack Internship Training Program covering React.js, Node.js, Express.js, and MongoDB."
          />
          <AchievementCard
            title="Production Systems Built"
            description="Developed multiple production-ready web and mobile applications from scratch, including complex AI platforms and recruitment systems."
          />
          <AchievementCard
            title="Real-world AI Integration"
            description="Extensive hands-on experience cleanly integrating Generative AI APIs and specialized computer vision tracking into real-world projects."
          />
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 border-t border-white/5 max-w-4xl mx-auto px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mb-8">
          <div className="inline-block p-4 bg-green-500/10 rounded-full text-green-400 mb-6">
            <MessageCircle size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Build Something.</h2>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            I am currently open to new opportunities. Whether you have a question, a project idea, or just want to chat, message me on WhatsApp!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/916201041137"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.4)] w-full sm:w-auto"
            >
              <MessageCircle size={20} /> Message on WhatsApp
            </a>
            <a
              href="mailto:shalinisinha.cspatna@gmail.com"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-bold text-lg transition-all hover:scale-105 w-full sm:w-auto"
            >
              <Mail size={20} /> Send an Email
            </a>
          </div>
        </motion.div>
      </section>

      
    </div>
  );
}

// Subcomponents

function SkillCard({ icon, title, skills }: { icon: React.ReactNode, title: string, skills: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all hover:-translate-y-1 group"
    >
      <div className="mb-4 bg-white/5 w-14 h-14 rounded-xl flex justify-center items-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{skills}</p>
    </motion.div>
  );
}

function ExperienceItem({ title, company, date, description }: { title: string, company: string, date: string, description: string[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      className="relative pl-8 md:pl-0"
    >
      <div className="md:grid md:grid-cols-12 gap-6">
        <div className="md:col-span-3 mb-4 md:mb-0 md:text-right">
          <p className="text-indigo-400 font-mono text-sm tracking-tight">{date}</p>
        </div>
        <div className="md:col-span-9 relative border-l border-white/10 pl-6 pb-12 last:pb-0">
          <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[1.5px] top-1 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-slate-400 mb-4 font-medium">{company}</p>
          <ul className="space-y-2 text-slate-300 text-sm">
            {description.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-indigo-500 mt-1">▹</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ title, tech, description }: { title: string, tech: string, description: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 overflow-hidden hover:border-indigo-500/50 transition-colors"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
            <Briefcase size={24} />
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{title}</h3>
        <p className="text-xs font-mono text-indigo-300 mb-4">{tech}</p>
        <p className="text-sm text-slate-400 leading-relaxed flex-grow">{description}</p>
      </div>
    </motion.div>
  );
}

function AchievementCard({ title, description }: { title: string, description: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white/5 border border-white/5 rounded-2xl p-8 hover:bg-white/10 transition-all group"
    >
      <div className="mb-6 p-3 bg-indigo-500/10 inline-block rounded-xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
        <Trophy size={28} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
