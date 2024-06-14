import { useRef, RefObject, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from "styled-components";
import './global.css';
import Navbar from './components/NavBar';
import Sidebar from './components/Sidebar';

const Span = styled.span`
  display: inline-block;
  margin-top: 50vh;
`;

const ContentWrapper = styled.div`
  // flex-grow: 1; /* Content takes remaining space */
  // overflow-y: auto; /* Allow vertical scrolling */
  // padding: 0 20px;
  // fixed: top;
  position: fixed;
  z-index: 1000; 
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50vh;
  overflow: visible;
  height: 150vh;
  width: 100%;
`;

const ProjectPage = lazy(() => import('./pages/project_page'));
const ProjectPage2 = lazy(() => import('./pages/project2_page'));
const ProjectPage3 = lazy(() => import('./pages/project3_page'));
const PersonalPage = lazy(() => import('./pages/personal_page'));

const PersonalPageTable = lazy(() => import('./pages/personal_page_table'));

// const Donation = lazy(() => import('./pages/donation'));

function App() {
  const ref: RefObject<HTMLDivElement> = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    // console.log(ref.current);
  };

  return (
    <BrowserRouter>
      <ContentWrapper>
        <Navbar />
      </ContentWrapper>
      {/* <Span /> */}
      <MainWrapper>
        <Sidebar />
        <Routes>
          <Route path='/' element={<ProjectPage />} />

          <Route path='personal' element={
            <Suspense fallback={<Skeleton count={5} />}>
              <PersonalPage />
            </Suspense>
          } />
          <Route path='personal/dashboard' element={
            <Suspense fallback={<Skeleton count={5} />}>
              <PersonalPageTable />
            </Suspense>
          } />

          <Route path='project' element={
            <Suspense fallback={<Skeleton count={5} />}>
              <ProjectPage />
            </Suspense>
          } />

          <Route path='project2' element={
            <Suspense fallback={<Skeleton count={5} />}>
              <ProjectPage2 />
            </Suspense>
          } />

          <Route path='project3' element={
            <Suspense fallback={<Skeleton count={5} />}>
              <ProjectPage3 />
            </Suspense>
          } />

          {/* <Route path='donation' element={
           <Suspense fallback={<Skeleton count={5} />}>
              <Donation />
            </Suspense>
          } /> */}

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
    </BrowserRouter >

  );
}

export default App;

