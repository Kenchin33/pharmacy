import React, {useEffect, useState} from "react";

const Toast = ({ message, onClose}) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            setTimeout(onClose, 150);
        }, 2000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast ${!show ? "fade-out" : ""}`}>
            {message}
            <div className="progress-bar"></div>
        </div>
    );
}

export default Toast;