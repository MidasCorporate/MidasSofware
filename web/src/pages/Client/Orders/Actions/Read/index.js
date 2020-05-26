import React from 'react';
import Modal from 'react-modal';

import { ModalContainer } from './styles';

// import signatureImg from '~/assets/signature.png';

export default function ReadOrder({ isOpen, closeModal, order, startDate }) {
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
          width: '650px',
          height: '553px',
        },
      }}
    >
      <ModalContainer>
        <div>
          <strong>Informações do orçamento</strong>
          <span>
            <strong>segmento:</strong>
            <p>{order.category.segment}</p>
          </span>
          <span>
            <strong>data:</strong>
            <p>{startDate}</p>
          </span>
          <span>
            <strong>status:</strong>
            <p>{order.status}</p>
          </span>
        </div>
        <div>
          <strong>Pedido</strong>
          <span>
            <p>{order.request}</p>
          </span>
          <span>
            <strong>arquivo:</strong>
            <p>
              {order.fileRequest ? (
                <a href={order.fileRequest.url}>{order.fileRequest.url}</a>
              ) : (
                'Sem anexo'
              )}
            </p>
          </span>
        </div>
        <div>
          <strong>Respostas</strong>
          <span>
            <p>{order.response}</p>
          </span>
          <span>
            <strong>arquivo:</strong>
            <p>
              {order.fileResponse ? (
                <a href={order.fileResponse.url}>{order.fileResponse.url}</a>
              ) : (
                'Sem anexo'
              )}
            </p>
          </span>
        </div>
      </ModalContainer>
    </Modal>
  );
}
