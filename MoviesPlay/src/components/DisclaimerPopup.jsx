import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDisclaimer } from "../store/dataslice";

const DisclaimerPopup = () => {
    const [show, setShow] = useState(false);
    const disclaimer = useSelector((state) => state.data.disclaimer)
    const dispatch = useDispatch()

    useEffect(() => {
       if(disclaimer)setShow(true)
    }, [disclaimer]);

    const handleAccept = () => {
        dispatch(setDisclaimer())
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-51 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="max-w-xl w-full mx-4 rounded-2xl border border-red-600 bg-linear-to-b from-black to-zinc-900 p-6 shadow-2xl">

                <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">
                    ⚠️ Disclaimer
                </h2>

                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    MoviesPlay is created <span className="text-white font-medium">
                        strictly for entertainment and educational purposes only</span>.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    This website does <span className="text-red-400 font-medium">
                        not host, upload, store, or distribute</span> any movies or copyrighted
                    content on its own servers.
                </p>

                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    All movie streams and related data are fetched from publicly available
                    third-party APIs on the internet. MoviesPlay does{" "}
                    <span className="text-red-400 font-medium">
                        not support or promote movie piracy
                    </span>.
                </p>

                <div className="mt-4">
                    <p className="text-gray-400 text-xs mb-2">
                        <span className="text-white font-semibold">Credits:</span>
                    </p>
                    <ul className="text-gray-400 text-xs list-disc list-inside space-y-1">
                        <li>VidAPI</li>
                        <li>CinemaOS</li>
                        <li>MoviesAPI</li>
                    </ul>
                </div>

                <button
                    onClick={handleAccept}
                    className="mt-6 w-full rounded-lg cursor-pointer bg-red-600 hover:bg-red-700 transition font-semibold text-white py-2"
                >
                    I Understand & Continue
                </button>
            </div>
        </div>
    );
};

export default DisclaimerPopup;
