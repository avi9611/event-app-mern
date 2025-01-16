import React from 'react';

import EventDashboard from '../components/EventDashboard';

const HomePage = () => {
  return (
    <div style={styles.homePage}>
      <div style={styles.container}>
        <div style={styles.dashboardWrapper}>
          <div style={styles.dashboardLayout}>
            
            <EventDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  homePage: {
    height: '100vh',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '80px',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  dashboardWrapper: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '1200px',
    height: 'calc(100vh - 120px)',
  },
  dashboardLayout: {
    display: 'flex',
    height: '100%',
    borderRadius: '8px',
    overflow: 'hidden',
  },
};

export default HomePage;