import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Goods from './components/Goods/Goods';
import GoodsDetails from './components/GoodsList/GoodsDetails/GoodsDetails';
import Layout from './pages/Layout';
import SalesForm from './components/SalesForm/SalesForm'
import AdminPanel from './components/AdminPanel/AdminPanel';
import Info from './components/Info/Info';

function PrivateRoute({ element }: any) {
  const { isAuth } = useAuth();

  return isAuth ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="goods/:itemId" element={<Goods/>} />
        <Route path="goods/:itemId/:article" element={<GoodsDetails />} />
        <Route path="form" element={<SalesForm/>} />
        <Route path='*' element={<ErrorPage />} />
        <Route path="/info" element={<Info tabIndex={0} />} />
        <Route path="/info/:tabIndex" element={<Info tabIndex={0} />} />
        <Route path='admin' element={<PrivateRoute element={<AdminPanel/>} />} />
      </Route>
    </Routes>
  );
}

export default App;
