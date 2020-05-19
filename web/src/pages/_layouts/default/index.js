// import React from 'react';
// import PropTypes from 'prop-types';

// import { Wrapper } from './styles';

// function DefaultLayout({ children }) {
//   return <Wrapper>{children}</Wrapper>;
// }

// export default DefaultLayout;

// DefaultLayout.propTypes = {
//   children: PropTypes.element.isRequired,
// };

import React from 'react';
import PropTypes from 'prop-types';

// creates a beautiful scrollbar

import 'perfect-scrollbar/css/perfect-scrollbar.css';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Navbar from '~/components/Navbars/Navbar';
import Footer from '~/components/Footer/Footer';
import Sidebar from '~/components/Sidebar/Sidebar';

// import routes from 'routes.js';

import styles from '~/assets/jss/material-dashboard-react/layouts/adminStyle';
import { Container } from './styles';

import bgImage from '~/assets/img/sidebar-2.jpg';
import logo from '~/assets/img/reactlogo.png';

const useStyles = makeStyles(styles);

export default function Admin({ children }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== '/admin/maps';
  };

  return (
    <Container>
      <Sidebar
        routes={() => {}}
        logoText="Midas Corporate"
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar routes={() => {}} handleDrawerToggle={handleDrawerToggle} />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            {children}
            <div className={classes.container} />
          </div>
        ) : (
          ''
        )}
        {getRoute() ? <Footer /> : null}
      </div>
    </Container>
  );
}
Admin.propTypes = {
  children: PropTypes.element.isRequired,
};
