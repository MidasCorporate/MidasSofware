import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { ModalContainer, Info, Budget, Responses, Content } from './styles';

import api from '~/services/api';
// import signatureImg from '~/assets/signature.png';

export default function ReadOrder({ isOpen, closeModal, order, startDate }) {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    async function loadResponses() {
      const response = await api.get(`ordersres?request_id=${order.id}`);

      setResponses(response.data);
    }
    loadResponses();
  }, []);

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
        <Info>
          <div>
            <strong>Informações do orçamento</strong>
          </div>
          <span>
            <strong>Segmento:</strong>
            <p>{order.category.segment}</p>
          </span>
          <span>
            <strong>Data:</strong>
            <p>{startDate}</p>
          </span>
        </Info>
        <Budget>
          <div>
            <strong>Orçamento:</strong>
          </div>
          <p>{order.request}</p>
          <span>
            <strong>arquivo:</strong>
            {order.fileRequest ? (
              <a href={order.fileRequest.url}>{order.fileRequest.url}</a>
            ) : (
              'Sem anexo'
            )}
          </span>
        </Budget>
        <Responses>
          <div className="div-res">
            <strong>Resposta(s):</strong>
          </div>
          {responses.map((res) => (
            <Content key={res.id}>
              <span>
                <p>{res.response}</p>
              </span>
              <span>
                <p>
                  {res.fileResponse ? (
                    <>
                      <strong>arquivo:</strong>
                      <a href={res.fileResponse.url}>{res.fileResponse.url}</a>
                    </>
                  ) : (
                    ''
                  )}
                </p>
              </span>
              <div>
                <strong>Empresa:</strong>
                <p>Midas Inc.</p>
              </div>
            </Content>
          ))}
        </Responses>
      </ModalContainer>
    </Modal>
  );
}
