/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { Form } from '@unform/web';
import { makeStyles } from '@material-ui/core/styles';

import { MdFormatBold, MdSend, MdChromeReaderMode } from 'react-icons/md';
import { Textarea } from '~/components/Form';

import GridItem from '~/components/Grid/GridItem';
import CardMenu from '~/components/Card/CardMenu';
import CardIcon from '~/components/Card/CardIcon';

import api from '~/services/api';

import Button from '~/components/CustomButtons/Button';
import Image from './Image';

import { HeaderOption, FileOrder } from './styles';

import styles from '~/assets/jss/material-dashboard-react/views/textStyles';

const useStyles = makeStyles(styles);

export default function Request(props) {
  const { tag, color, user_id, id, description, urlFile, status } = props;
  const [infoTagLink, setinfoTagLink] = useState('transparent');
  const [infoTagBold, setinfoTagBold] = useState('transparent');
  const [link, setLink] = useState(false);
  const [pageInitial, setPageInitial] = useState({});
  const [tagStatus, setTagStatus] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    function loadInfoResponse() {
      const pageInitialDetal = {
        response: description,
      };
      setPageInitial(pageInitialDetal);
    }

    if (status === 'Finalizado' || status === 'Cancelada') {
      setTagStatus(true);
    }

    loadInfoResponse();
  }, [props]);

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

  // function verifiqStatusOrder() {
  //   if (color === 'success') {
  //     setTagStatus(false);
  //   }
  // }

  function handleOpenfile() {
    window.location.href = urlFile.url;
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
              <h4 className={classes.wordTextTitle}>
                {status === 'Finalizado'
                  ? 'Sua Resposta'
                  : 'Responder Solicitação'}
              </h4>
            </CardIcon>

            <HeaderOption>
              <CardMenu>
                <Form initialData={pageInitial} onSubmit={handleSubmit}>
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
                    disabled={tagStatus}
                  >
                    <Image />
                  </Button>
                  <>
                    <Button
                      color="simple"
                      justIcon
                      simple={false}
                      aria-haspopup="true"
                      className={classes.buttonLink}
                      type="submit"
                      disabled={tagStatus}
                    >
                      <MdSend className={classes.dropdownItem} />
                    </Button>
                  </>

                  <FileOrder tag={urlFile !== null}>
                    <div>Visualizar Anexo</div>
                    <Button
                      color="simple"
                      justIcon
                      simple={false}
                      aria-haspopup="true"
                      className={classes.buttonLink}
                      onClick={handleOpenfile}
                    >
                      <MdChromeReaderMode className={classes.dropdownItem} />
                    </Button>
                  </FileOrder>
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
Request.propTypes = {
  tag: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  user_id: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};
