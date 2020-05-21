function Decodifiq(props) {
  if (props.status === 'Cancelada') {
    return 'danger';
  }
  if (props.status === 'Preparando') {
    return 'info';
  }
  if (props.status === 'Finalizada') {
    return 'success';
  }
  if (props.status === 'Aguandando') {
    return 'warning';
  }

  return 'sss';
}

export default Decodifiq;

// Decodifiq.propTypes = {
//   status: PropTypes.string,
// };
