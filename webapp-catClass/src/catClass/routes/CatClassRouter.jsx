import { Navigate, Route, Routes } from "react-router-dom"
import { ResourcePage } from "../pages/ResourcePage"

export const CatClassRouter = () => {
  return (
    <Routes>
      <Route path='/' element={ <ResourcePage /> }/>
      <Route path='/*' element={ <Navigate to='/' /> }/>
    </Routes>
  )
}