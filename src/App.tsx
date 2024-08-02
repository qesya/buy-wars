import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Menu from './components/Menu';

function App() {
  return (
    <div className="py-4 px-6 md:px-16 max-w-screen-2xl justify-center items-center mx-auto">
      <Menu />
      <Outlet />
    </div>
  );
}

export default App;
