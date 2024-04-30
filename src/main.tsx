import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import NavigationBar from './Navbar';
import './index.css'

function Root() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navbarRef.current) {
      const height = navbarRef.current.offsetHeight;
      setNavbarHeight(height);
    }
  }, []);

  return (
    <React.StrictMode>
        <NavigationBar ref={navbarRef} />
        <App style={{ height: `calc(100vh - ${navbarHeight}px)` }} />
    </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);