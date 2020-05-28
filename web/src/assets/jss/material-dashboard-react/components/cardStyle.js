// import styled from 'styled-components';

// export const Container = styled.div`
//   text-align: end;
//   margin-right
// `;

import {
  blackColor,
  whiteColor,
  hexToRgb,
} from '~/assets/jss/material-dashboard-react';

const cardStyle = {
  card: {
    border: '0',
    marginBottom: '30px',
    marginTop: '30px',
    padding: '10px',
    borderRadius: '6px',
    color: `rgba(${hexToRgb(blackColor)}, 0.87)`,
    background: whiteColor,
    width: '100%',
    boxShadow: `0 1px 4px 0 rgba(${hexToRgb(blackColor)}, 0.14)`,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'end',
    minWidth: '0',
    wordWrap: 'break-word',
    fontSize: '.875rem',
  },
  cardPlaceholder: {
    border: '0',
    marginBottom: '30px',
    marginTop: '30px',
    padding: '10px',
    borderRadius: '6px',
    background: 'transparent',
    width: '100%',
    position: 'relative',
    // flexDirection: 'row',
    // display: 'flex',
    // flexDirection: 'column',
    minWidth: '0',
  },
  cardMenu: {
    border: '0',
    marginBottom: '30px',
    marginTop: '30px',
    padding: '10px',
    borderRadius: '6px',
    color: `rgba(${hexToRgb(blackColor)}, 0.87)`,
    background: whiteColor,
    width: '100%',
    boxShadow: `0 1px 4px 0 rgba(${hexToRgb(blackColor)}, 0.14)`,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',

    minWidth: '0',
    wordWrap: 'break-word',
    fontSize: '.875rem',
  },
  cardSearch: {
    border: '0',
    marginBottom: '40px',
    marginTop: '30px',
    marginLeft: '120px',
    padding: '10px',
    // paddingBottom: '20px',
    borderRadius: '6px',
    color: `rgba(${hexToRgb(blackColor)}, 0.87)`,
    background: whiteColor,
    width: '80%',
    boxShadow: `0 1px 4px 0 rgba(${hexToRgb(blackColor)}, 0.14)`,
    // position: 'relative',
    display: 'flex',
    height: '25%',
    flexDirection: 'column',

    minWidth: '0',
    wordWrap: 'break-word',
    fontSize: '30px',
  },
  cardPlain: {
    background: 'transparent',
    boxShadow: 'none',
  },
  cardProfile: {
    marginTop: '30px',
    textAlign: 'center',
  },
  cardChart: {
    '& p': {
      marginTop: '0px',
      paddingTop: '0px',
    },
  },
};

export default cardStyle;
