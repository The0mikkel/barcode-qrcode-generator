import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.js'
import './index.css'
import { BarcodeProvider } from './state/barcodeContext.jsx';
import { BarcodeEnum } from './types/barcode.js';

const rootElement = document.getElementById('root');

if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
} else {
	console.error('Root element not found');
}
