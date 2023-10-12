import { Route, Routes, Navigate } from 'react-router';
import { useCheckAuth } from '../hooks';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import { AuthRouter } from '../auth/routes/AuthRouter';
import { CatClassRouter } from '../catClass/routes/CatClassRouter';

export const AppRouter = () => {
  
  const { status } = useCheckAuth();

  if(status === 'checking')
    return <CheckingAuth />;
  return (
    <Routes>
      {
        (status === 'authenticated')
        ? <Route path='/*' element={<CatClassRouter />}/>
        : <Route path='/auth/*' element={ <AuthRouter />} />
      }
      <Route path='/*' element={ <Navigate to='auth/login' />} />
    </Routes>
  )
}