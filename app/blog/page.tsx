'use client'

import React, { useState } from 'react'
import { MessageCircle, Repeat2, Heart, BarChart2, Share, Send, Image, FileText, Twitter } from 'lucide-react'

export default function Component() {
  const [userPrompt, setUserPrompt] = useState("")
  const [generatedContent, setGeneratedContent] = useState("Four years of Protocol Mainnet.\n\n130m+ Accounts.\n\nThousands of dApps.\n\nOne user owned internet.\n\nPreparing to 10x usage.")
  const [generatedImage, setGeneratedImage] = useState("/api/placeholder/800/800")

  const handleGenerate = () => {
    if (userPrompt.trim()) {
      setGeneratedContent("Generated content based on: " + userPrompt)
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#000000',
    color: 'white',
    padding: '32px 20px'
  }

  const wrapperStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  }

  const headerStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '40px',
    textAlign: 'center',
    color: '#e5e5e5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px'
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'start'
  }

  const sectionStyle = {
    backgroundColor: '#16181c',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #2f3336'
  }

  const buttonStyle = {
    backgroundColor: '#1d9bf0',
    color: 'white',
    padding: '14px 28px',
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '24px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.2s'
  }

  const textareaStyle = {
    width: '100%',
    height: '120px',
    backgroundColor: '#262626',
    border: '1px solid #404040',
    borderRadius: '12px',
    color: '#e5e5e5',
    padding: '16px',
    fontSize: '15px',
    resize: 'none',
    transition: 'border-color 0.2s'
  }

  const disabledTextareaStyle = {
    ...textareaStyle,
    backgroundColor: '#1e1e1e',
    cursor: 'not-allowed',
    opacity: 0.7
  }

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        <h1 style={headerStyle}>
          <Twitter size={32} color="#1d9bf0" />
          Twitter Post Generator
        </h1>
        <div style={gridStyle}>
          <div style={sectionStyle}>
            <InputSection
              icon={<Send size={20} />}
              title="Your Prompt"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Enter your tweet content..."
              textareaStyle={textareaStyle}
            />
            <InputSection
              icon={<FileText size={20} />}
              title="Generated Content"
              value={generatedContent}
              onChange={() => {}}
              placeholder="Your generated tweet will appear here..."
              textareaStyle={disabledTextareaStyle}
              disabled={true}
            />
            <InputSection
              icon={<Image size={20} />}
              title="Image Generation"
              value={generatedImage}
              onChange={() => {}}
              placeholder="Your image URL will appear here..."
              textareaStyle={disabledTextareaStyle}
              disabled={true}
            />
            <button 
              onClick={handleGenerate} 
              style={buttonStyle}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#1a8cd8'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = '#1d9bf0'}
            >
              Generate Tweet
              <Send size={18} style={{ marginLeft: '8px' }} />
            </button>
          </div>
          <div style={sectionStyle}>
            <TwitterPreview content={generatedContent} imageUrl={generatedImage} />
          </div>
        </div>
      </div>
    </div>
  )
}

