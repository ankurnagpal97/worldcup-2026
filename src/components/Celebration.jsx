import { useEffect, useRef } from 'react'
import { TEAMS } from '../data/teams.js'

function randomBetween(a, b) {
  return a + Math.floor(Math.random() * (b - a))
}

const COLORS = ['#FFD700', '#C0392B', '#27AE60', '#2980B9', '#8E44AD', '#F39C12', '#1ABC9C', '#E74C3C']

function Confetti({ count = 120 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const pieces = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      w: randomBetween(8, 18),
      h: randomBetween(5, 12),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: randomBetween(3, 7),
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
    }))

    let animId
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of pieces) {
        ctx.save()
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotSpeed
        if (p.y > canvas.height) {
          p.y = -20
          p.x = Math.random() * canvas.width
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [count])

  return <canvas ref={canvasRef} className="confetti-canvas" />
}

export default function Celebration({ champion, onClose }) {
  const team = TEAMS[champion]
  if (!team) return null

  return (
    <div className="celebration-overlay" onClick={onClose}>
      <Confetti count={150} />
      <div className="celebration-card" onClick={e => e.stopPropagation()}>
        <div className="trophy-anim">🏆</div>
        <div className="celebration-flag">{team.flag}</div>
        <h1 className="celebration-title">WORLD CHAMPION!</h1>
        <h2 className="celebration-country">{team.name}</h2>
        <p className="celebration-sub">FIFA World Cup 2026</p>
        <button className="celebration-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}
