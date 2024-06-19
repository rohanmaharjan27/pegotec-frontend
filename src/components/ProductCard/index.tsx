import { Button, Card, Col } from 'react-bootstrap';
import { FaShoppingCart, FaStar } from 'react-icons/fa';

import { Product } from '../../pages/Home/types';

type Props = {
  product: Product;
  handleAddToCart: (product: Product) => void;
};

const { Img, Body, Title, Text } = Card;

function ProductCard({ product, handleAddToCart }: Props) {
  const { thumbnail, title, description, price, rating } = product;
  return (
    <Col sm={12} md={6} lg={4} xl={3} className="mb-4">
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
}

export default ProductCard;
