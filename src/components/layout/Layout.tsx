import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import MobileNavbar from './MobileNavbar';

function Layout() {
  const location = useLocation();
  
  // Check if we're in a full-screen view where we don't want navbars
  const isFullScreenView = 
    location.pathname.includes('/messages/') || 
    location.pathname === '/create';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {!isFullScreenView && (
        <>
          <Navbar />
          <div className="pt-14 pb-16 md:pt-16 md:pb-0 md:pl-20 lg:pl-64">
            <Outlet />
          </div>
          <MobileNavbar />
        </>
      )}
      
      {isFullScreenView && (
        <div className="min-h-screen">
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default Layout;