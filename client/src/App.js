import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {DataProvider} from './GlobalState';
import Header from './components/headers/Header';
import MainPages from './components/mainpages/Pages';
import Footer from './components/Footer/Footer';
// import SupportEngine from './components/mainpages/LiveChat/SupportEngine/index';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="flex flex-col justify-between min-h-screen">
          <div>
            <Header />
            <div className='h-full'>
              <MainPages />
            </div>
          </div>
          <Footer />
        </div>
        {/* <SupportEngine/> */}
      </Router>
    </DataProvider>
  );
}

export default App;
