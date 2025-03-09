import { Testimonials } from "@/components/home/testimonials"
import { LearnMore } from "@/components/home/learn-more"
import { Hero } from "@/components/home/hero"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <LearnMore />
      <Testimonials />
    </div>
  )
}
