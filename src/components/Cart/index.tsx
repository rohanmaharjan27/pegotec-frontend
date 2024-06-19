import React from 'react';
import { Container, Table, Button, Offcanvas, Image } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

import { useAppSelector, useAppDispatch } from '../../store';
import {
  selectCartItems,
  clearCart,
  removeItemFromCart,
} from '../../slices/cartSlice';

type Props = {
  show: boolean;
  handleClose: () => void;
};

const Cart: React.FC<Props> = ({ show, handleClose }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeItemFromCart(itemId));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Offcanvas show={show} onHide={handleClose} style={{ width: '500px' }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Container className="mt-4">
          {cartItems.length > 0 ? (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => {
                    const { id, thumbnail, title, price, quantity } = item;
                    return (
                      <tr key={id}>
                        <td>
                          <Image src={thumbnail} style={{ width: '50px' }} />
                        </td>
                        <td>{title}</td>
                        <td>${price.toFixed(2)}</td>
                        <td>{quantity}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleRemoveItem(id)}
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <h5>Total: ${totalPrice.toFixed(2)}</h5>
              <Button variant="secondary" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
