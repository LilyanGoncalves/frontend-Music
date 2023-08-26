import Table from 'react-bootstrap/Table';

function Footer() {
  return (
    <Table responsive variant='dark'>
      <thead style={{ height: '70px' }}>
        <tr>
            <td>Tel/WhatsApp</td>
            <td>FACEBOOK</td>
            <td>INSTAGRAM</td>
        </tr>
      </thead>
      <tbody style={{ height: '20vh' }}>
        <tr>
            <td>(18)999999999</td>
            <td>@sistemagerencia</td>
            <td>@sistemgerencia</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Footer;