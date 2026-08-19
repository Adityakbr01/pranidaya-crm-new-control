import React from "react";
import img1 from "@/assets/mainpage.jpg";
import Logo from "@/assets/logo.jpg";
import { ShieldCheck, Heart, Sparkles } from "lucide-react";

const AuthLayout = ({
  children,
  title,
  subtitle,
  badgeText = "Animal Welfare & Care Portal",
  variant = "split",
}) => {
  const isSplitLayout = variant === "split";

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col lg:flex-row antialiased text-slate-800">
      {/* Left Visual Panel (High-End Hero Section) */}
      {isSplitLayout && (
        <div className="relative hidden lg:flex lg:w-1/2 min-h-screen overflow-hidden bg-slate-950 flex-col justify-between p-12 select-none">
          {/* Background image with calibrated deep gradient overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage: `url(${img1})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />

          {/* Top Logo / Brand Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-2 pr-4 rounded-2xl border border-white/15 shadow-2xl">
              <img
                src={Logo}
                alt="Pranidaya Logo"
                className="h-10 w-auto rounded-xl object-contain bg-white shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-white leading-tight">
                  PRANIDAYA
                </span>
                <span className="text-[11px] font-medium text-blue-200/90 tracking-wider uppercase">
                  CRM Control
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-300 animate-pulse" />
              <span className="text-xs font-semibold text-blue-200">
                {badgeText}
              </span>
            </div>
          </div>

          {/* Center / Hero Copy */}
          <div className="relative z-10 my-auto max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-xs font-medium mb-4">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
              <span>Compassion in Every Action</span>
            </div>
            <h1 className="text-3xl xl:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
              Empowering Animal Welfare & Donor Relationships.
            </h1>
            <p className="text-slate-300 text-sm xl:text-base leading-relaxed font-normal">
              Seamlessly manage donors, livestock census, receipts, and inventory with precision, transparency, and high performance.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-slate-200">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">Enterprise RBAC</span>
                  <span className="text-[11px] text-slate-400">Strict Role Access</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-slate-200">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">Real-Time Sync</span>
                  <span className="text-[11px] text-slate-400">Instant Reports</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Quote */}
          <div className="relative z-10 text-xs text-slate-400 flex items-center justify-between border-t border-white/10 pt-4">
            <span>© {new Date().getFullYear()} Pranidaya Foundation</span>
            <span>Secure Management Portal</span>
          </div>
        </div>
      )}

      {/* Right Form Container */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-12 min-h-screen">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Branding */}
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <img
              src={Logo}
              alt="Pranidaya Logo"
              className="h-16 w-auto rounded-2xl shadow-md mb-3"
            />
            <h2 className="text-xl font-bold text-slate-900">PRANIDAYA CRM</h2>
            <p className="text-xs text-slate-500 font-medium">Control Portal</p>
          </div>

          {/* Card Wrapper */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/10">
            {title && (
              <div className="mb-8 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-2 text-sm text-slate-500 font-normal leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>
            )}

            {children}
          </div>

          <div className="mt-6 text-center text-xs text-slate-400">
            Protected by enterprise-grade token encryption & session monitoring
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
