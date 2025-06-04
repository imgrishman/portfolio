"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Download,
  Menu,
  X,
  Brain,
  Code,
  PenToolIcon as Tools,
  User,
  Calendar,
  Award,
  BookOpen,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "experience", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("loading")

    try {
      // Using Formspree - replace 'your-form-id' with your actual Formspree form ID
      const response = await fetch("https://formspree.io/f/xdkogkpw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
        }),
      })

      if (response.ok) {
        setFormStatus("success")
        setStatusMessage("Thank you! Your message has been sent successfully.")
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      setFormStatus("error")
      setStatusMessage("Sorry, there was an error sending your message. Please try again or contact me directly.")
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setFormStatus("idle")
      setStatusMessage("")
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Grishman Paruchuru
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "experience", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 ${
                    activeSection === item ? "text-purple-600 font-semibold" : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              {["home", "about", "skills", "experience", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-2 capitalize text-gray-600 hover:text-purple-600"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <div className="mb-8">
            <Image
              src="/profile.jpg"
              alt="Grishman Paruchuru"
              width={200}
              height={200}
              className="rounded-full mx-auto border-4 border-white/30 shadow-2xl"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">Grishman Paruchuru</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in-up animation-delay-200">
            AI Researcher & Computer Science Graduate Student
          </p>
          <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            Specializing in Machine Learning, Deep Learning, and Responsible AI Development
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              <Download size={20} />
              Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">About Me</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm a passionate Computer Science graduate student at the University of North Texas with a perfect 4.0
                GPA, specializing in AI research and responsible AI development. With experience in machine learning,
                deep learning, and computer vision, I'm dedicated to advancing AI technology while ensuring ethical and
                responsible implementation.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                My journey spans from research assistance in Large Language Models to practical applications in banking
                software development. I've published research papers, led technical presentations, and contributed to
                various AI and software development projects.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-purple-600">
                  <GraduationCap size={20} />
                  <span className="font-semibold">Master's in Computer Science</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600">
                  <Award size={20} />
                  <span className="font-semibold">4.0 GPA</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-purple-600 mb-2">4.0</div>
                <div className="text-gray-600">GPA (Masters)</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-purple-600 mb-2">4+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-purple-600 mb-2">1</div>
                <div className="text-gray-600">Published Paper</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Skills & Expertise</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <Brain className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">AI & ML</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Machine Learning", "Deep Learning", "Computer Vision", "NLP", "TensorFlow", "PyTorch"].map(
                  (skill) => (
                    <span key={skill} className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Code className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Programming</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Python", "C/C++", "JavaScript", "SQL", "MATLAB", "HTML/CSS", "LaTeX"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-600 rounded-lg">
                  <Tools className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Tools</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["PySpark", "Hadoop", "Tableau", "Git", "MS Excel"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-600 rounded-lg">
                  <User className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Soft Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Problem Solving", "Leadership", "Communication", "Team Player", "Critical Thinking"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Professional Experience</h2>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-purple-600"></div>

            <div className="space-y-12">
              {[
                {
                  title: "JR Software Development",
                  company: "Sunus LLC",
                  period: "Mar 2025 – Present",
                  description:
                    "Building the PIVORA product from ground up with focus on user-centric design. Leading UI/UX implementation using React.js, delivering responsive dashboards and interfaces for data analysis and visualization.",
                  icon: <Code size={20} />,
                },
                {
                  title: "Research Assistant",
                  company: "University of North Texas - Responsible AI",
                  period: "Jan 2023 – Dec 2024",
                  description:
                    "Making an influence on AI starting with Large Language Models like ChatGPT and assisting Dr. Feng Yune with latest work on AI research and responsible AI development.",
                  icon: <Brain size={20} />,
                },
                {
                  title: "Apprentice (R&D Product)",
                  company: "TEMENOS - Banking Software Company",
                  period: "Mar 2022 – Nov 2022",
                  description:
                    "Interned in Research and Development Department, developed UI/UX for Spotlight in various environments. Worked with a team of 10 people and designed solutions for deployment issues and bugs.",
                  icon: <Code size={20} />,
                },
                {
                  title: "Teaching Assistant & Advisor",
                  company: "Institute of Aeronautical Engineering (IARE)",
                  period: "Dec 2021 – Feb 2022",
                  description:
                    "Trained Python Programming and Object-Oriented Concepts to 500 freshman students. Worked with a group of 5 teachers and the Dean of Career Development.",
                  icon: <BookOpen size={20} />,
                },
                {
                  title: "Campus Ambassador",
                  company: "International Model United Nations",
                  period: "Aug 2020 – Jun 2022",
                  description:
                    "Worked on researching, public speaking, debating, and writing skills. Gained international exposure by interacting with delegates across the world.",
                  icon: <Award size={20} />,
                },
              ].map((exp, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-600 text-white rounded-lg">{exp.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                          <p className="text-purple-600 font-medium">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          <Calendar size={14} />
                          {exp.period}
                        </div>
                      </div>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-4 h-4 bg-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>

                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Featured Projects</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "OCR Technology Research",
                subtitle: "Published Paper - IJWMT Journal",
                description:
                  "Developed OCR technology using Python with PyTesseract, Moviepy, OpenCV2, and Speech-to-text. Created a software system to process videos and extract data faster into text files.",
                tags: ["Python", "OpenCV", "PyTesseract", "Research"],
                gradient: "from-purple-500 to-blue-500",
              },
              {
                title: "Criminal Recognition System",
                subtitle: "IBM Workshop Project",
                description:
                  "Developed a website for criminal recognition using IBM Watson with IBM Cloud as database. Implemented similarity index testing to prove identity matches from image analysis.",
                tags: ["IBM Watson", "Cloud Computing", "Computer Vision"],
                gradient: "from-blue-500 to-indigo-500",
              },
              {
                title: "Technical Paper Presentation",
                subtitle: "1st Place Winner",
                description:
                  "Led and won 1st place in technical paper presentation conducted by Innovation Center & Start-Up from IARE, demonstrating expertise in research and presentation skills.",
                tags: ["Research", "Presentation", "Innovation"],
                gradient: "from-indigo-500 to-purple-500",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className={`h-32 bg-gradient-to-r ${project.gradient} flex items-center justify-center`}>
                  <h3 className="text-xl font-bold text-white text-center px-4">{project.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-purple-600 font-semibold mb-3">{project.subtitle}</p>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                      <ExternalLink size={16} />
                      View Project
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Get In Touch</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Let's Connect!</h3>
              <p className="text-lg text-white/90 mb-8">
                I'm always interested in discussing AI research, technology opportunities, and innovative projects. Feel
                free to reach out for collaborations or just to chat about the latest in AI and technology.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: <Mail size={20} />,
                    label: "Email",
                    value: "grishmanbiz@gmail.com",
                    href: "mailto:grishmanbiz@gmail.com",
                  },
                  { icon: <Phone size={20} />, label: "Phone", value: "+1 940-395-7905", href: "tel:+19403957905" },
                  { icon: <MapPin size={20} />, label: "Location", value: "Texas, USA" },
                  { icon: <GraduationCap size={20} />, label: "University", value: "University of North Texas" },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="p-2 bg-white/20 rounded-lg">{contact.icon}</div>
                    <div>
                      <p className="font-semibold">{contact.label}</p>
                      {contact.href ? (
                        <a href={contact.href} className="text-white/90 hover:text-white transition-colors">
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-white/90">{contact.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6">Send a Message</h3>

              {/* Status Messages */}
              {formStatus === "success" && (
                <div className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-400" />
                  <p className="text-green-100">{statusMessage}</p>
                </div>
              )}

              {formStatus === "error" && (
                <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2">
                  <AlertCircle size={20} className="text-red-400" />
                  <p className="text-red-100">{statusMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all duration-200"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all duration-200"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Your Message"
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white/50 focus:bg-white/25 resize-none transition-all duration-200"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-white/90 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === "loading" ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <p className="text-white/60 text-sm mt-4 text-center">
                Or email me directly at{" "}
                <a href="mailto:grishmanbiz@gmail.com" className="text-white hover:text-white/80 underline">
                  grishmanbiz@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="flex gap-6 mb-6">
              {[
                { icon: <Mail size={20} />, href: "mailto:grishmanbiz@gmail.com", label: "Email" },
                { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
                { icon: <Github size={20} />, href: "#", label: "GitHub" },
                { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-3 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-center">© 2024 Grishman Paruchuru. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
