import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store, StoresContext } from './stores/store.ts'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom'
import { router } from './router/routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoresContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoresContext.Provider>
  </StrictMode>
)
