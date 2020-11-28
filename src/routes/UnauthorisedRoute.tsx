import React from "react"
import { Container } from "react-bootstrap"

export const UnauthorisedRoute = () => (
    <Container className="text-center">
        <h1>401 Unauthorised</h1>
        
        <p>You shouldn't be here...</p>
    </Container>
)