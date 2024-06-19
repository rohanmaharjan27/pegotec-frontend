import React, { useEffect } from 'react';
import {
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
} from 'react-bootstrap';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchProducts } from '../../slices/productsSlice';
import './styles.css';

const { Img, Body, Title, Text } = Card;

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector(state => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <Container>
      <h2 className="my-4">Products</h2>
      {status === 'loading' && <Spinner animation="border" />}
      {status === 'failed' && <Alert variant="danger">{error}</Alert>}
      {status === 'succeeded' && (
        <Row>
          {products.map(product => {
            const { id, thumbnail, title, description, price, rating } =
              product;
            return (
              <Col key={id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                <Card className="card-custom">
                  <Img src={thumbnail} className="card-img-custom" />
                  <Body>
                    <Title>{title}</Title>
                    <Text className="card-text-custom">{description}</Text>
                    <Text>
                      <strong>${price}</strong>
                    </Text>
                    <Button variant="primary" className="btn-cart">
                      <FaShoppingCart />
                    </Button>
                    <Col className="rating">
                      <FaStar style={{ color: 'orange' }} /> {rating}
                    </Col>
                  </Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default Products;
