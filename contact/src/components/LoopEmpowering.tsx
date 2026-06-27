import { useEffect, useState } from "react";

export default function LoopEmpowering() {
    const text1 = "Empowering students";
    const text2 = "through quality uniforms.";

    const [line1, setLine1] = useState("");
    const [line2, setLine2] = useState("");
    const [phase, setPhase] = useState(1);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (phase === 1) {
                if (index < text1.length) {
                    setLine1(text1.slice(0, index + 1));
                    setIndex(index + 1);
                } else {
                    setPhase(2);
                    setIndex(0);
                }
            } else {
                if (index < text2.length) {
                    setLine2(text2.slice(0, index + 1));
                    setIndex(index + 1);
                } else {
                    setTimeout(() => {
                        setLine1("");
                        setLine2("");
                        setPhase(1);
                        setIndex(0);
                    }, 1500);
                }
            }
        }, 70);

        return () => clearTimeout(timer);
    }, [index, phase]);

    return (
        <>
            <style>{`
                @keyframes blink {
                    50% {
                        opacity: 0;
                    }
                }
                .empowering-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                }
                .empowering-line1 {
                    font-family: "Playfair Display", serif;
                    font-style: italic;
                    font-size: 64px;
                    color: #002BB9;
                    white-space: nowrap;
                    line-height: 1.1;
                    text-align: center;
                }
                .empowering-line2 {
                    margin-top: 8px;
                    font-family: "Space Mono", monospace;
                    font-size: 52px;
                    color: #FFFFFF;
                    white-space: nowrap;
                    line-height: 1.2;
                    text-align: center;
                }
                @media screen and (max-width: 1023px) {
                    .empowering-line1 {
                        font-size: clamp(28px, 6.5vw, 48px) !important;
                        white-space: normal !important;
                        line-height: 1.25 !important;
                        padding: 0 16px !important;
                    }
                    .empowering-line2 {
                        font-size: clamp(22px, 5.5vw, 36px) !important;
                        white-space: normal !important;
                        line-height: 1.35 !important;
                        padding: 0 16px !important;
                    }
                }
            `}</style>

            <div className="empowering-container">
                <div className="empowering-line1">
                    {line1}
                    {phase === 1 && (
                        <span style={{ animation: "blink 1s infinite" }}>|</span>
                    )}
                </div>

                <div className="empowering-line2">
                    {line2}
                    {phase === 2 && (
                        <span style={{ animation: "blink 1s infinite" }}>|</span>
                    )}
                </div>
            </div>
        </>
    );
}
