// StatusBar.js
import React,{ useState,useEffect } from "react";
import { useMoralis } from "react-moralis";

const StatusBar = () => {
    const [showStatus,setShowStatus] = useState(false);
    const [connected,setConnected] = useState(false);
    const { enableWeb3,account,isWeb3Enabled,deactivateWeb3 } = useMoralis();

    useEffect(() => {
        console.log("Checking for existing connection...");
        console.log("isWeb3Enabled: ",isWeb3Enabled);
        console.log("showStatus: ",showStatus);
    },[]);

    useEffect(() => {
        if (isWeb3Enabled) {
            console.log("Web3 connection enabled.");
            setConnected(true);
            setShowStatus(true);
            setTimeout(() => {
                setShowStatus(false);
            },5000);
        }
        else {
            console.log("Web3 connection disabled.");
            setConnected(false);
            setShowStatus(true);
        }
    },[isWeb3Enabled]);

    useEffect(() => {
        const handleAccountChange = (newAccount) => {
            console.log("Account change detected:",newAccount);
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

    console.log("Rendering StatusBar. Connected:",connected);

    return (
        showStatus && <div>
            {connected ? (
                <div
                    className="fixed bottom-0 left-0 right-0 py-2 text-center text-white bg-grootGreen font-semibold"
                >
                    Connected to wallet.
                </div>
            ) : (
                <button
                    className="fixed bottom-0 left-0 right-0 bg-grootRed text-white py-2 text-center font-semibold"
                    onClick={async () => {
                        await enableWeb3();
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected","injected");
                        }
                    }}
                >
                    Connect your wallet
                </button>
            )}
        </div>
    );
};

export default StatusBar;
