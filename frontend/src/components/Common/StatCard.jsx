import React from 'react';

const StatCard = ({ title, value, icon, color = 'primary', subtitle }) => {
    const colorMap = {
        primary: { bg: '#eef2ff', border: '#e0e7ff', icon: '#4f46e5', value: '#4338ca' },
        success: { bg: '#f0fdf4', border: '#dcfce7', icon: '#16a34a', value: '#15803d' },
        warning: { bg: '#fffbeb', border: '#fef3c7', icon: '#d97706', value: '#b45309' },
        danger:  { bg: '#fef2f2', border: '#fee2e2', icon: '#dc2626', value: '#b91c1c' },
    };
    const c = colorMap[color] || colorMap.primary;

    return (
        <div
            className="rounded-xl p-6 transition-all duration-200 hover:shadow-md"
            style={{ background: '#fff', border: `1px solid ${c.border}` }}
        >
            <div className="flex items-center justify-between mb-4">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{title}</p>
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                    style={{ background: c.bg, color: c.icon }}
                >
                    {icon}
                </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: c.value }}>{value}</p>
            {subtitle && <p className="text-gray-400 text-xs mt-1.5">{subtitle}</p>}
        </div>
    );
};

export default StatCard;
