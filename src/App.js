import './scss/app.scss';
import { useState, createContext } from 'react';
import { Header } from './components/Header';
import {Home} from './Pages/Home';
import { NotFound } from './Pages/NotFound';
import { Cart } from './Pages/Cart';
import {Routes, Route } from 'react-router-dom';

export const searchContext = createContext()

function App() {

	const [searchValue, setSearchValue] = useState('')
  return (
    <div className="wrapper">
      <searchContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </searchContext.Provider>
    </div>
  );
}

export default App;
