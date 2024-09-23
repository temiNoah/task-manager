import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css';
import './styles/Typography.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'remixicon/fonts/remixicon.css'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </StrictMode>,
)
