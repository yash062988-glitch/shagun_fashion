import { useEffect, useState } from "react"

const text =
    "We’d love to hear from you. Reach out to us using any of the options below or send us a message directly"

const words = text.split(" ")

export default function AnimatedParagraph() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let timer: number

        if (count < words.length) {
            timer = window.setTimeout(() => {
                setCount(count + 1)
            }, 90)
        } else {
            timer = window.setTimeout(() => {
                setCount(0)
            }, 2500)
        }

        return () => clearTimeout(timer)
    }, [count])

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
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    color: "inherit",
                    lineHeight: "inherit",
                    letterSpacing: "inherit",
                    textAlign: "inherit",
                    width: "100%",
                    maxWidth: "100%",
                }}
            >
                {words.slice(0, count).join(" ")}
                <span
                    style={{
                        animation: "blink 1s step-end infinite",
                        color: "inherit",
                    }}
                >
                    |
                </span>
            </div>
        </>
    )
}
