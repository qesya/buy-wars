import { useState } from 'react';
import { Button, Heading, TextInput } from '@carbon/react';
import { Add, ShoppingCartPlus, Subtract } from '@carbon/icons-react';
import { Starship } from '../services/types';
import useCartStore from '../store/useCartStore';
import { useNotification } from '../contexts/NotificationContext';
import StarshipModal from './StarshipModal';

interface ProductProps {
  starship: Starship;
}

const Product: React.FC<ProductProps> = ({ starship }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { addToCart } = useCartStore();
  const { addNotification } = useNotification();

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => Math.max(prev - 1, 1));
  const handleBuy = () => {
    addToCart(starship, quantity);
    addNotification(`Added ${quantity} ${starship.name}(s) to your basket!`);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-1 justify-between flex-col md:flex-row p-10 bg-gray-50">
      <div className="flex flex-col">
        <Heading className="mb-2">{starship.name}</Heading>
        <div className="flex flex-col gap-1 mt-2 mb-4">
          <p>Model: {starship.model}</p>
          <p>Manufacturer: {starship.manufacturer}</p>
          <p>Crew: {starship.crew}</p>
          <p>Cost: {starship.cost_in_credits} credits</p>
          <p>Max Speed: {starship.max_atmosphering_speed} KM/h</p>
        </div>
        <div className="flex flex-row self-start items-center my-4 gap-3">
          <Button
            renderIcon={Subtract}
            hasIconOnly
            onClick={handleDecrease}
          />
          <div className="flex flex-1">
            <TextInput
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              type="number"
              min="1"
              id="quantity"
              labelText=""
              style={{ width: "100%", textAlign: "center" }}
            />
          </div>
          <Button
            renderIcon={Add}
            hasIconOnly
            onClick={handleIncrease}
          />
        </div>
      </div>
      <div className="flex self-start md:self-center gap-4">
        <Button kind="ghost" onClick={openModal}>
          View Details
        </Button>
        <Button
          renderIcon={ShoppingCartPlus}
          onClick={handleBuy}
        >
          BUY
        </Button>
      </div>
      <StarshipModal
        isOpen={isModalOpen}
        onClose={closeModal}
        starshipUrl={starship.url}
        onBuy={handleBuy}
        starshipName={starship.name}
      />
    </div>
  );
};

export default Product;
