import React from 'react';
import Modal from 'react-modal';

import { ModalContainer } from './styles';

// import signatureImg from '~/assets/signature.png';

export default function ReadOrder({
  isOpen,
  closeModal,
  order,
  startDate,
  endDate,
  signature,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      contentLabel="Visualizar"
      style={{
        overlay: {
          position: 'fixed',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
          background: 'rgba(0, 0, 0, 0.65)',
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '4px',
          width: '350px',
          height: '380px',
        },
      }}
    >
      <ModalContainer>
        <div>
          <strong>informações da encomenda</strong>
          <p>
            {order.street}, {order.number}
          </p>
          <p>{order.city}</p>
          <p>{order.zip_code}</p>
        </div>
        <div>
          <strong>Datas</strong>
          <span>
            <strong>retiradas:</strong>
            <p>{startDate}</p>
          </span>
          <span>
            <strong>entrega:</strong>
            <p>{endDate}</p>
          </span>
        </div>
        <strong>Assinatura do destinatário</strong>
        {/* <img src={signatureImg} alt="assinatura" /> */}
      </ModalContainer>
    </Modal>
  );
}
