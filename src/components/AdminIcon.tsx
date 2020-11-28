import React from "react";
import admin from "../assets/settings.svg";
import { Badge } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Routes } from "../types/Routes";

interface AdminIconProps {
  show: boolean;
}

export const AdminIcon = (props: AdminIconProps) => {
  const [redirect, setRedirect] = React.useState<boolean>(false);
  const display = props.show ? "flex" : "none";
  return (
    <>
      <div style={{ display: display }}>
        <Badge
          variant="light"
          className="mr-2 btn btn-light"
          onClick={() => setRedirect(true)}
        >
          <img src={admin} alt={"administration icon"} className="h-100 w-100" />
        </Badge>
      </div>
      {redirect && <Redirect to={Routes.Admin}/>}
    </>
  );
};
