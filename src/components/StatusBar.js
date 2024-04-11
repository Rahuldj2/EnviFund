// StatusBar.js
import React,{ useState,useEffect } from "react";
import { useMoralis } from "react-moralis";

const StatusBar = () => {
    const [showStatus,setShowStatus] = useState(false);
    const [connected,setConnected] = useState(false);
    const { enableWeb3,account,isWeb3Enabled,deactivateWeb3 } = useMoralis();

    useEffect(() => {
        if (isWeb3Enabled) {
            setConnected(true);
            setShowStatus(true);
            setTimeout(() => {
                setShowStatus(false);
            },5000);
        }
    },[isWeb3Enabled]);

    useEffect(() => {
        const handleAccountChange = (newAccount) => {
            if (newAccount == null) {
                window.localStorage.removeItem("connected");
                deactivateWeb3();
                setConnected(false);
            }
        };

        handleAccountChange(account);

        return () => {
            window.removeEventListener("accountChange",handleAccountChange);
        };
    },[account,deactivateWeb3]);

    return (
        <div>
            {showStatus && (
                <div
                    className={`fixed bottom-0 left-0 right-0 py-2 text-center text-white ${connected ? "bg-grootGreen" : "bg-grootRed"
                        } transition-opacity duration-300`}
                >
                    {connected
                        ? "Connected to wallet."
                        : "Connecting to wallet..."}
                </div>
            )}
        </div>
    );
};

export default StatusBar;
