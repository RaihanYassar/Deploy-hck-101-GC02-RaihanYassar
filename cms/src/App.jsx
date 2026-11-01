import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProductsPage from './pages/ProductsPage'
import AddProductPage from './pages/AddProductPage'
import EditProductPage from './pages/EditProductPage'
import ImageProductPage from './pages/ImageProductPage'
import CategoriesPage from './pages/CategoriesPage'
import StaffPage from './pages/StaffPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
            path='/'
            element={<Navigate to='/login' replace />}
        />

        <Route
            path='/login'
            element={<LoginPage />}
        />

        <Route
            path='/dashboard'
            element={<DashboardPage />}
        />

        <Route
            path='/products'
            element={<ProductsPage />}
        />

        <Route
            path='/products/add'
            element={<AddProductPage />}
        />

        <Route
            path='/products/edit/:id'
            element={<EditProductPage />}
        />

        <Route
          path='/products/image/:id'
          element={<ImageProductPage />}
        />

        <Route
            path='/categories'
            element={<CategoriesPage />}
        />

        <Route
            path='/staff'
            element={<StaffPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
