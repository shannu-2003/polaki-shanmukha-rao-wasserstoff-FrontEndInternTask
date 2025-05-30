import { Routes, Route } from 'react-router-dom'
import FormPage from './components/FormPage'
import TicketPage from './components/TicketPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/ticket" element={<TicketPage />} />
    </Routes>
  )
}

export default App
