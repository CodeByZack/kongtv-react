import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@/assets/css/reset.css';

ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/workbox-service-worker.js');
  });
}
