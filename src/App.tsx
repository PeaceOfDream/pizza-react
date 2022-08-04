import React, {Suspense} from 'react';
import './scss/app.scss';
import {Routes, Route } from 'react-router-dom';
import {Home} from './Pages/Home';
import { MainLayout } from './layouts/MainLayout';


const Cart = React.lazy(() => import( /* webpackChunkName: "Cart" */ './Pages/Cart'));



const FullPizza = React.lazy(
  /* webpackChunkName: "FullPizza" */ () =>
    import('./Pages/FullPizza')
);

const NotFound = React.lazy(() =>
  import(/* webpackChunkName: "NotFound" */ './Pages/NotFound')
);


function App() {
	
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;







