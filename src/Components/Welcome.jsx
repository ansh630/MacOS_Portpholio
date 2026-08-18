import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
}

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, index) => (
    <span
      key={`${char}-${index}`}
      className={`${className} inline-block`}
      style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ))
}

const setupTextHover = (container, type) => {
  if (!container) return () => {}

  const letters = [...container.querySelectorAll("span")]
  const { min, max, default: base } = FONT_WEIGHTS[type] ?? FONT_WEIGHTS.title

  const animateLetter = (letter, weight, duration = 0.25) => {
    gsap.to(letter, {
      duration,
      ease: "power2.out",
      overwrite: "auto",
      fontVariationSettings: `"wght" ${Math.round(weight)}`,
    })
  }

  const handleMouseMove = (event) => {
    const mouseX = event.clientX

    letters.forEach((letter) => {
      const { left, width } = letter.getBoundingClientRect()
      const distance = Math.abs(mouseX - (left + width / 2))
      const intensity = Math.exp(-(distance ** 2) / 20000)

      animateLetter(letter, min + (max - min) * intensity)
    })
  }

  const handleMouseLeave = () => {
    letters.forEach((letter) => animateLetter(letter, base, 0.3))
  }

  container.addEventListener("mousemove", handleMouseMove)
  container.addEventListener("mouseleave", handleMouseLeave)

  return () => {
    container.removeEventListener("mousemove", handleMouseMove)
    container.removeEventListener("mouseleave", handleMouseLeave)
    gsap.killTweensOf(letters)
  }
}

const Welcome = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useGSAP(
    () => {
      const cleanupTitle = setupTextHover(titleRef.current, "title")
      const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle")

      return () => {
        cleanupTitle()
        cleanupSubtitle()
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="welcome"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center text-white"
    >
      <p ref={subtitleRef}>
        {renderText("Hey, I am Anshuman! Welcome to my", "text-3xl font-georama", 100)}
      </p>

      <h1
        ref={titleRef}
        className="mt-7 w-fit transition-transform duration-300 hover:scale-105"
      >
        {renderText("Portfolio", "text-9xl italic font-georama", 400)}
      </h1>
    </section>
  )
}

export default Welcome
