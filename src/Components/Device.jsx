import React, { useEffect, useState } from 'react';
import { osName, browserName, isMobile, isTablet, isDesktop, mobileModel, deviceDetect } from 'react-device-detect';
import './Device.css';

const Device = () => {
    const [deviceType, setDeviceType] = useState('Detecting Device...');
    const [deviceInfo, setDeviceInfo] = useState({ os: '', browser: '', model: '' });

    const detectDevice = () => {
        const width = window.innerWidth;
        let detectedDeviceType = '';
        let detectedOS = osName;
        let detectedModel = '';

        if ((width <= 600 && isMobile) || isMobile) {
            detectedDeviceType = "Mobile Phone";
            detectedOS = osName.includes("Android") ? "Android" : osName;
            detectedModel = mobileModel || "Unknown Mobile Model";  
        } else if ((width > 600 && width <= 1024 && isTablet) || isTablet) {
            detectedDeviceType = "Tablet";
            detectedOS = osName.includes("Android") ? "Android" : osName;
            detectedModel = mobileModel || "Unknown Tablet Model"; 
        } else if (width > 1024 || isDesktop) {
            detectedDeviceType = "Desktop";
            detectedOS = osName.includes("Windows") ? "Windows" : osName.includes("Ubuntu") ? "Ubuntu" : osName.includes("Debian") ? "Debian" : osName;
            detectedModel = deviceDetect().model || "Standard Desktop"; 
        } else {
            detectedDeviceType = "Unknown Device";
            detectedModel = "Unknown Model";
        }

        setDeviceType(detectedDeviceType);
        setDeviceInfo({
            os: detectedOS,
            browser: browserName,
            model: detectedModel
        });
    };

    useEffect(() => {
        detectDevice();

        const handleResize = () => detectDevice(); 
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); 

    return (
        <div className="device-container">
            <div className="device-card">
                <h1>🤖 Device Detector 🤖</h1>
                <h2 className="device-title">You're on a {deviceType} device.</h2>
                <p className="device-message">
                    {deviceType === "Desktop" ? (
                        <>💻 Enjoy our desktop experience!</>
                    ) : (
                        <>
                            {deviceType === "Mobile Phone" && <>📱</>}
                            {deviceType === "Tablet" && <>📲</>}
                            We have content tailored for {deviceType} users.
                        </>
                    )}
                </p>
                <p className="device-info">
                    <strong>Operating System:</strong> {deviceInfo.os} <br />
                    <strong>Browser:</strong> {deviceInfo.browser} <br />
                    <strong>Device Model:</strong> {deviceInfo.model}
                </p>
            </div>
        </div>
    );
};

export default Device;
