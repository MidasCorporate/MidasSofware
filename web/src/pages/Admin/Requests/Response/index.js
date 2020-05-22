import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { MdAttachFile, MdFormatBold } from 'react-icons/md';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import CardMenu from '~/components/Card/CardMenu';
import CardIcon from '~/components/Card/CardIcon';

import Button from '~/components/CustomButtons/Button';

import { HeaderOption } from './styles';

import styles from '~/assets/jss/material-dashboard-react/views/textStyles';

const useStyles = makeStyles(styles);

export default function Request(props) {
  const { tag, color } = props;
  const [infoTagLink, setinfoTagLink] = useState('transparent');
  const [infoTagBold, setinfoTagBold] = useState('transparent');
  const [link, setLink] = useState(false);
  const classes = useStyles();

  function handleTagConditionText(e) {
    if (e === 'bold') {
      if (infoTagBold === 'transparent') {
        setinfoTagBold('simple');
        setLink(true);
        return;
      }
      if (infoTagBold === 'simple') {
        setLink(false);
        setinfoTagBold('transparent');
      }
    }
    if (e === 'attachment') {
      if (infoTagLink === 'transparent') {
        setinfoTagLink('simple');
        return;
      }
      if (infoTagLink === 'simple') {
        setinfoTagLink('transparent');
      }
    }
  }

  if (tag) {
    return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CardMenu>
              <CardIcon color={color}>
                <h4 className={classes.wordTextTitle}>Responder Solicitação</h4>
              </CardIcon>

              <HeaderOption>
                <CardMenu>
                  <div>
                    <Button
                      color={infoTagBold}
                      justIcon
                      simple={false}
                      aria-haspopup="true"
                      className={classes.buttonLink}
                      onClick={() => handleTagConditionText('bold')}
                    >
                      <MdFormatBold className={classes.dropdownItem} />
                    </Button>

                    <Button
                      color={infoTagLink}
                      justIcon
                      simple={false}
                      aria-haspopup="true"
                      className={classes.buttonLink}
                      onClick={() => handleTagConditionText('attachment')}
                    >
                      <MdAttachFile className={classes.icons} />
                    </Button>
                  </div>
                </CardMenu>
                <textarea
                  className={`${
                    link ? [classes.wordTextBold] : [classes.wordTextColor]
                  }`}
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
