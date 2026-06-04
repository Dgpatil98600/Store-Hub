import React, { useEffect, useState } from 'react';

const AlertMessage = ({ type = 'info', message, onClose, autoClose = 5000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (autoClose && message) {
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, autoClose);
            return () => clearTimeout(timer);
        }
    }, [autoClose, message, onClose]);

    if (!message || !visible) return null;

    const icons = {
        error: '✕',
        success: '✓',
        info: 'ℹ'
    };

    const classes = {
        error: 'alert-error',
        success: 'alert-success',
        info: 'alert-info'
    };

    return (
        <div className={`alert ${classes[type]}`}>
            <span className="text-lg font-bold">{icons[type]}</span>
            <span className="flex-1">{message}</span>
            {onClose && (
                <button
                    onClick={() => { setVisible(false); onClose(); }}
                    className="ml-2 opacity-60 hover:opacity-100 transition-opacity text-lg cursor-pointer bg-transparent border-none p-0"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default AlertMessage;
