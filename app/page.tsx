"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";
import { Instagram, Twitter, Linkedin, Youtube, ArrowRight, Bot, Sparkles } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";


// Typewriter Text Component
const TypewriterText = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const texts = [
    "Create an Instagram post about DeFi yield farming strategies...",
    "Write a LinkedIn article about NFT market trends...",
    "Generate a YouTube script about Web3 gaming...",
    "Compose a Twitter thread about crypto regulations...",
    "Design content about DAO governance structures..."
  ];

  useEffect(() => {
    const text = texts[currentTextIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(text.substring(0, displayText.length + 1));
        if (displayText.length === text.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setDisplayText(text.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [displayText, currentTextIndex, isDeleting]);

  return displayText;
};

// BentoGrid Components
const BentoGrid = ({ children, className }) => {
  return (
    <div className={cn("grid w-full auto-rows-[16rem] grid-cols-3 gap-3", className)}>
      {children}
    </div>
  );
};

const BentoCard = ({ name, className, background, Icon, description, href, cta }) => (
  <div className={cn(
    "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
    "bg-neutral-900 [box-shadow:0_0_0_1px_rgba(255,255,255,.1),0_2px_4px_rgba(255,255,255,.05),0_12px_24px_rgba(255,255,255,.05)]",
    "transform-gpu [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
    className,
  )}>
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-4 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-10 w-10 origin-left transform-gpu text-neutral-300 transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-lg font-semibold text-neutral-300">{name}</h3>
      <p className="max-w-lg text-sm text-neutral-400">{description}</p>
    </div>
    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
      <Button variant="ghost" size="sm" className="pointer-events-auto text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800">
        <Link href={href}>
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-neutral-800/50" />
  </div>
);

// Features Data
const features = [
  {
    Icon: Instagram,
    name: "Instagram Creator",
    description: "Design eye-catching posts and stories that capture your audience's attention.",
    href: "docs",
    cta: "Create Post",
    className: "col-span-2 row-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-800 opacity-20" />,
  },
  {
    Icon: Twitter,
    name: "Tweet Composer",
    description: "Craft engaging tweets that spark conversations and increase your reach.",
    href: "blog",
    cta: "Compose Tweet",
    className: "col-span-1 row-span-1",
    background: <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 opacity-20" />,
  },
  {
    Icon: Linkedin,
    name: "LinkedIn Pulse",
    description: "Generate professional content that resonates with your network and industry.",
    href: "about",
    cta: "Write Article",
    className: "col-span-1 row-span-1",
    background: <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-indigo-800 opacity-20" />,
  },
  {
    Icon: Youtube,
    name: "YouTube Studio",
    description: "Create compelling video scripts and optimize your content for better engagement.",
    href: "/create/youtube",
    cta: "Start Scripting",
    className: "col-span-3 row-span-1",
    background: <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-pink-700 opacity-20" />,
  },
];
// Main Component
export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(`/story?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with increased padding */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative py-32 md:py-40 overflow-hidden" // Increased padding top and bottom
      >
        {/* Animated background elements - adjusted positions */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl animate-pulse" />
          <div className="absolute top-40 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
          <div className="absolute top-40 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
          <div className="absolute bottom-40 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-2">
                Web3 Content Hub
              </h1>
              <p className="text-2xl text-gray-400 mb-4">
                Transform your crypto ideas into engaging Web3 content
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="w-full mb-8" // Added bottom margin
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Input container */}
              <div className="relative group mb-4"> {/* Added bottom margin */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative flex items-center bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-2">
                  <Input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={TypewriterText()}
                    className="border-0 bg-transparent"
                    classNames={{
                      base: "h-14",
                      input: "text-lg text-gray-200 placeholder:text-gray-400",
                      inputWrapper: [
                        "bg-transparent",
                        "h-14",
                        "px-4",
                        "!cursor-text",
                        "shadow-none",
                      ]
                    }}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-12 px-6 ml-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>
                      {isLoading ? 'Generating...' : 'Generate'}
                    </span>
                  </Button>
                </div>
              </div>
              
              {/* Powered by section */}
              <div className="flex items-center justify-center gap-4 text-gray-400">
                <Bot className="w-5 h-5 text-blue-500" />
                <span>Powered by</span>
                <Link 
                  href="https://near.ai" 
                  target="_blank" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  near.ai
                </Link>
                <span>&</span>
                <Link 
                  href="https://masa.finance" 
                  target="_blank" 
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  masa
                </Link>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </motion.section>

      {/* BentoGrid Section with increased top padding */}
      <section className="container mx-auto px-4 py-24"> {/* Increased padding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Cross-Platform Content Creation
            </h2>
            <p className="text-xl text-gray-400 mb-4">
              Optimize your social media presence with AI-powered content creation
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Bot className="w-4 h-4" />
              <span>Intelligent content generation for your Web3 needs</span>
            </div>
          </div>
          
          <BentoGrid>
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </motion.div>
      </section>
    </div>
  );
}