import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
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
} from "lucide-react";
import { BaseUrl } from "@/base/BaseUrl.jsx";
import Layout from "@/layout/Layout.jsx";

// Register ChartJS elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// KPI Stat Card Component (Flat, No Shadows)
const StatCard = ({ title, value, icon: Icon, colorScheme, isCurrency = false, subtitle }) => {
  const schemes = {
    blue: {
      bg: "bg-blue-50/60",
      border: "border-blue-100",
      text: "text-blue-700",
      iconBg: "bg-blue-600 text-white",
    },
    emerald: {
      bg: "bg-emerald-50/60",
      border: "border-emerald-100",
      text: "text-emerald-700",
      iconBg: "bg-emerald-600 text-white",
    },
    indigo: {
      bg: "bg-indigo-50/60",
      border: "border-indigo-100",
      text: "text-indigo-700",
      iconBg: "bg-indigo-600 text-white",
    },
    amber: {
      bg: "bg-amber-50/60",
      border: "border-amber-100",
      text: "text-amber-700",
      iconBg: "bg-amber-600 text-white",
    },
  };

  const current = schemes[colorScheme] || schemes.blue;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-5 transition-colors duration-150">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>
          <div className="flex items-baseline gap-1">
            {isCurrency && <span className="text-xl font-bold text-slate-900">₹</span>}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              <CountUp end={value || 0} separator="," duration={1.2} />
            </h3>
          </div>
          {subtitle && (
            <p className="text-[11px] font-medium text-slate-500 pt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${current.iconBg}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {/* Bottom indicator */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className={`inline-flex items-center gap-1 font-semibold ${current.text}`}>
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Active Record</span>
        </span>
        <span className="text-slate-400 text-[11px]">Updated live</span>
      </div>
    </div>
  );
};

// Bar Chart Component (Flat)
const DonationBarChart = ({ data }) => {
  if (!data || !data.graphbar || data.graphbar.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400 text-xs">
        <BarChart3 className="w-8 h-8 mb-2 opacity-40" />
        <p>No donation stream data available</p>
      </div>
    );
  }

  const scaleFactor = 1000;
  const labels = data.graphbar.map((item) => item.c_receipt_sub_donation_type);
  const totalAmounts = data.graphbar.map((item) => item.total_amount / scaleFactor);
  const totalCounts = data.graphbar.map((item) => item.total_recipt_count);

  const barData = {
    labels,
    datasets: [
      {
        label: "Amount (in ₹ thousands)",
        data: totalAmounts,
        backgroundColor: "rgba(59, 130, 246, 0.9)",
        hoverBackgroundColor: "rgba(37, 99, 235, 1)",
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "Receipt Count",
        data: totalCounts,
        backgroundColor: "rgba(16, 185, 129, 0.9)",
        hoverBackgroundColor: "rgba(5, 150, 105, 1)",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          padding: 16,
          font: { size: 12, weight: "600" },
        },
      },
      tooltip: {
        backgroundColor: "#0f172a",
        padding: 12,
        cornerRadius: 6,
        titleFont: { size: 12, weight: "700" },
        bodyFont: { size: 12 },
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
        grid: { display: false },
        ticks: { font: { size: 11, weight: "500" }, color: "#64748b" },
      },
      y: {
        grid: { color: "#f1f5f9" },
        ticks: {
          font: { size: 11 },
          color: "#64748b",
          callback: (value) => value.toLocaleString(),
        },
      },
    },
  };

  return (
    <div className="h-72 w-full">
      <Bar data={barData} options={options} />
    </div>
  );
};

