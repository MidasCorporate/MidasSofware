import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { MdImage } from 'react-icons/md';

import api from '~/services/api';

import { Container } from './styles';

function Image() {
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const avatarRef = useRef();

  useEffect(() => {
    if (avatarRef.current) {
      registerField({
        name: 'image_id',
        ref: avatarRef.current,
        path: 'dataset.file',
      });
    }
  }, [avatarRef, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {preview ? (
          <img src={preview} alt="" />
        ) : (
          <>
            <MdImage size={46} color="#e63a36" />
            <strong>Adicionar foto</strong>
          </>
        )}

        <input
          type="file"
          id="avatar"
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
