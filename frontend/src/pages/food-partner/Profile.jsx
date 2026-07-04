import React,{useState, useEffect} from 'react'
import './Profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const VideoTile = ({ label = 'video' }) => (
  <div className="fp-video-tile">
    <div className="fp-video-label">{label}</div>
  </div>
)

const Profile = () => {
    const {id} = useParams()
    const [profile, setProfile] = useState(null)
  const tiles = Array.from({ length: 18 }, (_, i) => ({ id: i, label: 'video' }))

  useEffect(() => { 
    axios.get(`http://localhost:3000/api/food-partner/${id}`, {withCredentials: true})
.then(response =>{
      setProfile(response.data.foodPartner);
    })
  },[id])

  return (
    <div className="fp-page">
      <div className="fp-card">
        <div className="fp-card-top">
          <div className="fp-avatar" aria-hidden="true" />
          <div className="fp-meta">
            <div className="fp-name">{profile?.name}</div>
            <div className="fp-chip">{profile?.address}</div>
          </div>
        </div>

        <div className="fp-stats">
          <div className="fp-stat">
            <div className="fp-stat-label">total meals</div>
            <div className="fp-stat-value">{profile?.totalMeals}</div>
          </div>
          <div className="fp-stat">
            <div className="fp-stat-label">customer serve</div>
            <div className="fp-stat-value">{profile?.customerServed}</div>
          </div>
        </div>
      </div>

      {/* feed-style grid: many tiles, vertically scrollable like reels */}
      <div className="fp-grid fp-feed">
        {tiles.map(t => (
          <VideoTile key={t.id} label={t.label} />
        ))}
      </div>
    </div>
  )
}

export default Profile