const NewsDashboard = () => {
  const [results, setResults] = useState({});
  const [stock, setStock] = useState([]);
  const [graphData, setGraphData] = useState(null);
  const [currentYear, setCurrentYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
        const pieLabels = data.graphpie.map((item) => item.c_receipt_tran_pay_mode);
        const pieValues = data.graphpie.map((item) => parseInt(item.total_amount || 0));

        setGraphData({
          labels: pieLabels,
          datasets: [
            {
              data: pieValues,
              backgroundColor: [
                "#3b82f6", // Blue
                "#10b981", // Emerald
                "#f59e0b", // Amber
                "#6366f1", // Indigo
                "#ec4899", // Pink
                "#8b5cf6", // Purple
              ],
              hoverOffset: 4,
              borderWidth: 2,
              borderColor: "#ffffff",
            },
          ],
        });
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
  }, [currentYear]);

  const handleReload = () => {
    setIsRefreshing(true);
    fetchData();
  };

  const cardConfig = [
    {
      title: "Total Donors",
      value: results.total_donor_count || 0,
      icon: Users,
      colorScheme: "blue",
      subtitle: "Registered animal welfare supporters",
    },
    {
      title: "Total Donations",
      value: results.total_donation || 0,
      icon: IndianRupee,
      colorScheme: "emerald",
      isCurrency: true,
      subtitle: "Gross financial contributions",
    },
    {
      title: "Website Donations",
      value: results.total_website_donation || 0,
      icon: Globe,
      colorScheme: "indigo",
      subtitle: "Online portal collections",
    },
    {
      title: "Material Donations",
      value: results.total_material_donation || 0,
      icon: Boxes,
      colorScheme: "amber",
      subtitle: "In-kind provisions & supplies",
    },
  ];

  return (
    <Layout>
      <div className="space-y-6 mt-2 pb-8">
        {/* Executive Header Banner (Flat) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-2xl p-5 border border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Executive Overview
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                FY {currentYear || "..."}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Real-time donor contributions, inventory stocks, and transaction analytics.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Year: {currentYear}</span>
            </div>

            <button
              type="button"
              onClick={handleReload}
              disabled={isRefreshing || loading}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold active:scale-95 transition-all duration-150 disabled:opacity-60"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span>{isRefreshing ? "Updating..." : "Refresh"}</span>
            </button>
          </div>
        </div>

        {/* 4 Core Stat Cards (Flat) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cardConfig.map((card, index) => (
            <StatCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              colorScheme={card.colorScheme}
              isCurrency={card.isCurrency}
              subtitle={card.subtitle}
            />
          ))}
        </div>

        {/* Two Columns: Current Month Stocks & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Current Month Stocks (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Current Month Stocks
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Balance in Stock (Kgs)
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                  {stock.length} Items
                </span>
              </div>

              {/* Stock Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 mt-4 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
                {stock.length === 0 ? (
                  <div className="col-span-2 py-8 text-center text-xs text-slate-400">
                    No stock records found for this period
                  </div>
                ) : (
                  stock.map((item, index) => {
                    const balance =
                      (Number(item.openpurch) || 0) -
                      (Number(item.closesale) || 0) +
                      ((Number(item.purch) || 0) - (Number(item.sale) || 0));

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15, delay: index * 0.02 }}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-colors duration-150"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-slate-800 truncate capitalize">
                            {item.item_name?.toLowerCase() || "Item"}
                          </span>
                          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100">
                            Kgs
                          </span>
                        </div>
                        <div className="text-lg font-black text-slate-900 tracking-tight">
                          <NumericFormat
                            thousandSeparator
                            thousandsGroupStyle="lakh"
                            displayType="text"
                            value={balance}
                          />
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right: Charts (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Doughnut Chart: Cash Receipts Payment Modes (Flat) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <PieIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Payment Mode Distribution
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Breakdown of receipts by payment channel
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col items-center justify-center min-h-[220px]">
                {graphData ? (
                  <div className="w-full max-w-xs h-56 relative flex items-center justify-center">
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
                              usePointStyle: true,
                              font: { size: 11, weight: "600" },
                              padding: 12,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 py-10">
                    No payment distribution data available
                  </div>
                )}
              </div>
            </div>

            {/* Bar Chart: Donation Types (Flat) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Donation Categories & Volume
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Comparison of amount and receipt counts
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <DonationBarChart data={results} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsDashboard;
