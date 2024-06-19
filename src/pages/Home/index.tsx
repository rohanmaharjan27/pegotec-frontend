import React, { useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../store';
import { fetchProducts } from '../../slices/productsSlice';
import { addItemToCart } from '../../slices/cartSlice';
import Cart from '../../components/Cart';
import { Product } from './types';
import './styles.css';

const { Img, Body, Title, Text } = Card;

const Index: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector(state => state.products);
  const [showCart, setShowCart] = useState<boolean>(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  const handleAddToCart = (product: Product) => {
    dispatch(addItemToCart({ ...product, quantity: 1 }));
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        View Cart
      </Button>
      <h2 className="my-4">Products</h2>
      <Cart show={showCart} handleClose={handleClose} />
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
                    <Button
                      variant="primary"
                      className="btn-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaShoppingCart />
                    </Button>
                    <Col className="rating-col">
                      <FaStar style={{ color: 'orange' }} />{' '}
                      <strong className="rating-text">{rating}</strong>
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

export default Index;
