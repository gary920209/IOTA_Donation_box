import { useRef, RefObject, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from "styled-components";
import './App.css';
import Navbar from './components/NavBar';
import Sidebar from './components/Sidebar';

const Span = styled.span`
  display: inline-block;
  margin-top: 7vh;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.5vh;
`;

const ProjectPage = lazy(() => import('./pages/project_page'));
const PersonalPage = lazy(() => import('./pages/personal_page'));
const Donation = lazy(() => import('./pages/donation'));

function App() {
  const ref: RefObject<HTMLDivElement>  = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    // console.log(ref.current);
  };

  return (
    <BrowserRouter>
      <Navbar/>
      <MainWrapper>
        <Sidebar/>
        {/* <Span/> */}
        <Routes>
          <Route path='/' element={<ProjectPage />} />
          
          <Route path='personal' element={
            <Suspense fallback={<Skeleton count={5} />}>
              <PersonalPage />
            </Suspense>
          } />
          <Route path='donation' element={
           <Suspense fallback={<Skeleton count={5} />}>
              <Donation />
            </Suspense>
          } />

          {/* <Route path='introductions' element={
            <Suspense fallback={<LoadingPage />}>
              <IntroductionPage/>
            </Suspense>
          }
          /> */}

          {/* <Route path='about' element={
            <Suspense fallback={<LoadingPage />}>
              <AboutUsPage />
            </Suspense>
          } /> */}

          {/* <Route path='project/:type/:index' element={
            <Suspense fallback={<LoadingPage />}>
              <DetailProjectPage />
            </Suspense>
          } /> */}

          {/* <Route path='*' element={<ErrorPage />} /> */}
        
        </Routes>
      </MainWrapper>
    </BrowserRouter>
    
  );
}

export default App;

