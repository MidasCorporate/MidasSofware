import React, { useState } from 'react';

import { Form } from '@unform/web';
import { makeStyles } from '@material-ui/core/styles';

import { MdAttachFile, MdFormatBold, MdSend } from 'react-icons/md';
import { Textarea } from '~/components/Form';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import CardMenu from '~/components/Card/CardMenu';
import CardIcon from '~/components/Card/CardIcon';

import api from '~/services/api';

import Button from '~/components/CustomButtons/Button';
import Image from './Image';

import { HeaderOption } from './styles';

import styles from '~/assets/jss/material-dashboard-react/views/textStyles';

const useStyles = makeStyles(styles);

export default function Request(props) {
  const { tag, color, user_id, id } = props;
  const [infoTagLink, setinfoTagLink] = useState('transparent');
  const [infoTagBold, setinfoTagBold] = useState('transparent');
  const [link, setLink] = useState(false);
  const classes = useStyles();

  async function handleSubmit(data) {
    const { file_res_id, response } = data;
    await api.post('ordersres', {
      file_res_id,
      response,
      user_id,
      id,
      status: 'Finalizado',
    });
  }

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
        <GridItem xs={12} sm={12} md={12}>
          <CardMenu>
            <CardIcon color={color}>
              <h4 className={classes.wordTextTitle}>Responder Solicitação</h4>
            </CardIcon>

            <HeaderOption>
              <CardMenu>
                <Form onSubmit={handleSubmit}>
                  <Button
                    color="simple"
                    justIcon
                    simple={false}
                    aria-haspopup="true"
                    className={classes.buttonLink}
                    onClick={() => handleTagConditionText('bold')}
                  >
                    <MdFormatBold className={classes.dropdownItem} />
                  </Button>

                  <Button
                    color="simple"
                    justIcon
                    simple={false}
                    aria-haspopup="true"
                    className={classes.buttonLink}
                    onClick={() => handleTagConditionText('attachment')}
                  >
                    <Image />
                  </Button>
                  <Button
                    color="simple"
                    justIcon
                    simple={false}
                    aria-haspopup="true"
                    className={classes.buttonLink}
                    type="submit"
                  >
                    <MdSend className={classes.dropdownItem} />
                  </Button>

                  <Textarea
                    className={`${
                      link ? [classes.wordTextBold] : [classes.wordTextColor]
                    }`}
                    rows="10"
                    cols="40"
                    maxLength="500"
                    name="response"
                  />
                </Form>
              </CardMenu>
            </HeaderOption>
          </CardMenu>
        </GridItem>
      </>
    );
  }
  return <></>;
}
