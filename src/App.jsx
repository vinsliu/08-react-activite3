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

  async function updateProduct(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Produit mis à jour",
        price: 49.99,
        description: "Description mise à jour",
        image:
          "https://media.istockphoto.com/id/1402586283/fr/vectoriel/mettre-%C3%A0-jour-lic%C3%B4ne-du-logiciel-dans-un-style-plat-illustration-vectorielle-de.jpg?s=612x612&w=0&k=20&c=yMGlsorl-6GyFtMLPv8OIGU0G-Z9WLGnTd1GLNXT_Nc=",
        category: "electronics",
      }),
    });
    const data = await response.json();
    alert(`Le produit avec l'id ${data.id} a été modifié`);
  }

  async function updateProductPrice(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: 5,
      }),
    });
    const data = await response.json();
    alert(`Le prix du produit avec l'id ${data.id} a été modifié.`);
  }

  async function deleteProduct(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    alert(`Le produit avec l'id ${data.id} a été supprimé.`);
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
                <Button
                  onClick={() => updateProduct(product.id)}
                  className="mb-2"
                >
                  Modifier le produit
                </Button>
                <Button
                  onClick={() => updateProductPrice(product.id)}
                  className="mb-2"
                >
                  Modifier le prix
                </Button>
                <Button onClick={() => deleteProduct(product.id)}>
                  Supprimer le produit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
