import React from 'react';
import { ReactComponent as Search } from '../assets/icons/Search.svg'
import { ReactComponent as Chat } from '../assets/icons/Chat.svg';
import { ReactComponent as Help } from '../assets/icons/Help.svg';
import { ReactComponent as Notification } from '../assets/icons/Notification.svg';
import { ReactComponent as User } from '../assets/icons/User.svg';

const Header = () => {
  return (
    <header style={headerStyles.header}>
      <div style={headerStyles.leftSection}>
        <div style={headerStyles.searchContainer}>
          <Search style={headerStyles.searchIcon} />
          <input type="text" placeholder="Search..." style={headerStyles.searchInput} />
        </div>
      </div>

      <div style={headerStyles.rightSection}>
        <button style={headerStyles.iconButton}>
          <Chat />
          <span style={headerStyles.feedbackText}>Feedback?</span>
        </button>
        <Notification style={headerStyles.icon} />
        <Help style={headerStyles.icon} />
        <User style={headerStyles.icon} />
      </div>
    </header>
  );
};

const headerStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 32px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #E5E7EB',
    position: 'fixed',
    top: 0,
    left: '259px',
    right: 0,
    height: '60px',
    zIndex: 1000,
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: '6px',
    padding: '6px 12px',
    width: '85%',
  },
  searchIcon: {
    color: '#9ca3af',
    marginRight: '8px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontSize: '14px',
    color: '#374151',
    flex: 1,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    fontSize: '14px',
  },
  feedbackText: {
    marginLeft: '6px',
  },
  icon: {
    fontSize: '18px',
    color: '#6b7280',
    cursor: 'pointer',
  }
};

export default Header;
