import React, { useState } from 'react';
import './css/Sidebar.css';
import { CaretLeft, HouseSimple, User, CaretDown, FileText, CalendarBlank, ChartBar, Gear, Info, SignOut } from '@phosphor-icons/react';
import userImg from '../assets/userpic.jpg';

const Sidebar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [sidebarActive, setSidebarActive] = useState(false);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu === activeMenu ? null : menu);
  };

  const handleSidebarToggle = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div className={`container ${sidebarActive ? 'sidebar-active' : ''}`}>
      <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
        <div className="menu-btn" onClick={handleSidebarToggle}>
          <CaretLeft />
        </div>
        <div className="head">
          <div className="user-img">
            <img src={userImg} alt="User" />
          </div>
          <div className="user-details">
            <p className="title">Web Developer</p>
            <p className="name">Oscar Fu</p>
          </div>
        </div>
        <div className="nav">
          <div className="menu">
            <p className="title">Main</p>
            <ul>
              <li className={activeMenu === 'dashboard' ? 'active' : ''} onClick={() => handleMenuClick('dashboard')}>
                <a href="/personal/dashboard">
                  <HouseSimple className="icon" />
                  <span className="text">Dashboard</span>
                </a>
              </li>
              <li className={activeMenu === 'audience' ? 'active' : ''} onClick={() => handleMenuClick('audience')}>
                <a href="/personal">
                  <User className="icon" />
                  <span className="text">Personal Page</span>
                  <CaretDown className="arrow" />
                </a>
                <ul className={`sub-menu ${activeMenu === 'audience' ? 'expanded' : ''}`}>
                  <li><a href="#"><span className="text">Users</span></a></li>
                  <li><a href="#"><span className="text">Subscribers</span></a></li>
                </ul>
              </li>
              <li className={activeMenu === 'posts' ? 'active' : ''} onClick={() => handleMenuClick('posts')}>
                <a href="#">
                  <FileText className="icon" />
                  <span className="text">Posts</span>
                </a>
              </li>
              <li className={activeMenu === 'schedules' ? 'active' : ''} onClick={() => handleMenuClick('schedules')}>
                <a href="#">
                  <CalendarBlank className="icon" />
                  <span className="text">Schedules</span>
                </a>
              </li>
              <li className={activeMenu === 'income' ? 'active' : ''} onClick={() => handleMenuClick('income')}>
                <a href="#">
                  <ChartBar className="icon" />
                  <span className="text">Income</span>
                  <CaretDown className="arrow" />
                </a>
                <ul className={`sub-menu ${activeMenu === 'income' ? 'expanded' : ''}`}>
                  <li><a href="#"><span className="text">Earnings</span></a></li>
                  <li><a href="#"><span className="text">Funds</span></a></li>
                  <li><a href="#"><span className="text">Declines</span></a></li>
                  <li><a href="#"><span className="text">Payouts</span></a></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="menu">
            <p className="title">Settings</p>
            <ul>
              <li className={activeMenu === 'settings' ? 'active' : ''} onClick={() => handleMenuClick('settings')}>
                <a href="#">
                  <Gear className="icon" />
                  <span className="text">Settings</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="menu">
            <p className="title">Account</p>
            <ul>
              <li className={activeMenu === 'help' ? 'active' : ''} onClick={() => handleMenuClick('help')}>
                <a href="#">
                  <Info className="icon" />
                  <span className="text">Help</span>
                </a>
              </li>
              <li className={activeMenu === 'logout' ? 'active' : ''} onClick={() => handleMenuClick('logout')}>
                <a href="#">
                  <SignOut className="icon" />
                  <span className="text">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <div className="credits">
        <h1>Fully Responsive <br /> Sidebar by OSC</h1>
      </div> */}
    </div>
  );
};

export default Sidebar;
