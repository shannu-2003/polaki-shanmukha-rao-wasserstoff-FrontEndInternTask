import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function FormPage() {
  const navigate = useNavigate()
  const [avatar, setAvatar] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', github: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      ...form,
      avatar: avatar ? URL.createObjectURL(avatar) : null
    }
    localStorage.setItem('ticketData', JSON.stringify(data))
    navigate('/ticket')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-[#1a1a2e] p-8 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Your Journey to Coding Conf 2025 Starts Here!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-orange-500 file:text-white"
          />
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full p-2 rounded bg-[#16213e] border border-gray-600"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full p-2 rounded bg-[#16213e] border border-gray-600"
          />
          <input
            type="text"
            placeholder="GitHub Username"
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            required
            className="w-full p-2 rounded bg-[#16213e] border border-gray-600"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 py-2 rounded font-semibold hover:bg-orange-600"
          >
            Generate My Ticket
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormPage
