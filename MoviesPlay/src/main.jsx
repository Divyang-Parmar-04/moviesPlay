import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'

import router from './router.jsx'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)
