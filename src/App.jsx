import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { Card, Col, Container, Row } from "react-bootstrap";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    }
    fetchProduct();
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        {products.map((product) => (
          <Col key={product.id} className="mb-4" md={3}>
            <Card className="h-100">
              <Card.Img variant="top" src={product.image} fluid />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>{product.price}€</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
