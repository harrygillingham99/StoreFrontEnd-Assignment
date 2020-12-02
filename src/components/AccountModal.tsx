import React from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { Basket } from "../services/Client";
import { AppAlertContainer } from "../state/AppAlertState";
import { AppContainer } from "../state/AppState";
import { GetHistoricOrders } from "../utils/Orders";

export const AccountModal = () => {
  const {
    showAccountModal,
    toggleAccountModal,
    user,
    allProducts,
  } = AppContainer.useContainer();
  const { ToggleAlert } = AppAlertContainer.useContainer();
  const [historicOrders, setHistoricOrders] = React.useState<
    Basket[] | undefined
  >(null!);

  React.useEffect(() => {
    const fetchHistoricOrders = async () => {
      try {
        if (user === undefined) {
          return;
        }
        const result = await GetHistoricOrders(user);
        if (result) {
          setHistoricOrders(result);
        } else throw new Error("Failed to get products");
      } catch (ex) {
        ToggleAlert(
          true,
          "danger",
          "Error!",
          "Failed to fetch the latest products"
        );
      }
    };
    fetchHistoricOrders();
  }, [ToggleAlert, user]);

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

  return (
    <Modal show={showAccountModal}>
      {!user?.isAnonymous ? (
        <>
          <ModalHeader displayName={user?.displayName ?? user?.email} />
          <Modal.Body>
            <Image src={user?.photoURL ?? ""} />
            {historicOrders !== null &&
            historicOrders !== undefined &&
            historicOrders.length > 0 ? (
              historicOrders.map((order) => (
                <p key={order.dataStoreId}>
                  {order.productAndQuantity?.map(
                    (y) =>
                      `${y.quantity} of  ${
                        allProducts.find((x) => x.id === y.itemId)?.name
                      } `
                  )}{" "}
                  on {order.dateOrdered?.toDateString()}
                </p>
              ))
            ) : (
              <div className="text-center">
                <p>No Historic Orders!</p>
              </div>
            )}
          </Modal.Body>
          <ModalFooter />
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
