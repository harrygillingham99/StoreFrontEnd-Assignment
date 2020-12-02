import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { signInWithEmailPassword } from "../utils/Firebase";
import firebase from "firebase";

interface EmailModalProps {
  show: boolean;
  setEmailPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
  SetUser: (user: firebase.User | undefined) => void;
}

interface PotentialUser {
  email?: string;
  password?: string;
}

export const EmailPasswordModal = (props: EmailModalProps) => {
  const [potentialUser, setPotentialUser] = React.useState<PotentialUser>();
  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>Email and Password Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            onChange={(evt) =>
              setPotentialUser({
                email: evt.target.value,
                password: potentialUser?.password,
              })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(evt) =>
              setPotentialUser({
                password: evt.target.value,
                email: potentialUser?.email,
              })
            }
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            if (
              potentialUser === undefined ||
              potentialUser.email === undefined ||
              potentialUser.password === undefined
            )
              return;
            signInWithEmailPassword(
              props.SetUser,
              potentialUser.email,
              potentialUser.password
            );
            props.setEmailPasswordModal(false);
          }}
        >
          Log In
        </Button>
        <Button
          variant="secondary"
          onClick={() => props.setEmailPasswordModal(false)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
