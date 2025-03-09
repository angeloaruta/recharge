import { HoverEffect } from "../card-hover-effect"

const services = [
  {
    title: "Orthopedic Rehabilitation",
    description:
      "Specialized therapy for recovery from joint surgeries, fractures, and musculoskeletal injuries with personalized exercise programs.",
  },
  {
    title: "Sports Injury Recovery",
    description:
      "Targeted rehabilitation for athletes of all levels, focusing on injury recovery, performance enhancement, and prevention strategies.",
  },
  {
    title: "Neurological Therapy",
    description:
      "Specialized care for conditions like stroke, Parkinson's, and MS, improving mobility, balance, and daily function.",
  },
  {
    title: "Geriatric Physical Therapy",
    description:
      "Age-appropriate therapy focusing on mobility, balance, strength, and fall prevention for seniors in the comfort of their homes.",
  },
  {
    title: "Post-Surgical Rehabilitation",
    description:
      "Customized recovery programs following surgery, designed to restore function, reduce pain, and accelerate healing.",
  },
  {
    title: "Chronic Pain Management",
    description:
      "Evidence-based techniques to reduce persistent pain, improve function, and enhance quality of life through therapeutic exercises.",
  },
]

export function LearnMore() {
  return (
    <>
      <div className="invisible h-16" id="learn-more" />
      <section className="relative isolate flex min-h-screen flex-col justify-center px-4">
        <div className="flex flex-col items-center md:gap-12">
          <div className="text-center">
            <h2 className="mb-6 text-4xl font-semibold tracking-tight md:text-5xl">
              Recharge Physical Therapy Services
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We bring professional physical therapy to your home, creating a personalized recovery
              experience that fits seamlessly into your life.
            </p>
          </div>
          <HoverEffect items={services} />
        </div>
      </section>
    </>
  )
}
