import React, { useEffect, useState } from 'react';
import './Device.css';

const Device = () => {
    const [deviceType, setDeviceType] = useState('Detecting Device...');

    const detectDevice = () => {
        const width = window.innerWidth;

        if (width <= 600) {
            setDeviceType("Mobile Phone");
        } else if (width > 600 && width <= 1024) {
            setDeviceType("Tablet");
        } else {
            setDeviceType("Desktop");
        }
    };

   
    useEffect(() => {
        detectDevice();
    }, []);

    useEffect(() => {
        const handleResize = () => detectDevice();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="device-container">
            <h1>🤖Device Detector🤖</h1>
            <h1 className="device-title">You're on a {deviceType} device.</h1>
            <p className="device-message">
                {deviceType === "Desktop" ? (
                    <>💻 Enjoy our desktop experience!</>
                ) : (
                    <>{deviceType === "Mobile Phone" && <>📱</>}
                        {deviceType === "Tablet" && <>📲</>}
                        We have content for {deviceType} users. </>
                )}
            </p>
        </div>
    );
};

export default Device;
