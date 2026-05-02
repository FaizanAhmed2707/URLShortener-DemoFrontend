import React from "react";
import { Bar } from "react-chartjs-2";
import dayjs from "dayjs";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend, Tooltip, Filler } from "chart.js";
import { useTheme } from "../../contextApi/ThemeContext"; 

// Register necessary chart components
ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale, Legend, Filler);

// Define chart colors for light and dark modes
// Using primary brand colors (btnColor) for consistency
const CHART_COLORS = {
    light: {
        primary: '#3b82f6', // Blue-500
        secondary: '#1d4ed8', // Blue-700 for gradient stop
        gridColor: 'rgba(0, 0, 0, 0.08)',
        textColor: '#1f2937', 
        tooltipBg: 'rgba(0,0,0,0.8)',
        tooltipText: '#ffffff',
    },
    dark: {
        primary: '#60a5fa', // Blue-400
        secondary: '#3b82f6', // Blue-500 for gradient stop
        gridColor: 'rgba(255, 255, 255, 0.15)',
        textColor: '#e5e7eb', 
        tooltipBg: 'rgba(255,255,255,0.8)',
        tooltipText: '#1f2937',
    }
};

const Graph = ({ graphData }) => {
    const { theme } = useTheme();
    const colors = CHART_COLORS[theme] || CHART_COLORS.light;

    // Data preparation: The 'count' field from the query is correctly mapped to 'y' value.
    const labels = graphData?.map(item => dayjs(item.clickDate).format('MMM DD')) || [];
    const clickCounts = graphData?.map(item => item.count) || [];

    // --- Dynamic Gradient Generator ---
    const getGradient = (ctx) => {
        const chart = ctx.chart;
        const { ctx: canvasCtx, chartArea } = chart;
        if (!chartArea) {
            return null;
        }
        const gradient = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        
        // Use theme-specific colors for the gradient effect
        gradient.addColorStop(0, colors.secondary); // Darker shade at the base
        gradient.addColorStop(1, colors.primary); // Lighter shade at the top
        return gradient;
    };

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Daily Link Clicks",
                data: clickCounts,
                // Use the gradient generator function
                backgroundColor: getGradient, 
                hoverBackgroundColor: colors.primary, // Highlight on hover
                borderColor: colors.primary,
                borderWidth: 1,
                barThickness: 25, // Slightly thicker bars for impact
                borderRadius: 6,
                // Add subtle shadow to bars
                borderSkipped: false, 
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        animation: {
            duration: 1000, // Smoother animation
            easing: 'easeOutQuart',
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: colors.textColor,
                    font: {
                        size: 14,
                    }
                }
            },
            tooltip: {
                // Customized tooltip appearance based on theme
                backgroundColor: colors.tooltipBg,
                titleColor: colors.tooltipText,
                bodyColor: colors.tooltipText,
                borderColor: colors.primary,
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                // Ensure padding above the highest bar
                suggestedMax: Math.max(...clickCounts) * 1.2 || 10,
                grid: {
                    color: colors.gridColor,
                    borderDash: [5, 5], // Dashed grid lines
                    drawBorder: false,
                },
                ticks: {
                    color: colors.textColor,
                    font: { size: 12 },
                    // Ensure only whole numbers are displayed on the click count axis
                    callback: function (value) { return Number.isInteger(value) ? value.toString() : ""; },
                },
                title: {
                    display: true,
                    text: "Total Clicks",
                    font: { size: 14, weight: "600" },
                    color: colors.textColor, 
                },
            },
            x: {
                grid: {
                    display: false,
                    color: colors.gridColor,
                },
                ticks: {
                    color: colors.textColor,
                    font: { size: 12 },
                },
                title: {
                    display: true,
                    text: "Date",
                    font: { size: 14, weight: "600" },
                    color: colors.textColor,
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default Graph;