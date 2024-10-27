'use client'

import React, { useState } from 'react'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Instagram, PenLine, MessageSquare, Image } from 'lucide-react'

export default function Component() {
  const [userPrompt, setUserPrompt] = React.useState("")
  const [generatedContent, setGeneratedContent] = React.useState("Share your story—capture moments that matter.")
  const [generatedImage, setGeneratedImage] = React.useState("/api/placeholder/600/600")

  const handleGenerate = () => {
    if (userPrompt.trim()) {
      setGeneratedContent("Generated content based on: " + userPrompt)
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#000000',
    color: 'white',
    padding: '20px'
  }

  const buttonStyle = {
    backgroundColor: '#E1306C',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '20px',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'background-color 0.2s'
  }

  const textareaStyle = {
    width: '100%',
    height: '100px',
    backgroundColor: '#262626',
    border: '1px solid #404040',
    borderRadius: '8px',
    color: '#e5e5e5',
    padding: '12px',
    fontSize: '14px',
    resize: 'none'
  }

  const disabledTextareaStyle = {
    ...textareaStyle,
    backgroundColor: '#1e1e1e',
    cursor: 'not-allowed',
    opacity: 0.7
  }

  const titleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '20px'
  }

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={titleContainerStyle}>
          <Instagram size={32} color="#E1306C" />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e5e5e5' }}>
            Instagram Content Generator
          </h1>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '400px 400px', gap: '40px', justifyContent: 'center' }}>
          <div>
            <InputSection
              title="Your Prompt"
              icon={<PenLine size={20} />}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Enter your content idea or topic..."
              textareaStyle={textareaStyle}
            />
            <InputSection
              title="Generated Caption"
              icon={<MessageSquare size={20} />}
              value={generatedContent}
              onChange={() => {}}
              placeholder="Your generated caption will appear here..."
              textareaStyle={disabledTextareaStyle}
              disabled={true}
            />
            <InputSection
              title="Image Generation"
              icon={<Image size={20} />}
              value={generatedImage}
              onChange={() => {}}
              placeholder="Your image URL will appear here..."
              textareaStyle={disabledTextareaStyle}
              disabled={true}
            />
            <button 
              onClick={handleGenerate} 
              style={buttonStyle}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#C13584'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = '#E1306C'}
            >
              Generate Content
              <span style={{ marginLeft: '8px' }}>→</span>
            </button>
          </div>
          <InstagramPreview content={generatedContent} imageUrl={generatedImage} />
        </div>
      </div>
    </div>
  )
}

function InputSection({ title, icon, value, onChange, placeholder, textareaStyle, disabled }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        {icon}
        <h2 style={{ fontSize: '0.875rem', fontWeight: 'semibold', color: '#d4d4d4' }}>{title}</h2>
      </div>
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

function InstagramPreview({ content, imageUrl }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(9311)

  const previewStyle = {
    backgroundColor: '#000000',
    border: '1px solid #363636',
    borderRadius: '12px',
    overflow: 'hidden',
    width: '400px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.05)'
  }

  const headerStyle = {
    padding: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #262626'
  }

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  }

  const avatarStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#262626'
  }

  const imageContainerStyle = {
    width: '400px',
    height: '400px',
    backgroundColor: '#262626'
  }

  const actionsStyle = {
    padding: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const leftActionsStyle = {
    display: 'flex',
    gap: '16px'
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const IconButton = ({ Icon, onClick, isActive, activeColor }) => {
    const [isHovered, setIsHovered] = useState(false)
    
    return (
      <div 
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          cursor: 'pointer',
          transition: 'transform 0.2s',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)'
        }}
      >
        <Icon 
          size={24} 
          style={{ 
            strokeWidth: 2,
            color: isActive ? activeColor : '#e5e5e5',
            fill: isActive ? activeColor : 'none',
            transition: 'all 0.2s'
          }} 
        />
      </div>
    )
  }

  return (
    <div style={previewStyle}>
      <div style={headerStyle}>
        <div style={userInfoStyle}>
          <div style={avatarStyle}></div>
          <span style={{ color: '#e5e5e5', fontWeight: '600' }}>User Name</span>
        </div>
        <MoreHorizontal style={{ color: '#e5e5e5', cursor: 'pointer' }} size={24} />
      </div>
      
      <div style={imageContainerStyle}>
        <img 
          src={imageUrl} 
          alt="Post content" 
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }} 
        />
      </div>
      
      <div style={actionsStyle}>
        <div style={leftActionsStyle}>
          <IconButton 
            Icon={Heart} 
            onClick={handleLike} 
            isActive={isLiked} 
            activeColor="#E1306C" 
          />
          <IconButton Icon={MessageCircle} onClick={() => {}} />
          <IconButton Icon={Send} onClick={() => {}} />
        </div>
        <IconButton 
          Icon={Bookmark} 
          onClick={handleBookmark} 
          isActive={isBookmarked} 
          activeColor="#e5e5e5" 
        />
      </div>
      
      <div style={{ padding: '0 12px', fontWeight: '600', fontSize: '14px', color: '#e5e5e5' }}>
        {likeCount.toLocaleString()} likes
      </div>
      
      <div style={{ padding: '0 12px 12px 12px', fontSize: '14px', color: '#e5e5e5' }}>
        <span style={{ fontWeight: '600', marginRight: '6px' }}>User Name</span>
        {content}
      </div>
      
      <div style={{ fontSize: '12px', color: '#8e8e8e', padding: '0 12px 12px 12px', textTransform: 'uppercase' }}>
        5 DAYS AGO
      </div>
    </div>
  )
}