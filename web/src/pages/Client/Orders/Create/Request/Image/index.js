import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { MdAttachFile, MdFiberManualRecord } from 'react-icons/md';

import { makeStyles } from '@material-ui/core/styles';

import api from '~/services/api';

import { Container } from './styles';

import styles from '~/assets/jss/material-dashboard-react/views/textStyles';

const useStyles = makeStyles(styles);

function Image() {
  const classes = useStyles();
  const { defaultValue, registerField } = useField('fileReq');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [fileVeriq, setFileVerifiq] = useState(false);

  const avatarRef = useRef();

  useEffect(() => {
    if (avatarRef.current) {
      registerField({
        name: 'file_req_id',
        ref: avatarRef.current,
        path: 'dataset.file',
      });
    }
  }, [avatarRef, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id } = response.data;

    setFile(id);
    setFileVerifiq(true);
  }

  return (
    <Container tag={fileVeriq}>
      <div>
        <MdFiberManualRecord color="red" />
      </div>
      <label htmlFor="fileReq">
        <MdAttachFile className={classes.icons} />

        <input
          type="file"
          id="fileReq"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={avatarRef}
        />
      </label>
    </Container>
  );
}

export default Image;
