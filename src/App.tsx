import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { publicRoutes, privateRoutes } from './routes';
import Loader from './components/Loader';
// import ProtectedRoute from "./components/ProtectRoute/ProtectRouter";
// import { useSelector } from "react-redux";
// import { RootState } from "./redux/store";

function App() {
  // const user = useSelector((state: RootState) => state.user.user);
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
                  <DefaultLayout>
                    <Page />
                  </DefaultLayout>
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
                  <DefaultLayout>
                    {/* <ProtectedRoute user={user}> */}
                    <Page />
                    {/* </ProtectedRoute> */}
                  </DefaultLayout>
                }
              ></Route>
            );
          })}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
