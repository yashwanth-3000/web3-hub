'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// Mock data for tweets (in a real app, these would be fetched from an API)
const mockTweets = Array(10).fill(null).map((_, i) => ({
  id: i + 1,
  author: `User${i + 1}`,
  handle: `@user${i + 1}`,
  content: `This is tweet number ${i + 1}. It contains some interesting content that might be worth repurposing.`,
  likes: Math.floor(Math.random() * 1000),
  retweets: Math.floor(Math.random() * 500),
  comments: Math.floor(Math.random() * 100),
}))

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
)

export default function TweetRepurposer() {
  const [currentTweetIndex, setCurrentTweetIndex] = useState(0)
  const [selectedTweets, setSelectedTweets] = useState<number[]>([])
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [isSelectionComplete, setIsSelectionComplete] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const searchParams = useSearchParams()
  const prompt = searchParams.get('prompt')

  useEffect(() => {
    setProgress((currentTweetIndex / mockTweets.length) * 100)
  }, [currentTweetIndex])

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setSelectedTweets(prev => [...prev, currentTweetIndex])
    }
    setCurrentTweetIndex(prev => prev + 1)
    if (currentTweetIndex === mockTweets.length - 1) {
      setIsSelectionComplete(true)
    }
  }

  const selectPlatform = (platform: string) => {
    setSelectedPlatform(platform)
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
      alert(`Content generated for ${selectedPlatform}!`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Elevate Your Social Media Game
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          {prompt ? (
            <>
              Based on your prompt: <span className="font-semibold text-blue-400">"{prompt}"</span>, 
              we've curated a selection of tweets. Now, let's transform them into captivating content 
              for various platforms. Here's how:
            </>
          ) : (
            "Transform curated tweets into captivating content for various platforms. Here's how:"
          )}
        </p>
        <motion.ol className="text-left space-y-4 bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg">
          {[
            "Swipe through our curated tweets",
            "Select at least 5 that align with your prompt",
            "Choose your target platform",
            `Generate tailored content based on "${prompt || 'your theme'}"`
          ].map((step, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center space-x-3"
            >
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full text-white font-bold">
                {index + 1}
              </span>
              <span>{step}</span>
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="w-full max-w-md h-2 bg-gray-700 rounded-full overflow-hidden mb-8"
      >
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </motion.div>
      
      {!isSelectionComplete ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTweetIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mb-8 border border-gray-700"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-600 rounded-full mr-4" />
              <div>
                <p className="font-bold">{mockTweets[currentTweetIndex].author}</p>
                <p className="text-gray-400">{mockTweets[currentTweetIndex].handle}</p>
              </div>
            </div>
            <p className="text-lg mb-6">{mockTweets[currentTweetIndex].content}</p>
            <div className="flex justify-between text-gray-400 mb-6">
              <span>💬 {mockTweets[currentTweetIndex].comments}</span>
              <span>🔁 {mockTweets[currentTweetIndex].retweets}</span>
              <span>❤️ {mockTweets[currentTweetIndex].likes}</span>
            </div>
            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSwipe('left')}
                className="px-6 py-2 bg-red-500 text-white rounded-full font-semibold transition-colors hover:bg-red-600"
              >
                Reject
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSwipe('right')}
                className="px-6 py-2 bg-green-500 text-white rounded-full font-semibold transition-colors hover:bg-green-600"
              >
                Accept
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full border border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Choose Your Platform
          </h2>
          <div className="flex justify-center space-x-4 mb-6">
            {['instagram', 'linkedin', 'youtube'].map((platform) => (
              <motion.button
                key={platform}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => selectPlatform(platform)}
                className={`p-3 rounded-lg transition-colors ${
                  selectedPlatform === platform
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                {platform === 'instagram' && <InstagramIcon />}
                {platform === 'linkedin' && <LinkedinIcon />}
                {platform === 'youtube' && <YoutubeIcon />}
              </motion.button>
            ))}
          </div>
          <div className="space-y-3 mb-6">
            {selectedTweets.map(index => (
              <div key={index} className="bg-gray-700 p-3 rounded-lg">
                <p className="font-semibold mb-1">{mockTweets[index].author}</p>
                <p>{mockTweets[index].content}</p>
              </div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerate}
            disabled={!selectedPlatform || isGenerating}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              !selectedPlatform || isGenerating
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isGenerating ? 'Generating...' : `Generate ${prompt ? 'Prompt-Inspired' : ''} Content`}
          </motion.button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-gray-400"
      >
        <p className="mb-2">All tweets were ethically sourced and curated to match your prompt.</p>
        <p>Powered by <span className="font-semibold text-purple-400">masa</span></p>
      </motion.div>
    </div>
  )
}