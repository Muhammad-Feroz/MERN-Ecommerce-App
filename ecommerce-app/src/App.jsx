import './App.css'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Main from './modules/Main'
import NotFound from './components/NotFound'
import Products from './modules/Products'
import Product from './modules/Product'
import Cart from './modules/Cart'
import Checkout from './modules/Checkout'
import Auth from './modules/Auth'
import Dashboard from './modules/Dashboard'
import AppLayout from './components/AppLayout'
import AddProduct from './modules/AddProduct'

const ROUTES = [
  {
    path: '/',
    key: 'ROOT',
    element: <Main />,
  },
  {
    path: '/products',
    key: 'PRODUCTS',
    element: <Products />,
  },
  {
    path: '/products/:id',
    key: 'PRODUCT',
    element: <Product />,
  },
  {
    path: '/cart',
    key: 'CART',
    element: <Cart />,
  },
  {
    path: '/checkout',
    key: 'CHECKOUT',
    element: <Checkout />,
  },
  {
    path: '/login',
    key: 'LOGIN',
    element: <Auth />,
  }
]

const APP_ROUTES = [
  {
    path: 'dashboard',
    key: 'DASHBOARD',
    element: <Dashboard />,
  },
  {
    path: 'products',
    key: 'PRODUCTS',
    element: <Products banner={false} />,
  },
  {
    path: 'products/:id',
    key: 'PRODUCT',
    element: <Product />,
  },
  {
    path: 'add-product',
    key: 'ADD_PRODUCT',
    element: <AddProduct />,
  },
]

const ProtectedRoute = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : (<Navigate to={'/login'} />)
}

function App() {
  const token = localStorage.getItem('token') || null;

  return (
    <BrowserRouter>
      <Routes>
        {
          ROUTES.map(({ path, key, element }) => (
            <Route path={path} key={key} element={
              <>
                <Navbar />
                {element}
                <Footer />
              </>
            } />
          ))
        }
        <Route
          path='/admin'
          element={
            <>
              {/* <Navigate to={'dashboard'} /> */}
              {/* <Outlet /> */}
              <ProtectedRoute isLoggedIn={token} />
            </>
          }>
          {
            APP_ROUTES.map(({ path, key, element }) => (
              <Route path={path} key={key} element={
                <>
                  <AppLayout>
                    {element}
                  </AppLayout>
                </>
              } 
              />
            ))
          }
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
