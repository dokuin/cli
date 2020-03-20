import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'

const Banner = () => {
  return (
    <Jumbotron className="text-center">
      <h1>Dokuin.Js</h1>
      <p>DokuIn.js is a documentation generator at ease!</p>
      <p>
        <Button variant="outline-primary">Get Started</Button>
      </p>
    </Jumbotron>
  )
}

export default Banner