function InputSection({ icon, title, value, onChange, placeholder, textareaStyle, disabled }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h2 style={{ 
        fontSize: '1.125rem', 
        fontWeight: '600', 
        marginBottom: '12px', 
        color: '#d4d4d4',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {icon}
        {title}
      </h2>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={textareaStyle}
        disabled={disabled}
      />
    </div>
  )
}

function TwitterPreview({ content, imageUrl }) {
  const [interactions, setInteractions] = useState({
    quoted: false,
    reposted: false,
    liked: false,
    stats: {
      quotes: 93,
      reposts: 190,
      likes: 939,
      views: 63000
    }
  })

  const previewStyle = {
    backgroundColor: '#16181c',
    borderRadius: '16px',
    overflow: 'hidden',
    color: '#e7e9ea',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  }

  const headerStyle = {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  }

  const avatarStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: '#2f3336',
    border: '1px solid #2f3336'
  }

  const contentStyle = {
    padding: '0 16px 16px',
    fontSize: '15px',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap'
  }

  const imageStyle = {
    width: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid #2f3336'
  }

  const timeStyle = {
    padding: '12px 16px',
    color: '#71767b',
    fontSize: '15px',
    borderBottom: '1px solid #2f3336'
  }

  const statsStyle = {
    padding: '12px 16px',
    display: 'flex',
    gap: '24px',
    color: '#71767b',
    fontSize: '13px',
    borderBottom: '1px solid #2f3336'
  }

  const actionsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 16px'
  }

  const actionButtonStyle = (active, color) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: active ? color : '#71767b',
    padding: '8px 12px',
    borderRadius: '9999px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '13px',
    transition: 'all 0.2s',
    fontWeight: '500'
  })

  const handleQuote = () => {
    setInteractions(prev => ({
      ...prev,
      quoted: !prev.quoted,
      stats: {
        ...prev.stats,
        quotes: prev.quoted ? prev.stats.quotes - 1 : prev.stats.quotes + 1
      }
    }))
  }

  const handleRepost = () => {
    setInteractions(prev => ({
      ...prev,
      reposted: !prev.reposted,
      stats: {
        ...prev.stats,
        reposts: prev.reposted ? prev.stats.reposts - 1 : prev.stats.reposts + 1
      }
    }))
  }

  const handleLike = () => {
    setInteractions(prev => ({
      ...prev,
      liked: !prev.liked,
      stats: {
        ...prev.stats,
        likes: prev.liked ? prev.stats.likes - 1 : prev.stats.likes + 1
      }
    }))
  }

  return (
    <div style={previewStyle}>
      <div style={headerStyle}>
        <div style={avatarStyle}>
          <img 
            src="/api/placeholder/48/48" 
            alt="Profile" 
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontWeight: '700' }}>NEAR Protocol</span>
            <span style={{ color: '#1d9bf0' }}>✓</span>
          </div>
          <span style={{ color: '#71767b' }}>@NEARProtocol</span>
        </div>
      </div>
      
      <div style={contentStyle}>{content}</div>
      
      <div style={{ padding: '0 16px 16px' }}>
        <img 
          src={imageUrl} 
          alt="Post content" 
          style={imageStyle}
        />
      </div>
      
      <div style={timeStyle}>1:30 PM · Oct 13, 2024</div>
      
      <div style={statsStyle}>
        <span><strong>{interactions.stats.quotes}</strong> Quotes</span>
        <span><strong>{interactions.stats.reposts}</strong> Reposts</span>
        <span><strong>{interactions.stats.likes}</strong> Likes</span>
        <span><strong>{(interactions.stats.views / 1000).toFixed(1)}K</strong> Views</span>
      </div>
      
      <div style={actionsStyle}>
        <button 
          style={actionButtonStyle(interactions.quoted, '#1d9bf0')}
          onClick={handleQuote}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#1d9bf015'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <MessageCircle 
            size={20} 
            color={interactions.quoted ? '#1d9bf0' : '#71767b'} 
          />
        </button>
        <button 
          style={actionButtonStyle(interactions.reposted, '#00ba7c')}
          onClick={handleRepost}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#00ba7c15'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Repeat2 
            size={20} 
            color={interactions.reposted ? '#00ba7c' : '#71767b'} 
          />
        </button>
        <button 
          style={actionButtonStyle(interactions.liked, '#f91880')}
          onClick={handleLike}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#f9188015'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Heart 
            size={20}
            color={interactions.liked ? '#f91880' : '#71767b'}
            fill={interactions.liked ? '#f91880' : 'none'}
          />
        </button>
        <button 
          style={actionButtonStyle(false)}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#1d9bf015'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <BarChart2 size={20} />
        </button>
        <button 
          style={actionButtonStyle(false)}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#1d9bf015'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Share size={20} />
        </button>
      </div>
    </div>
  )
}