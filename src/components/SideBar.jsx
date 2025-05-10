import React from 'react';
import { ReactComponent as Home } from '../assets/icons/Home.svg'
import { ReactComponent as User } from '../assets/icons/User.svg';
import { ReactComponent as Terminal } from '../assets/icons/Terminal.svg'
import { ReactComponent as Settings } from '../assets/icons/Settings.svg';
import { ReactComponent as Eye } from '../assets/icons/Eye.svg'


const Sidebar = () => {
  const topNavItems = [
    { label: 'Overview', icon: <Home /> },
    { label: 'Products', icon: <User /> },
    { label: 'Reviews' },
    { label: 'Disputes' },
    { label: 'Top-ups' },
    { label: 'Check deposits' },
    { label: 'Payouts' },
    { label: 'All transactions' },
    { label: 'Balances' },
    { label: 'Payments' },
    { label: 'Connected accounts' },
    { label: 'Readers' },
    { label: 'Reports' },
    { label: 'Issued cards' },
  ];

  const bottomNavItems = [
    { label: 'Developers', icon: <Terminal />},
    { label: 'View test data', icon: <Eye/> },
    { label: 'Settings', icon: <Settings/> },
  ];

  return (
    <aside style={sidebarStyles.sidebar}>
      <div style={sidebarStyles.logo}>Shopping App</div>
  
      <div style={sidebarStyles.navContainer}>
        <nav style={sidebarStyles.topNav}>
          <ul style={sidebarStyles.navList}>
            {topNavItems.map(item => (
              <li key={item.label} style={sidebarStyles.navItem}>
                {item.icon && (
                  <span style={sidebarStyles.iconPlaceholder}>{item.icon}</span>
                )}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>
  
        <div style={sidebarStyles.divider}></div>
  
        <nav>
          <ul style={sidebarStyles.navList}>
            {bottomNavItems.map(item => (
              <li key={item.label} style={sidebarStyles.navItem}>
                {item.icon && (
                  <span style={sidebarStyles.iconPlaceholder}>{item.icon}</span>
                )}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
  
};

const sidebarStyles = {
  sidebar: {
    width: '225px',
    padding: '14px 16px',
    backgroundColor: '#f9fafb',
    borderRight: '1px solid #e5e7eb',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#111827',
    marginBottom: '24px',
    paddingLeft: '8px',
  },
  navContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden', // prevents double scrollbars
  },
  topNav: {
    overflowY: 'auto',
    paddingRight: '4px', // to avoid clipping scrollbar
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: '6px',
    color: '#374151',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '2px',
  },
  iconPlaceholder: {
    marginRight: '12px',
    fontSize: '16px',
    width: '15px',
    display: 'inline-block',
  },
  divider: {
    borderTop: '1px solid #e5e7eb',
    margin: '10px 0',
  },
};


export default Sidebar;
