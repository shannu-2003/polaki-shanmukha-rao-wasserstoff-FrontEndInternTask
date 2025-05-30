import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function TicketPage() {
  const [data, setData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem('ticketData')
    if (!saved) return navigate('/')
    setData(JSON.parse(saved))
  }, [navigate])

  if (!data) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-2xl font-bold mb-4">
        Congrats, <span className="text-orange-500">{data.name}!</span> Your ticket is ready.
      </h1>
      <p className="mb-6 text-sm text-gray-300">
        We've emailed your ticket to <span className="underline">{data.email}</span>.
      </p>
      <div className="bg-[#1a1a2e] p-6 rounded-lg shadow-lg w-full max-w-sm">
        <p className="text-sm text-gray-400 mb-2">Coding Conf - Jan 31, 2025 / Austin, TX</p>
        <div className="flex items-center space-x-4 mt-2">
          <img
            src={data.avatar}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold">{data.name}</p>
            <p className="text-gray-400">@{data.github}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketPage
