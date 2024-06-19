import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner, Alert, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import ProductCard from '../../components/ProductCard';
import Cart from '../../components/Cart';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchProducts } from '../../slices/productsSlice';
import { addItemToCart } from '../../slices/cartSlice';
import { Product } from './types';
import './styles.css';

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
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Index;
