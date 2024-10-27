'use client'

import React, { useState } from 'react'
import { 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  Send, 
  Linkedin,
  PenLine,
  MessageSquare,
  Image as ImageIcon,
  Briefcase,
  Globe,
  MoreHorizontal,
  Heart,
  Repeat,
  Award
} from 'lucide-react'

export default function Component() {
  const [userPrompt, setUserPrompt] = React.useState("")
  const [generatedContent, setGeneratedContent] = React.useState("Share your professional journey—inspire others with your story.")
  const [generatedImage, setGeneratedImage] = React.useState("/api/placeholder/600/400")

  const handleGenerate = () => {
    if (userPrompt.trim()) {
      setGeneratedContent("Generated content based on: " + userPrompt)
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#000000',
    padding: '20px'
  }

  const buttonStyle = {
    backgroundColor: '#0a66c2',
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
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '8px',
    color: '#ffffff',
    padding: '12px',
    fontSize: '14px',
    resize: 'none'
  }

  const disabledTextareaStyle = {
    ...textareaStyle,
    backgroundColor: '#262626',
    cursor: 'not-allowed'
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
          <Linkedin size={32} color="#0a66c2" />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>
            LinkedIn Content Generator
          </h1>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '400px 400px', gap: '40px', justifyContent: 'center' }}>
          <div>
            <InputSection
              title="Your Prompt"
              icon={<PenLine size={20} color="#ffffff" />}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Enter your content idea or topic..."
              textareaStyle={textareaStyle}
            />
            <InputSection
              title="Generated Content"
              icon={<MessageSquare size={20} color="#ffffff" />}
              value={generatedContent}
              onChange={() => {}}
              placeholder="Your generated content will appear here..."
              textareaStyle={disabledTextareaStyle}
              disabled={true}
            />
            <InputSection
              title="Image Generation"
              icon={<ImageIcon size={20} color="#ffffff" />}
              value={generatedImage}
              onChange={() => {}}
              placeholder="Your image URL will appear here..."
              textareaStyle={disabledTextareaStyle}
              disabled={true}
            />
            <button 
              onClick={handleGenerate} 
              style={buttonStyle}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#084e96'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = '#0a66c2'}
            >
              Generate Content
              <Send size={16} style={{ marginLeft: '8px' }} />
            </button>
          </div>
          <LinkedInPreview content={generatedContent} imageUrl={generatedImage} />
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
        <h2 style={{ fontSize: '0.875rem', fontWeight: 'semibold', color: '#ffffff' }}>{title}</h2>
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

function LinkedInPreview({ content, imageUrl }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isCelebrated, setIsCelebrated] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [isReposted, setIsReposted] = useState(false)
  const [commentCount, setCommentCount] = useState(45)
  const [repostCount, setRepostCount] = useState(12)
  const [likeCount, setLikeCount] = useState(243)

  const previewStyle = {
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '8px',
    overflow: 'hidden',
    width: '400px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
  }

  const headerStyle = {
    padding: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  }

  const userInfoStyle = {
    display: 'flex',
    gap: '12px'
  }

  const avatarStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#333'
  }

  const nameStyle = {
    fontWeight: '600',
    color: '#ffffff',
    fontSize: '14px',
    marginBottom: '4px'
  }

  const headlineStyle = {
    color: '#999',
    fontSize: '12px',
    marginBottom: '4px'
  }

  const timeStyle = {
    color: '#999',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  }

  const contentStyle = {
    padding: '0 16px 16px',
    fontSize: '14px',
    color: '#ffffff',
    lineHeight: '1.5'
  }

  const imageContainerStyle = {
    width: '100%',
    backgroundColor: '#262626'
  }

  const statsStyle = {
    padding: '12px 16px',
    borderTop: '1px solid #333',
    borderBottom: '1px solid #333',
    display: 'flex',
    justifyContent: 'space-between',
    color: '#999',
    fontSize: '12px'
  }

  const actionsStyle = {
    padding: '4px 12px',
    display: 'flex',
    justifyContent: 'space-between'
  }

  const IconButton = ({ Icon, label, onClick, isActive, activeColor = '#0a66c2' }) => {
    const [isHovered, setIsHovered] = useState(false)
    
    return (
      <button 
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '12px',
          border: 'none',
          backgroundColor: 'transparent',
          color: isActive ? activeColor : '#999',
          cursor: 'pointer',
          borderRadius: '4px',
          transition: 'background-color 0.2s',
          fontSize: '12px',
          fontWeight: '600'
        }}
      >
        <Icon 
          size={20} 
          style={{ 
            strokeWidth: 2,
            color: isActive ? activeColor : '#999',
            fill: isActive ? activeColor : 'none'
          }} 
        />
        {label}
      </button>
    )
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleRepost = () => {
    setIsReposted(!isReposted)
    setRepostCount(prev => isReposted ? prev - 1 : prev + 1)
  }

  return (
    <div style={previewStyle}>
      <div style={headerStyle}>
        <div style={userInfoStyle}>
          <div style={avatarStyle}></div>
          <div>
            <div style={nameStyle}>John Doe</div>
            <div style={headlineStyle}>Senior Product Manager | Tech Enthusiast</div>
            <div style={timeStyle}>
              <span>2d</span>
              <Globe size={12} />
            </div>
          </div>
        </div>
        <MoreHorizontal style={{ color: '#999', cursor: 'pointer' }} size={20} />
      </div>
      
      <div style={contentStyle}>{content}</div>
      
      {imageUrl && (
        <div style={imageContainerStyle}>
          <img 
            src={imageUrl} 
            alt="Post content" 
            style={{ 
              width: '100%',
              height: 'auto',
              display: 'block'
            }} 
          />
        </div>
      )}
      
      <div style={statsStyle}>
        <span>{likeCount} reactions • {commentCount} comments</span>
        <span>{repostCount} reposts</span>
      </div>
      
      <div style={actionsStyle}>
        <IconButton 
          Icon={ThumbsUp} 
          label="Like"
          onClick={handleLike}
          isActive={isLiked}
        />
        <IconButton 
          Icon={MessageCircle} 
          label="Comment"
          onClick={() => setCommentCount(prev => prev + 1)}
        />
        <IconButton 
          Icon={Repeat} 
          label="Repost"
          onClick={handleRepost}
          isActive={isReposted}
        />
        <IconButton 
          Icon={Send} 
          label="Send"
          onClick={() => {}}
        />
      </div>
    </div>
  )
}