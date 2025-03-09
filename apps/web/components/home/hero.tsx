"use client"

import { GradientBackground } from "../layout/gradient-background"
import { HeroButton } from "../hero-button"

export function Hero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col justify-center px-6 pt-14 lg:px-8">
      <GradientBackground type="top" />
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            <span className="hover:text-shimmer cursor-pointer">Recharge</span> Your Potential
          </h1>
          <p className="text-muted-foreground mt-8 text-lg font-medium text-pretty sm:text-xl/8">
            Expert physical therapy that comes to you, designed for lasting recovery and renewed
            strength.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-x-6 gap-y-4 sm:flex-row">
            <HeroButton text="Book Now" href="/booking" />
            <HeroButton text="Learn more" href="#learn-more" arrowUp={false} />
          </div>
        </div>
      </div>
      <GradientBackground type="bottom" />
    </section>
  )
}
