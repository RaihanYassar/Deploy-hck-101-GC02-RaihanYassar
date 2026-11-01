import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/HomePage'
import DetailPage from './pages/DetailPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
