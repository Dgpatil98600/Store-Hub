import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck, Store, ArrowRight,
  Star, Users
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-600",
      bgBase: "bg-indigo-50",
      borderBase: "border-indigo-100",
      hoverBorder: "hover:border-indigo-300",
      hoverShadow: "hover:shadow-[0_20px_60px_rgba(79,70,229,0.12)]",
      iconGlow: "shadow-[0_0_24px_rgba(79,70,229,0.15)]",
      title: "For Users",
      desc: "Browse stores, submit ratings, and update your reviews. Find the best places instantly.",
    },
    {
      icon: Store,
      color: "text-emerald-600",
      bgColor: "bg-emerald-600",
      bgBase: "bg-emerald-50",
      borderBase: "border-emerald-100",
      hoverBorder: "hover:border-emerald-300",
      hoverShadow: "hover:shadow-[0_20px_60px_rgba(16,185,129,0.12)]",
      iconGlow: "shadow-[0_0_24px_rgba(16,185,129,0.15)]",
      title: "For Owners",
      desc: "View customer ratings, track your store's performance.",
    },
    {
      icon: ShieldCheck,
      color: "text-violet-600",
      bgColor: "bg-violet-600",
      bgBase: "bg-violet-50",
      borderBase: "border-violet-100",
      hoverBorder: "hover:border-violet-300",
      hoverShadow: "hover:shadow-[0_20px_60px_rgba(139,92,246,0.12)]",
      iconGlow: "shadow-[0_0_24px_rgba(139,92,246,0.15)]",
      title: "For Admins",
      desc: "Manage users, monitor stores, and oversee platform statistics with complete control.",
    },
  ];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.4 } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc] font-sans text-slate-900 relative overflow-hidden">
     
      <div 
        className="fixed inset-0 z-0 pointer-events-none bg-[length:64px_64px] bg-[linear-gradient(rgba(79,70,229,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.03)_1px,transparent_1px)]" 
      />

      <nav className="sticky top-0 z-[100] flex items-center justify-between px-6 md:px-10 h-20 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
            <Store size={22} className="text-white" />
          </div>
          <span className="font-extrabold text-2xl text-slate-900 tracking-tight">StoreHub</span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/login")}
            className="text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-5 py-2.5 rounded-md transition-colors duration-200 shadow-sm"
          >
            Login
          </button>
          <button 
            onClick={() => navigate("/register")}
            className="flex items-center gap-2 bg-indigo-600 border border-transparent text-white hover:bg-indigo-700 text-sm font-semibold px-5 py-2.5 rounded-md transition-colors duration-200 shadow-sm"
          >
            Get Started <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      <main className="flex-grow flex flex-col justify-center items-center relative z-10 w-full py-16 md:py-20 gap-20">
        <section className="relative flex flex-col items-center text-center px-6 w-full max-w-4xl mx-auto">
          <motion.div 
            animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.06)_0%,transparent_70%)] blur-[60px] pointer-events-none" 
          />

          <div className="flex flex-col items-center relative z-10 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-600 mb-8"
            >
              <Star size={14} className="text-indigo-500 fill-indigo-500" />
              <span>Trusted by 10,000+ Users</span>
            </motion.div>

            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
              }}
              className="text-[clamp(3rem,7vw,5rem)] font-black leading-[1.15] tracking-tight mb-6 text-slate-900 text-center flex flex-col items-center gap-2"
            >
              <span className="flex flex-wrap justify-center gap-x-4 md:gap-x-6">
                {["Discover", "Stores."].map((word, i) => (
                  <motion.span 
                    key={`line1-${i}`} 
                    variants={{
                      hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                      visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
                  visible: { 
                    opacity: 1, 
                    y: [0, -4, 0], 
                    filter: "blur(0px)",
                    transition: {
                      opacity: { duration: 1.2, ease: "easeOut" },
                      filter: { duration: 1.2, ease: "easeOut" },
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                    }
                  }
                }}
                className="flex flex-wrap justify-center gap-x-4 md:gap-x-6"
              >
                {["Rate", "With", "Confidence."].map((word, i) => (
                  <motion.span
                    key={`line2-${i}`}
                    animate={{
                      filter: [
                        "drop-shadow(0px 0px 0px rgba(79,70,229,0))", 
                        "drop-shadow(0px 0px 12px rgba(79,70,229,0.2))", 
                        "drop-shadow(0px 0px 0px rgba(79,70,229,0))",
                        "drop-shadow(0px 0px 0px rgba(79,70,229,0))"
                      ],
                      opacity: [0.9, 1, 0.9, 0.9]
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.1666, 0.3333, 1],
                      delay: i * 1.5
                    }}
                    className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-500 to-violet-600 animate-text-gradient bg-[length:200%_auto] pb-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-slate-500 max-w-2xl mt-2 font-medium leading-relaxed"
            >
              StoreHub helps customers find trusted stores, allows owners to
              monitor ratings, and gives administrators complete platform control.
            </motion.p>
          </div>
        </section>

        <section className="relative w-full max-w-7xl mx-auto px-6 md:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div 
                  key={i} 
                  variants={fadeUpVariant}
                  className={`group relative p-10 md:p-12 flex flex-col h-full bg-white border border-slate-200 rounded-[2rem] cursor-default transition-all duration-300 shadow-sm hover:-translate-y-2 hover:shadow-xl ${f.hoverBorder} ${f.hoverShadow}`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${f.bgBase} ${f.borderBase} border ${f.iconGlow} transition-colors duration-300`}>
                    <Icon size={26} className={f.color} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{f.title}</h3>
                  <p className="text-base text-slate-500 leading-relaxed mb-8 font-medium flex-grow">
                    {f.desc}
                  </p>
                  
                  <div className={`w-12 h-1.5 rounded-full opacity-80 mt-auto ${f.bgColor}`} />
                </motion.div>
              );
            })}
          </motion.div>
        </section>

      </main>
    </div>
  );
}