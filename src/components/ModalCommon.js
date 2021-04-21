import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalCommon = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal centered={true} isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{props.modalTitle}</ModalHeader>
        <ModalBody>
          {props.modalBody}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>OK</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalCommon;