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
            `}</style>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        fontFamily: "Playfair Display",
                        fontStyle: "italic",
                        fontSize: "64px",
                        color: "#002BB9",
                        whiteSpace: "nowrap",
                        lineHeight: "1.1",
                    }}
                >
                    {line1}
                    {phase === 1 && (
                        <span style={{ animation: "blink 1s infinite" }}>|</span>
                    )}
                </div>

                <div
                    style={{
                        marginTop: "8px",
                        fontFamily: "Space Mono",
                        fontSize: "52px",
                        color: "#FFFFFF",
                        whiteSpace: "nowrap",
                        lineHeight: "1.2",
                    }}
                >
                    {line2}
                    {phase === 2 && (
                        <span style={{ animation: "blink 1s infinite" }}>|</span>
                    )}
                </div>
            </div>
        </>
    );
}
