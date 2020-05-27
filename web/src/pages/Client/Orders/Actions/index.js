import React, { useState } from 'react';
import { format, parseISO, isValid } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { MdRemoveRedEye, MdNewReleases } from 'react-icons/md';

import ReadOrder from './Read';

import { Container, Content, ButtonActions, ButtonView } from './styles';

export default function Actions({ children }) {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState('');

  const { created_at } = children;

  function openModal() {
    setIsOpen(true);

    const startDateParse = parseISO(created_at);
    if (isValid(startDateParse)) {
      setStartDate(format(startDateParse, "dd'/'MM'/'yyyy", { locale: pt }));
    }
  }

  function closeModal() {
    setIsOpen(false);
    setVisible(false);
  }

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <ReadOrder
        order={children}
        startDate={startDate}
        closeModal={() => closeModal()}
        isOpen={isOpen}
      />

      <ButtonActions type="button" onClick={handleToggleVisible}>
        <MdNewReleases size={20} color="#666" />
      </ButtonActions>

      <Content visible={visible}>
        <ButtonView>
          <button type="button" onClick={openModal}>
            <MdRemoveRedEye size={20} color="#ef4336" />
            Visualizar
          </button>
        </ButtonView>
      </Content>
    </Container>
  );
}
