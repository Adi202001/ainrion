"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Code, Cpu, Database, Server, Cloud, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const TechIcon = ({ icon: Icon, delay }: { icon: React.ElementType, delay: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <motion.div
      className="absolute text-cyan-400 cursor-pointer"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: 360 }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        repeatType: "loop",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={isHovered ? { scale: 1.2, rotate: 360 } : {}}
        transition={{ duration: 0.3 }}
      >
        <Icon size={24} />
      </motion.div>
    </motion.div>
  )
}

const Particle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute bg-cyan-500 rounded-full"
    style={{
      width: Math.random() * 4 + 1,
      height: Math.random() * 4 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, Math.random() * 100 - 50],
      y: [0, Math.random() * 100 - 50],
    }}
    transition={{
      duration: Math.random() * 5 + 5,
      delay,
      repeat: Infinity,
      repeatType: "loop",
    }}
  />
)

export function ComingSoonComponent() {
  const [email, setEmail] = useState("")
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { duration: 2, repeat: Infinity }
    })
  }, [controls])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribed:", email)
    setEmail("")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-cyan-400 bg-gray-900 font-mono">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, #0a2463 0%, #1e1e1e 50%)",
              "radial-gradient(circle at 80% 80%, #1e1e1e 0%, #0a2463 50%)",
            ],
          }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
        />
        {[...Array(150)].map((_, i) => (
          <Particle key={i} delay={i * 0.1} />
        ))}
        {[Code, Cpu, Database, Server, Cloud, Lock].map((Icon, index) => (
          <TechIcon key={index} icon={Icon} delay={index * 2} />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="z-10 text-center px-4 max-w-4xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-6xl font-bold mb-6 text-cyan-300 relative inline-block"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ainrion is Coming Soon
          <motion.span
            className="absolute -top-4 -right-4 text-yellow-400 text-2xl"
            animate={controls}
          >
            ⚡
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-2xl mb-12 text-cyan-400"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We&apos;re engineering the future. Be the first to know when we launch!
        </motion.p>

        {/* Newsletter Signup */}
        <motion.form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-4 mb-12 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow bg-gray-800 border-cyan-500 text-cyan-300 placeholder-cyan-600 focus:ring-2 focus:ring-cyan-400 transition-all duration-300 hover:border-cyan-400"
          />
          <Button
            type="submit"
            className="bg-cyan-500 text-gray-900 hover:bg-cyan-400 group transition-all duration-300 transform hover:scale-105 hover:rotate-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Notify Me
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-cyan-300 rounded-md -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 transition-colors group relative overflow-hidden">
            Need to get in touch? Contact Us
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-300 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-4 text-sm text-cyan-600 hover:text-cyan-400 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        © {new Date().getFullYear()} Ainrion. All rights reserved.
      </motion.footer>
    </div>
  )
}