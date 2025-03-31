import "./App.css";
import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

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

  async function addProduct() {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Nouveau produit",
        price: 29.99,
        description: "Un nouveau produit ajouté via l'API",
        image:
          "https://www.lascom.com/wp-content/uploads/2021/03/Bland_Cosmetic_Product_Packaging_Unit_500x400.jpg",
        category: "cosmetics",
      }),
    });
    const data = await response.json();
    alert(`Le produit avec l'id ${data.id} a été créer.`);
    setProducts((prevProducts) => [...prevProducts, data]);
  }

  return (
    <Container className="mt-4">
      <Button className="mb-4" onClick={addProduct}>
        Ajouter un produit
      </Button>
      <Row>
        {products.map((product) => (
          <Col key={product.id} className="mb-4" md={3}>
            <Card className="h-100">
              <Card.Img variant="top" src={product.image} />
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
