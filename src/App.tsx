import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { publicRoutes, privateRoutes } from './routes';
import Loader from './components/Loader';
import { Toaster } from 'react-hot-toast';
import MainOnlyLayout from './layouts/MainOnly';
// import ProtectedRoute from "./components/ProtectRoute/ProtectRouter";
// import { useSelector } from "react-redux";
// import { RootState } from "./redux/store";
import ProtectedRoute from './components/ProtectRouter';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import MainSidebarLayout from './layouts/MainSidebarOnly';

const toastOptions = {
  // Define default options
  className: '',
  duration: 2000,
  style: {
    background: '#363636',
    color: '#fff',
  },
  // Default options for specific types
  success: {
    duration: 2000,
    style: {
      background: '#363636',
      color: '#fff',
    },
  },
  error: {
    duration: 2000,
    style: {
      background: '#363636',
      color: '#fff',
    },
  },
};

function App() {
  const accessToken = useSelector(
    (state: RootState) => state.user.token.accessToken
  );
  return (
    <div className="bg-white ">
      <Suspense fallback={<Loader />}>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component as NonNullable<
              React.LazyExoticComponent<React.ComponentType<any>>
            >;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  route.mainOnly ? (
                    <MainOnlyLayout>
                      <Page />
                    </MainOnlyLayout>
                  ) : (
                    <DefaultLayout>
                      <Page />
                    </DefaultLayout>
                  )
                }
              ></Route>
            );
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component as React.LazyExoticComponent<React.FC>;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  route.mainOnly ? (
                    <MainOnlyLayout>
                      <ProtectedRoute accessToken={accessToken}>
                        <Page />
                      </ProtectedRoute>
                    </MainOnlyLayout>
                  ) : route.mainSidebarOnly ? (
                    <MainSidebarLayout>
                      <ProtectedRoute accessToken={accessToken}>
                        <Page />
                      </ProtectedRoute>
                    </MainSidebarLayout>
                  ) : (
                    <DefaultLayout>
                      <ProtectedRoute accessToken={accessToken}>
                        <Page />
                      </ProtectedRoute>
                    </DefaultLayout>
                  )
                }
              ></Route>
            );
          })}
        </Routes>
      </Suspense>
      <Toaster toastOptions={toastOptions} />
    </div>
  );
}

export default App;
