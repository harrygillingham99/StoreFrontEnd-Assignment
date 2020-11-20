import { Console } from "console";
import React from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { AppContainer } from "../state/AppState";

export const AccountModal = () => {
  const {
    showAccountModal,
    toggleAccountModal,
    user,
  } = AppContainer.useContainer();

  const ModalFooter = () => {
    return (
      <Modal.Footer>
        <Button onClick={() => toggleAccountModal(false)}>Close</Button>
      </Modal.Footer>
    );
  };

  interface ModalHeaderProps {
    displayName?: string | null | undefined;
  }
  const ModalHeader = (props: ModalHeaderProps): JSX.Element => {
    return (
      <Modal.Header>
        <Modal.Title>{props.displayName ?? "Please Log In"}</Modal.Title>
      </Modal.Header>
    );
  };

  console.log(user);
  return (
    <Modal show={showAccountModal}>
      {!user?.isAnonymous ? (
        <>
          <ModalHeader displayName={user?.displayName} />
          <Modal.Body>
            <Image src={user?.photoURL ?? ""} />
            <ModalFooter />
          </Modal.Body>
        </>
      ) : (
        <>
          <ModalHeader />
          <Modal.Body>
            Please sign in with google to use account settings.
          </Modal.Body>
          <ModalFooter />
        </>
      )}
    </Modal>
  );
};
