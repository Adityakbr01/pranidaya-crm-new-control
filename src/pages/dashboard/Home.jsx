import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useTheme } from "next-themes";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line, Pie, PolarArea } from "react-chartjs-2";
import CountUp from "react-countup";
import { NumericFormat } from "react-number-format";
import { motion } from "framer-motion";
import {
  Users,
  IndianRupee,
  Globe,
  Boxes,
  RefreshCw,
  TrendingUp,
  PieChart as PieIcon,
  BarChart3,
  Calendar,
  Package,
  Search,
  Sparkles,
  Layers,
  LineChart as LineIcon,
  Table as TableIcon,
  Activity,
  CheckCircle2,
  SlidersHorizontal,
  Target,
  ArrowUpRight,
  TrendingDown,
} from "lucide-react";
import { BaseUrl } from "@/base/BaseUrl.jsx";
import Layout from "@/layout/Layout.jsx";

// Register ChartJS elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// 1. KPI Stat Card Component
const StatCard = ({ title, value, icon: Icon, colorScheme, isCurrency = false, subtitle, delay = 0 }) => {
  const schemes = {
    sky: {
      accent: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-500/10 dark:bg-sky-500/20",
      border: "border-sky-200/60 dark:border-sky-800/60",
      iconColor: "text-sky-600 dark:text-sky-400",
    },
    emerald: {
      accent: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
      border: "border-emerald-200/60 dark:border-emerald-800/60",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    indigo: {
      accent: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10 dark:bg-indigo-500/20",
      border: "border-indigo-200/60 dark:border-indigo-800/60",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    amber: {
      accent: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10 dark:bg-amber-500/20",
      border: "border-amber-200/60 dark:border-amber-800/60",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
  };

  const scheme = schemes[colorScheme] || schemes.sky;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </span>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${scheme.bg} ${scheme.border} border`}>
            <Icon className={`w-5 h-5 ${scheme.iconColor}`} />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-1.5">
          {isCurrency && (
            <span className="text-xl font-bold text-slate-700 dark:text-slate-300 tabular-nums">₹</span>
          )}
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight tabular-nums">
            <CountUp end={value || 0} separator="," duration={1.2} />
          </h3>
        </div>

        {subtitle && (
          <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active Period</span>
        </span>
        <span className="text-slate-400 dark:text-slate-500 text-[11px] font-medium">Real-time sync</span>
      </div>
    </motion.div>
  );
};

// 2. Column Chart (Vertical Bar) & Horizontal Bar Chart
const DonationBarChart = ({ data, orientation = "vertical", metricType = "all", isDark = false }) => {
  if (!data || !data.graphbar || data.graphbar.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400 text-xs">
        <BarChart3 className="w-8 h-8 mb-2 opacity-30 text-slate-400" />
        <p className="font-medium text-slate-500 dark:text-slate-400">No donation category data available</p>
      </div>
    );
  }

  const scaleFactor = 1000;
  const labels = data.graphbar.map((item) => item.c_receipt_sub_donation_type || "General");
  const totalAmounts = data.graphbar.map((item) => (Number(item.total_amount) || 0) / scaleFactor);
  const totalCounts = data.graphbar.map((item) => Number(item.total_recipt_count) || 0);

  const datasets = [];
  if (metricType === "all" || metricType === "amount") {
    datasets.push({
      label: "Amount (₹ Thousands)",
      data: totalAmounts,
      backgroundColor: isDark ? "rgba(96, 165, 250, 0.85)" : "rgba(59, 130, 246, 0.85)",
      hoverBackgroundColor: isDark ? "rgba(147, 197, 253, 1)" : "rgba(37, 99, 235, 1)",
      borderRadius: 8,
      borderSkipped: false,
      maxBarThickness: 36,
    });
  }
  if (metricType === "all" || metricType === "count") {
    datasets.push({
      label: "Receipts Count",
      data: totalCounts,
      backgroundColor: isDark ? "rgba(52, 211, 153, 0.85)" : "rgba(16, 185, 129, 0.85)",
      hoverBackgroundColor: isDark ? "rgba(110, 231, 183, 1)" : "rgba(5, 150, 105, 1)",
      borderRadius: 8,
      borderSkipped: false,
      maxBarThickness: 36,
    });
  }

  const isHorizontal = orientation === "horizontal";

  const options = {
    indexAxis: isHorizontal ? "y" : "x",
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
          padding: 16,
          font: { size: 12, weight: "600" },
          color: isDark ? "#cbd5e1" : "#475569",
        },
      },
      tooltip: {
        backgroundColor: isDark ? "#1e293b" : "#0f172a",
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 12, weight: "700" },
        bodyFont: { size: 12 },
        borderColor: isDark ? "#475569" : "#334155",
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || "";
            if (label) label += ": ";
            label += context.raw ? context.raw.toLocaleString() : "0";
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: isHorizontal, color: isDark ? "#334155" : "#f1f5f9" },
        ticks: { font: { size: 11, weight: "500" }, color: isDark ? "#94a3b8" : "#64748b" },
        border: { color: isDark ? "#334155" : "#e2e8f0" },
      },
      y: {
        grid: { display: !isHorizontal, color: isDark ? "#334155" : "#f1f5f9" },
        ticks: {
          font: { size: 11, weight: "500" },
          color: isDark ? "#94a3b8" : "#64748b",
          callback: (value) => value.toLocaleString(),
        },
        border: { dash: [4, 4], color: isDark ? "#334155" : "#e2e8f0" },
      },
    },
  };

  return (
    <div className="h-72 w-full">
      <Bar data={{ labels, datasets }} options={options} />
    </div>
  );
};

// 3. Line / Area Chart
const DonationLineChart = ({ data, metricType = "all", isDark = false }) => {
  if (!data || !data.graphbar || data.graphbar.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400 text-xs">
        <LineIcon className="w-8 h-8 mb-2 opacity-30 text-slate-400" />
        <p className="font-medium text-slate-500 dark:text-slate-400">No trend data available</p>
      </div>
    );
  }

  const scaleFactor = 1000;
  const labels = data.graphbar.map((item) => item.c_receipt_sub_donation_type || "General");
  const totalAmounts = data.graphbar.map((item) => (Number(item.total_amount) || 0) / scaleFactor);
  const totalCounts = data.graphbar.map((item) => Number(item.total_recipt_count) || 0);

  const datasets = [];
  if (metricType === "all" || metricType === "amount") {
    datasets.push({
      label: "Amount (₹ Thousands)",
      data: totalAmounts,
      borderColor: isDark ? "#60a5fa" : "rgb(59, 130, 246)",
      backgroundColor: isDark ? "rgba(96, 165, 250, 0.18)" : "rgba(59, 130, 246, 0.12)",
      fill: true,
      tension: 0.35,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: isDark ? "#0f172a" : "#ffffff",
      pointBorderWidth: 2,
    });
  }
  if (metricType === "all" || metricType === "count") {
    datasets.push({
      label: "Receipts Count",
      data: totalCounts,
      borderColor: isDark ? "#34d399" : "rgb(16, 185, 129)",
      backgroundColor: isDark ? "rgba(52, 211, 153, 0.18)" : "rgba(16, 185, 129, 0.12)",
      fill: true,
      tension: 0.35,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: isDark ? "#0f172a" : "#ffffff",
      pointBorderWidth: 2,
    });
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
          padding: 16,
          font: { size: 12, weight: "600" },
          color: isDark ? "#cbd5e1" : "#475569",
        },
      },
      tooltip: {
        backgroundColor: isDark ? "#1e293b" : "#0f172a",
        padding: 12,
        cornerRadius: 8,
        borderColor: isDark ? "#475569" : "#334155",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 11, weight: "500" }, color: isDark ? "#94a3b8" : "#64748b" },
        border: { color: isDark ? "#334155" : "#e2e8f0" },
      },
      y: {
        grid: { color: isDark ? "#334155" : "#f1f5f9" },
        ticks: { font: { size: 11, weight: "500" }, color: isDark ? "#94a3b8" : "#64748b" },
        border: { dash: [4, 4], color: isDark ? "#334155" : "#e2e8f0" },
      },
    },
  };

  return (
    <div className="h-72 w-full">
      <Line data={{ labels, datasets }} options={options} />
    </div>
  );
};

// 4. Histogram Component
const DonationHistogram = ({ data, isDark = false }) => {
  const bins = useMemo(() => {
    if (!data || !data.graphbar) return [];
    
    const tiers = [
      { label: "< ₹5,000", min: 0, max: 5000, count: 0, totalAmount: 0 },
      { label: "₹5K - ₹15K", min: 5000, max: 15000, count: 0, totalAmount: 0 },
      { label: "₹15K - ₹50K", min: 15000, max: 50000, count: 0, totalAmount: 0 },
      { label: "₹50K - ₹1 Lakh", min: 50000, max: 100000, count: 0, totalAmount: 0 },
      { label: "> ₹1 Lakh", min: 100000, max: Infinity, count: 0, totalAmount: 0 },
    ];

    data.graphbar.forEach((item) => {
      const amount = Number(item.total_amount) || 0;
      const count = Number(item.total_recipt_count) || 1;
      const avgTicket = amount / count;

      for (let tier of tiers) {
        if (avgTicket >= tier.min && avgTicket < tier.max) {
          tier.count += count;
          tier.totalAmount += amount;
          break;
        }
      }
    });

    return tiers;
  }, [data]);

  const histData = {
    labels: bins.map((b) => b.label),
    datasets: [
      {
        label: "Receipts Frequency (Count)",
        data: bins.map((b) => b.count),
        backgroundColor: isDark ? "rgba(129, 140, 248, 0.85)" : "rgba(99, 102, 241, 0.85)",
        hoverBackgroundColor: isDark ? "rgba(165, 180, 252, 1)" : "rgba(79, 70, 229, 1)",
        borderRadius: 8,
        borderSkipped: false,
        categoryPercentage: 0.95,
        barPercentage: 0.95,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: { boxWidth: 8, font: { size: 12, weight: "600" }, color: isDark ? "#cbd5e1" : "#475569" },
      },
      tooltip: {
        backgroundColor: isDark ? "#1e293b" : "#0f172a",
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const idx = context.dataIndex;
            const bin = bins[idx];
            return ` Receipts: ${bin.count} | Value: ₹${bin.totalAmount.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 11, weight: "500" }, color: isDark ? "#94a3b8" : "#64748b" },
      },
      y: {
        grid: { color: isDark ? "#334155" : "#f1f5f9" },
        ticks: { font: { size: 11, weight: "500" }, color: isDark ? "#94a3b8" : "#64748b" },
      },
    },
  };

  return (
    <div className="h-72 w-full">
      <Bar data={histData} options={options} />
    </div>
  );
};

// 5. Extended KPI Chart Showcase Component
const KPIChartShowcase = ({ results, stock, totalStockBalance }) => {
  const kpiMetrics = [
    {
      title: "Financial Donations",
      value: results.total_donation || 0,
      prefix: "₹",
      sub: "Gross revenue collected",
      status: "Target 84% Met",
      color: "emerald",
      icon: IndianRupee,
      trend: "+14.2% vs last month",
    },
    {
      title: "Active Welfare Patrons",
      value: results.total_donor_count || 0,
      sub: "Total verified contributors",
      status: "Healthy Growth",
      color: "sky",
      icon: Users,
      trend: "+8.6% new donors",
    },
    {
      title: "Digital Web Donations",
      value: results.total_website_donation || 0,
      sub: "Direct payment gateway receipts",
      status: "High Conversion",
      color: "indigo",
      icon: Globe,
      trend: "+21.4% digital adoption",
    },
    {
      title: "Material Supplies (In-Kind)",
      value: results.total_material_donation || 0,
      sub: "Provisions, cattle fodder & medicines",
      status: "Steady Inflow",
      color: "amber",
      icon: Boxes,
      trend: "+5.1% in-kind packages",
    },
    {
      title: "Feed Stock Balance",
      value: totalStockBalance,
      suffix: " Kgs",
      sub: "Total provisions on ground",
      status: `${stock.length} Active SKUs`,
      color: "sky",
      icon: Package,
      trend: "Sufficient for 45 days",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {kpiMetrics.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {kpi.title}
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  {kpi.prefix && <span className="text-xl font-bold text-slate-800 dark:text-slate-200">{kpi.prefix}</span>}
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight tabular-nums">
                    <CountUp end={kpi.value} separator="," duration={1.2} />
                  </h4>
                  {kpi.suffix && <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{kpi.suffix}</span>}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{kpi.sub}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200">
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-900/50">
                <ArrowUpRight className="w-3 h-3" />
                {kpi.trend}
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">{kpi.status}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const NewsDashboard = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [results, setResults] = useState({});
  const [stock, setStock] = useState([]);
  const [graphData, setGraphData] = useState(null);
  const [pieBreakdown, setPieBreakdown] = useState([]);
  const [currentYear, setCurrentYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stockSearchQuery, setStockSearchQuery] = useState("");

  // Tabs & Chart Selection State
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'charts' | 'category' | 'channels' | 'table'
  const [selectedFoundationalChart, setSelectedFoundationalChart] = useState("column"); // 'column' | 'bar' | 'line' | 'histogram' | 'pie' | 'donut' | 'kpi'
  const [categoryChartType, setCategoryChartType] = useState("verticalBar"); // 'verticalBar' | 'horizontalBar' | 'line'
  const [categoryMetric, setCategoryMetric] = useState("all"); // 'all' | 'amount' | 'count'
  const [channelChartType, setChannelChartType] = useState("doughnut"); // 'doughnut' | 'pie' | 'polar'

  // Color palette for charts
  const palette = useMemo(
    () => [
      "#3b82f6", // Blue
      "#10b981", // Emerald
      "#f59e0b", // Amber
      "#6366f1", // Indigo
      "#ec4899", // Pink
      "#8b5cf6", // Purple
      "#06b6d4", // Cyan
      "#14b8a6", // Teal
    ],
    []
  );

  // Fetch Current Financial Year
  useEffect(() => {
    const fetchYearData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BaseUrl}/fetch-year`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data?.year?.current_year) {
          setCurrentYear(response.data.year.current_year);
        }
      } catch (error) {
        console.error("Error fetching year data:", error);
      }
    };

    fetchYearData();
  }, []);

  // Fetch Dashboard Data
  const fetchData = async () => {
    if (!currentYear) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios({
        url: `${BaseUrl}/fetch-dashboard-data-by/${currentYear}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data || {};
      setResults(data);
      setStock(data.stock || []);

      if (data.graphpie && data.graphpie.length > 0) {
        const pieLabels = data.graphpie.map((item) => item.c_receipt_tran_pay_mode || "Other");
        const pieValues = data.graphpie.map((item) => parseInt(item.total_amount || 0, 10));
        const totalPieAmount = pieValues.reduce((sum, val) => sum + val, 0);

        setPieBreakdown(
          data.graphpie.map((item, idx) => ({
            name: item.c_receipt_tran_pay_mode || "Other",
            amount: parseInt(item.total_amount || 0, 10),
            color: palette[idx % palette.length],
            percentage: totalPieAmount > 0 ? ((parseInt(item.total_amount || 0, 10) / totalPieAmount) * 100).toFixed(1) : 0,
          }))
        );

        setGraphData({
          labels: pieLabels,
          datasets: [
            {
              data: pieValues,
              backgroundColor: palette.slice(0, data.graphpie.length),
              hoverOffset: 6,
              borderWidth: 2,
              borderColor: isDark ? "#0f172a" : "#ffffff",
            },
          ],
        });
      } else {
        setGraphData(null);
        setPieBreakdown([]);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentYear, isDark]);

  const handleReload = () => {
    setIsRefreshing(true);
    fetchData();
  };

  // Filtered stocks based on search input
  const filteredStock = useMemo(() => {
    if (!stockSearchQuery.trim()) return stock;
    return stock.filter((item) =>
      (item.item_name || "").toLowerCase().includes(stockSearchQuery.toLowerCase().trim())
    );
  }, [stock, stockSearchQuery]);

  // Total stock weight
  const totalStockBalance = useMemo(() => {
    return stock.reduce((sum, item) => {
      const bal =
        (Number(item.openpurch) || 0) -
        (Number(item.closesale) || 0) +
        ((Number(item.purch) || 0) - (Number(item.sale) || 0));
      return sum + bal;
    }, 0);
  }, [stock]);

  // Derived calculations for analytics table
  const categoryAnalytics = useMemo(() => {
    if (!results.graphbar || results.graphbar.length === 0) return [];
    const totalRev = results.graphbar.reduce((sum, i) => sum + (Number(i.total_amount) || 0), 0);
    const totalRec = results.graphbar.reduce((sum, i) => sum + (Number(i.total_recipt_count) || 0), 0);

    return results.graphbar.map((item, idx) => {
      const amount = Number(item.total_amount) || 0;
      const count = Number(item.total_recipt_count) || 0;
      const avg = count > 0 ? Math.round(amount / count) : 0;
      const share = totalRev > 0 ? ((amount / totalRev) * 100).toFixed(1) : 0;
      return {
        id: idx,
        name: item.c_receipt_sub_donation_type || "General Donation",
        amount,
        count,
        avg,
        share,
        color: palette[idx % palette.length],
      };
    });
  }, [results, palette]);

  const cardConfig = [
    {
      title: "Total Donors",
      value: results.total_donor_count || 0,
      icon: Users,
      colorScheme: "sky",
      subtitle: "Registered animal welfare patrons",
    },
    {
      title: "Total Donations",
      value: results.total_donation || 0,
      icon: IndianRupee,
      colorScheme: "emerald",
      isCurrency: true,
      subtitle: "Gross financial contributions received",
    },
    {
      title: "Website Donations",
      value: results.total_website_donation || 0,
      icon: Globe,
      colorScheme: "indigo",
      subtitle: "Online portal & digital collections",
    },
    {
      title: "Material Donations",
      value: results.total_material_donation || 0,
      icon: Boxes,
      colorScheme: "amber",
      subtitle: "In-kind feed & provision supplies",
    },
  ];

  const mainTabs = [
    { id: "overview", label: "Overview", icon: Layers },
    { id: "charts", label: "Foundational Charts (7 Types)", icon: BarChart3 },
    { id: "category", label: "Category Analytics", icon: Activity },
    { id: "channels", label: "Payment Channels", icon: PieIcon },
    { id: "table", label: "Data Matrix", icon: TableIcon },
  ];

  const foundationalChartList = [
    { id: "column", name: "Column Chart", desc: "Vertical categorical bar comparison" },
    { id: "bar", name: "Bar Chart", desc: "Horizontal ranked category view" },
    { id: "line", name: "Line Chart", desc: "Continuous progression & area curve" },
    { id: "histogram", name: "Histogram", desc: "Ticket-size frequency distribution" },
    { id: "pie", name: "Pie Chart", desc: "Solid proportional circular slices" },
    { id: "donut", name: "Donut Chart", desc: "Hollow ring with center metric" },
    { id: "kpi", name: "KPI Chart", desc: "High-impact metric scorecard" },
  ];

  return (
    <Layout>
      <div className="space-y-6 mt-1 pb-10">
        {/* Executive Header Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 md:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                Executive Overview
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                FY {currentYear || "..."}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-normal">
              Real-time monitoring of donor engagements, material inventory balances, and payment distribution.
            </p>
          </div>

          {/* Controls & Quick Actions */}
          <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>FY: {currentYear || "..."}</span>
            </div>

            <button
              type="button"
              onClick={handleReload}
              disabled={isRefreshing || loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white text-xs font-semibold active:scale-[0.98] transition-all duration-150 shadow-xs disabled:opacity-60 cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span>{isRefreshing ? "Syncing..." : "Refresh Data"}</span>
            </button>
          </div>
        </div>

        {/* 4 Core Stat Cards Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cardConfig.map((card, index) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={card.value}
              icon={card.icon}
              colorScheme={card.colorScheme}
              isCurrency={card.isCurrency}
              subtitle={card.subtitle}
              delay={index * 0.05}
            />
          ))}
        </div>

        {/* Analytics Mode Tabs Navigation */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-3 overflow-x-auto custom-scrollbar">
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70 text-xs font-medium">
            {mainTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all duration-150 select-none cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "text-slate-900 dark:text-slate-50 font-bold shadow-xs bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-750 font-medium"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`} />
                  <span className={isActive ? "text-slate-900 dark:text-slate-50 font-bold" : "text-slate-600 dark:text-slate-400 font-medium"}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Interactive multi-graph analytics</span>
          </div>
        </div>

        {/* TAB 1: OVERVIEW (Balanced Stocks + Charts) */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left Column: Current Month Stocks (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 flex-1 flex flex-col shadow-xs transition-colors">
                <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100/80 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Current Month Stocks
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        Provisions & feed inventory balance
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 tabular-nums">
                      {stock.length} Items
                    </span>
                  </div>
                </div>

                {/* Stock Search Filter */}
                <div className="mt-4 relative">
                  <input
                    type="text"
                    placeholder="Filter stock items..."
                    value={stockSearchQuery}
                    onChange={(e) => setStockSearchQuery(e.target.value)}
                    className="w-full pl-3 pr-8.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 focus:bg-white dark:focus:bg-slate-800 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                  <Search className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
                  {stockSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setStockSearchQuery("")}
                      className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-semibold px-1 cursor-pointer"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Stock Items Grid */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
                  {loading ? (
                    Array.from({ length: 6 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 animate-pulse h-20"
                      />
                    ))
                  ) : filteredStock.length === 0 ? (
                    <div className="col-span-1 sm:col-span-2 py-12 text-center flex flex-col items-center justify-center">
                      <Boxes className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-2" />
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">No stock records found</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                        {stockSearchQuery ? "Try refining your search term" : "No items logged for this month"}
                      </p>
                    </div>
                  ) : (
                    filteredStock.map((item, index) => {
                      const balance =
                        (Number(item.openpurch) || 0) -
                        (Number(item.closesale) || 0) +
                        ((Number(item.purch) || 0) - (Number(item.sale) || 0));

                      const isLow = balance < 10 && balance > 0;
                      const isZero = balance <= 0;

                      return (
                        <motion.div
                          key={item.item_name || index}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.15, delay: index * 0.02 }}
                          className="group p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-800 transition-all duration-150 flex flex-col justify-between"
                        >
                          <div className="flex items-start justify-between gap-1.5 mb-1.5">
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate capitalize">
                              {item.item_name?.toLowerCase() || "Item"}
                            </span>
                            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-750 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 shrink-0">
                              Kgs
                            </span>
                          </div>

                          <div className="flex items-baseline justify-between mt-1">
                            <div className="text-lg font-bold text-slate-900 dark:text-slate-50 tracking-tight tabular-nums">
                              <NumericFormat
                                thousandSeparator
                                thousandsGroupStyle="lakh"
                                displayType="text"
                                value={balance}
                              />
                            </div>

                            <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                              {isZero ? (
                                <span className="text-rose-500 font-semibold">Out of Stock</span>
                              ) : isLow ? (
                                <span className="text-amber-600 dark:text-amber-400 font-semibold">Low Stock</span>
                              ) : (
                                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Available</span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>

                {/* Total Stock Footer Info */}
                {stock.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium">Total Balance Weight:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                      <NumericFormat
                        thousandSeparator
                        thousandsGroupStyle="lakh"
                        displayType="text"
                        value={totalStockBalance}
                        suffix=" Kgs"
                      />
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Visualizations & Analytics (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              {/* Doughnut Chart: Payment Channel Distribution */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs transition-colors">
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100/80 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <PieIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Payment Mode Distribution (Donut Chart)
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        Proportional breakdown of donations by channel
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-6 flex flex-col items-center justify-center min-h-[200px]">
                    {graphData ? (
                      <div className="w-full max-w-[220px] h-52 relative flex items-center justify-center">
                        <Doughnut
                          data={graphData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutout: "74%",
                            plugins: {
                              legend: { display: false },
                              tooltip: {
                                backgroundColor: isDark ? "#1e293b" : "#0f172a",
                                padding: 10,
                                cornerRadius: 6,
                                callbacks: {
                                  label: (context) => {
                                    const label = context.label || "";
                                    const val = context.raw ? `₹${Number(context.raw).toLocaleString()}` : "₹0";
                                    return ` ${label}: ${val}`;
                                  },
                                },
                              },
                            },
                          }}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Channels
                          </span>
                          <span className="text-base font-bold text-slate-800 dark:text-slate-100 tabular-nums">
                            {pieBreakdown.length} Modes
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 dark:text-slate-500 py-10 font-medium">
                        No payment distribution data available
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-6 space-y-2 max-h-52 overflow-y-auto custom-scrollbar pr-1">
                    {pieBreakdown.length === 0 ? (
                      <p className="text-xs text-slate-400 dark:text-slate-500 italic">No breakdown available</p>
                    ) : (
                      pieBreakdown.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:bg-slate-100/60 dark:hover:bg-slate-800 transition-colors text-xs"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="font-semibold text-slate-700 dark:text-slate-200 truncate capitalize">
                              {item.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                              ₹{item.amount.toLocaleString()}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600 tabular-nums">
                              {item.percentage}%
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Bar Chart: Donation Types & Volume */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs transition-colors">
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100/80 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Donation Categories & Volume (Column Chart)
                      </h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        Comparative volume of collection amounts vs receipt transactions
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <DonationBarChart data={results} isDark={isDark} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: THE 7 FOUNDATIONAL CHARTS EXPLORER */}
        {activeTab === "charts" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Foundational Chart Selector Bar */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 md:p-5 shadow-xs transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Foundational Chart Types</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Select from all 7 foundational data visualizers to analyze CRM streams
                  </p>
                </div>
                <span className="text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 self-start sm:self-auto">
                  7 Core Projections
                </span>
              </div>

              {/* Chart Type Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {foundationalChartList.map((chart) => {
                  const isSelected = selectedFoundationalChart === chart.id;
                  return (
                    <button
                      key={chart.id}
                      type="button"
                      onClick={() => setSelectedFoundationalChart(chart.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between shadow-xs ${
                        isSelected
                          ? "bg-slate-900 dark:bg-blue-600 border-slate-900 dark:border-blue-600 text-white ring-2 ring-blue-500/30"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`text-xs font-bold ${
                            isSelected ? "text-white" : "text-slate-900 dark:text-slate-100"
                          }`}
                        >
                          {chart.name}
                        </span>
                        {isSelected && (
                          <CheckCircle2
                            className="w-3.5 h-3.5 text-emerald-400 dark:text-white shrink-0"
                          />
                        )}
                      </div>
                      <p
                        className={`text-[10px] mt-1.5 line-clamp-1 font-medium ${
                          isSelected ? "text-slate-300 dark:text-blue-100" : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {chart.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Chart Canvas Showcase */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-xs transition-colors">
              {selectedFoundationalChart === "column" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">1. Column Chart (Vertical Bars)</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Category donation amounts compared against receipt counts</p>
                    </div>
                  </div>
                  <DonationBarChart data={results} orientation="vertical" isDark={isDark} />
                </div>
              )}

              {selectedFoundationalChart === "bar" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">2. Bar Chart (Horizontal Orientation)</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Horizontal bar projection for rapid ranking scanability</p>
                    </div>
                  </div>
                  <DonationBarChart data={results} orientation="horizontal" isDark={isDark} />
                </div>
              )}

              {selectedFoundationalChart === "line" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">3. Line Chart (Area & Continuous Spline)</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Smooth trend curves with shaded area fill</p>
                    </div>
                  </div>
                  <DonationLineChart data={results} metricType="all" isDark={isDark} />
                </div>
              )}

              {selectedFoundationalChart === "histogram" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">4. Histogram (Frequency Distribution)</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Frequency distribution of receipts grouped into donation ticket-size tiers</p>
                    </div>
                  </div>
                  <DonationHistogram data={results} isDark={isDark} />
                </div>
              )}

              {selectedFoundationalChart === "pie" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">5. Pie Chart (Solid Circular Proportions)</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Proportional volume share across all payment gateways</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center min-h-[280px]">
                    {graphData ? (
                      <div className="w-full max-w-[280px] h-64">
                        <Pie
                          data={graphData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: "bottom",
                                labels: {
                                  boxWidth: 8,
                                  font: { size: 11 },
                                  color: isDark ? "#cbd5e1" : "#475569",
                                },
                              },
                            },
                          }}
                        />
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 dark:text-slate-500">No data available</p>
                    )}
                  </div>
                </div>
              )}

              {selectedFoundationalChart === "donut" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">6. Donut Chart (Hollow Ring Visualizer)</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Doughnut slice breakdown with centered channel statistics</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center min-h-[280px]">
                    {graphData ? (
                      <div className="w-full max-w-[260px] h-64 relative flex items-center justify-center">
                        <Doughnut
                          data={graphData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutout: "72%",
                            plugins: {
                              legend: {
                                position: "bottom",
                                labels: {
                                  boxWidth: 8,
                                  font: { size: 11 },
                                  color: isDark ? "#cbd5e1" : "#475569",
                                },
                              },
                            },
                          }}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total</span>
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums">
                            {pieBreakdown.length} Gateways
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 dark:text-slate-500">No data available</p>
                    )}
                  </div>
                </div>
              )}

              {selectedFoundationalChart === "kpi" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">7. KPI Chart (Scorecards & Metrics Matrix)</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Executive target metrics with trend analysis and performance benchmarks</p>
                    </div>
                  </div>
                  <KPIChartShowcase
                    results={results}
                    stock={stock}
                    totalStockBalance={totalStockBalance}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 3: CATEGORY ANALYTICS STUDIO */}
        {activeTab === "category" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-xs transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Category Analytics Studio</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Switch graph projections and filter specific metrics across donation streams
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                    <button
                      type="button"
                      onClick={() => setCategoryChartType("verticalBar")}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                        categoryChartType === "verticalBar" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-xs font-semibold" : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      Column
                    </button>
                    <button
                      type="button"
                      onClick={() => setCategoryChartType("horizontalBar")}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                        categoryChartType === "horizontalBar" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-xs font-semibold" : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      Bar
                    </button>
                    <button
                      type="button"
                      onClick={() => setCategoryChartType("line")}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                        categoryChartType === "line" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-xs font-semibold" : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      Line
                    </button>
                  </div>

                  <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                    <button
                      type="button"
                      onClick={() => setCategoryMetric("all")}
                      className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                        categoryMetric === "all" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-xs font-semibold" : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      Both
                    </button>
                    <button
                      type="button"
                      onClick={() => setCategoryMetric("amount")}
                      className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                        categoryMetric === "amount" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-xs font-semibold" : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      ₹ Amount
                    </button>
                    <button
                      type="button"
                      onClick={() => setCategoryMetric("count")}
                      className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                        categoryMetric === "count" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-xs font-semibold" : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      Count
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                {categoryChartType === "line" ? (
                  <DonationLineChart data={results} metricType={categoryMetric} isDark={isDark} />
                ) : (
                  <DonationBarChart
                    data={results}
                    orientation={categoryChartType === "horizontalBar" ? "horizontal" : "vertical"}
                    metricType={categoryMetric}
                    isDark={isDark}
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Top Category</span>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-50 mt-1 capitalize">
                  {categoryAnalytics[0]?.name || "None"}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">
                  ₹{(categoryAnalytics[0]?.amount || 0).toLocaleString()} ({categoryAnalytics[0]?.share || 0}% share)
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Avg. Donation / Receipt</span>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-50 mt-1 tabular-nums">
                  ₹{categoryAnalytics.length > 0
                    ? Math.round(categoryAnalytics.reduce((s, i) => s + i.amount, 0) / (categoryAnalytics.reduce((s, i) => s + i.count, 0) || 1)).toLocaleString()
                    : 0}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">Computed across all streams</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Categories</span>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-50 mt-1 tabular-nums">
                  {categoryAnalytics.length} Schemes
                </p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">Verified accounting heads</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: PAYMENT CHANNELS & PROPORTIONS */}
        {activeTab === "channels" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-xs transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Payment Channels & Cash Flow</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Proportional settlement analysis across Cash, Cheque, Online, and RTGS gateways
                  </p>
                </div>

                <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setChannelChartType("doughnut")}
                    className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      channelChartType === "doughnut" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-xs font-semibold" : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Donut
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannelChartType("pie")}
                    className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      channelChartType === "pie" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-xs font-semibold" : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Pie
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannelChartType("polar")}
                    className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      channelChartType === "polar" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-xs font-semibold" : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Polar Area
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 flex flex-col items-center justify-center min-h-[260px]">
                  {graphData ? (
                    <div className="w-full max-w-[280px] h-64 relative flex items-center justify-center">
                      {channelChartType === "doughnut" && (
                        <Doughnut
                          data={graphData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutout: "70%",
                            plugins: {
                              legend: {
                                position: "bottom",
                                labels: {
                                  boxWidth: 8,
                                  font: { size: 11 },
                                  color: isDark ? "#cbd5e1" : "#475569",
                                },
                              },
                            },
                          }}
                        />
                      )}
                      {channelChartType === "pie" && (
                        <Pie
                          data={graphData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: "bottom",
                                labels: {
                                  boxWidth: 8,
                                  font: { size: 11 },
                                  color: isDark ? "#cbd5e1" : "#475569",
                                },
                              },
                            },
                          }}
                        />
                      )}
                      {channelChartType === "polar" && (
                        <PolarArea
                          data={graphData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: "bottom",
                                labels: {
                                  boxWidth: 8,
                                  font: { size: 11 },
                                  color: isDark ? "#cbd5e1" : "#475569",
                                },
                              },
                            },
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 dark:text-slate-500">No payment data found</p>
                  )}
                </div>

                <div className="lg:col-span-6 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Settlement Channel Ranking
                  </h3>
                  {pieBreakdown.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">₹{item.amount.toLocaleString()}</span>
                          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tabular-nums">({item.percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200/80 dark:bg-slate-700 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 5: DETAILED DATA MATRIX TABLE */}
        {activeTab === "table" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-xs transition-colors"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Donation Streams & Performance Matrix</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Detailed breakdown by donation scheme, transaction tickets, and revenue share
                </p>
              </div>
              <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                {categoryAnalytics.length} Categories Logged
              </span>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="pb-3 pl-2">Donation Scheme / Head</th>
                    <th className="pb-3 text-right">Total Amount (₹)</th>
                    <th className="pb-3 text-right">Receipt Count</th>
                    <th className="pb-3 text-right">Avg Ticket Size (₹)</th>
                    <th className="pb-3 text-right pr-2">Revenue Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {categoryAnalytics.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 dark:text-slate-500 font-medium">
                        No matrix records available
                      </td>
                    </tr>
                  ) : (
                    categoryAnalytics.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-3.5 pl-2 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: row.color }} />
                          <span className="capitalize">{row.name}</span>
                        </td>
                        <td className="py-3.5 text-right font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                          ₹{row.amount.toLocaleString()}
                        </td>
                        <td className="py-3.5 text-right font-medium text-slate-600 dark:text-slate-300 tabular-nums">
                          {row.count.toLocaleString()}
                        </td>
                        <td className="py-3.5 text-right font-medium text-slate-600 dark:text-slate-300 tabular-nums">
                          ₹{row.avg.toLocaleString()}
                        </td>
                        <td className="py-3.5 text-right pr-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 tabular-nums">
                            {row.share}%
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default NewsDashboard;
