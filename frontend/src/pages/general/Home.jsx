import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../../styles/reels.css'

const Home = () => {
  const containerRef = useRef(null)
  const [videos, setVideos] = useState([])
  const videoRefs = useRef(new Map())

  useEffect(() => {
    let mounted = true

    axios
      .get('http://localhost:3000/api/food', { withCredentials: true })
      .then((response) => {
        if (mounted) {
          setVideos(response?.data?.foodItems ?? [])
        }
      })
      .catch((error) => {
        console.error('Failed to fetch food videos', error)
        if (mounted) {
          setVideos([])
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const vidElems = Array.from(container.querySelectorAll('video'))
    if (vidElems.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (entry.isIntersecting && entry.intersectionRatio > 0.65) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0.65]
      }
    )

    vidElems.forEach((video) => {
      video.muted = true
      video.playsInline = true
      video.autoPlay = true
      observer.observe(video)
    })

    return () => {
      observer.disconnect()
    }
  }, [videos])

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id)
      return
    }
    videoRefs.current.set(id, el)
  }

  return (
    <div className="reels-container" ref={containerRef}>
      {videos.length === 0 ? (
        <div className="reels-empty">No videos to show.</div>
      ) : (
        videos.map((item) => (
          <section className="reel" key={item._id}>
            <video
              ref={setVideoRef(item._id)}
              src={item.video}
              className="reel-video"
              loop
              playsInline
              autoPlay
              muted
              preload="metadata"
            />

            <div className="reel-overlay">
              <div className="reel-description" title={item.name}>
                {item.name}
              </div>
              <div className="reel-description" title={item.description}>
                {item.description}
              </div>

              <Link className="reel-visit-btn" to={`/food-partner/${item.foodPartner}`}>
                Visit store
              </Link>
            </div>
          </section>
        ))
      )}
    </div>
  )
}

export default Home