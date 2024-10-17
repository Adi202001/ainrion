"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Send, Code, Cpu, Database, Server, Cloud, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

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

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { duration: 2, repeat: Infinity }
    })
  }, [controls])

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
  
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })
  
      const result = await response.json()
  
      if (result.success) {
        toast({
          title: "Message Sent",
          description: "Thank you for contacting us. We'll get back to you soon!",
          className: "bg-gray-800 border-cyan-500 text-cyan-300",
        })
        setName("")
        setEmail("")
        setMessage("")
      } else {
        throw new Error(result.message)
      }
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
        className: "bg-gray-800 border-red-500 text-red-300",
      })
      console.error("Error sending message:", error)
    } finally {
      setIsSubmitting(false)
    }
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
        className="z-10 w-full max-w-md px-4 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="bg-gray-800 bg-opacity-50 rounded-lg p-8 backdrop-blur-sm border border-cyan-500 shadow-lg shadow-cyan-500/20 dark:border-zinc-800"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-cyan-300 relative inline-block">
            Contact Us
            <motion.span
              className="absolute -top-4 -right-4  text-yellow-400 text-2xl"
              animate={controls}
            >
              ⚡
            </motion.span>
          </h2>
          <form onSubmit={handleContact} className="space-y-4">
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-gray-700 border-cyan-500 text-cyan-300 placeholder-cyan-600 focus:ring-2 focus:ring-cyan-400 transition-all duration-300 hover:border-cyan-400"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-700 border-cyan-500 text-cyan-300 placeholder-cyan-600 focus:ring-2 focus:ring-cyan-400 transition-all duration-300 hover:border-cyan-400"
            />
            <Textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full bg-gray-700 border-cyan-500 text-cyan-300 placeholder-cyan-600 focus:ring-2 focus:ring-cyan-400 transition-all duration-300 hover:border-cyan-400"
            />
            <Button 
              type="submit" 
              className="w-full bg-cyan-500 text-gray-900 hover:bg-cyan-400 group transition-all duration-300 transform hover:scale-105 hover:rotate-1" 
              disabled={isSubmitting}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
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
              <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center group relative overflow-hidden">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Coming Soon
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