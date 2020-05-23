function Decodifiq(props) {
  if (props.status === 'Cancelada') {
    return 'danger';
  }
  if (props.status === 'Preparando') {
    return 'info';
  }
  if (props.status === 'Finalizado' || props.status === 'Finalizar') {
    return 'success';
  }
  if (props.status === 'Aguardando') {
    return 'warning';
  }

  return 'primary';
}

export default Decodifiq;

// Decodifiq.propTypes = {
//   status: PropTypes.string,
// };
