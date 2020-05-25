import React, { useState } from 'react';
import { format, parseISO, isValid } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';

import {
  MdRemoveRedEye,
  MdEdit,
  MdDeleteForever,
  MdMoreHoriz,
} from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';
import ReadOrder from './Read';

import { Container, Content, ButtonActions, ButtonView } from './styles';

export default function Actions({ children }) {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { id, request, created_at, response, status } = children;

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

      <ButtonActions>
        <button type="button" onClick={handleToggleVisible}>
          <MdMoreHoriz size={20} color="#666" />
        </button>
      </ButtonActions>

      <Content visible={visible}>
        <ButtonView>
          <button type="button" onClick={openModal}>
            <MdRemoveRedEye size={20} color="#7159c1" />
            Visualizar
          </button>
        </ButtonView>
        <ButtonView>
          <button type="button">
            <MdEdit size={20} color="#4D85EE" />
            Editar
          </button>
        </ButtonView>
        {/* <ButtonView>
          <button type="button">
            <MdDeleteForever size={20} color="#cb2304" />
            Excluir
          </button>
        </ButtonView> */}
      </Content>
    </Container>
  );
}
