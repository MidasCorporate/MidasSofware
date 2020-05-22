import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  MdAssessment,
  MdPalette,
  MdLink,
  MdStrikethroughS,
  MdTextFields,
  MdFormatColorFill,
  MdFormatColorText,
  MdAttachFile,
} from 'react-icons/md';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import CardMenu from '~/components/Card/CardMenu';
import CardIcon from '~/components/Card/CardIcon';
import Card from '~/components/Card/Card';

import Button from '~/components/CustomButtons/Button';

import { OpButon, HeaderOption, Text } from './styles';
import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';

import history from '~/services/history';

const useStyles = makeStyles(styles);

export default function Request(props) {
  const classes = useStyles();
  const { tag, color } = props;

  // function handleTableOrders() {
  //   history.push('requestsorders');
  // }
  if (tag) {
    return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CardMenu>
              <CardIcon color={color}>
                <h4 className={classes.cardTitleTable}>
                  Responder Solicitação
                </h4>
              </CardIcon>

              <HeaderOption>
                <CardMenu>
                  <Text>
                    <MdAssessment size={20} />
                    <MdPalette size={20} />
                    <MdLink size={20} />
                    <MdStrikethroughS size={20} />
                    <MdTextFields size={20} />
                    <MdFormatColorFill size={20} />
                    <MdFormatColorText size={20} />
                    <MdAttachFile size={20} />
                  </Text>
                </CardMenu>
                <textarea
                  className={classes.cardTitleTable}
                  rows="10"
                  cols="40"
                  maxLength="500"
                />
              </HeaderOption>
            </CardMenu>
          </GridItem>
        </GridContainer>
      </>
    );
  }
  return <></>;
}
