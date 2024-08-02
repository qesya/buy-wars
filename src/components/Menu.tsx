import { Link } from '@tanstack/react-router';
import { ShoppingBag } from '@carbon/icons-react';
import { Heading, Section } from '@carbon/react';
import useCartStore from '../store/useCartStore';
import '../App.css';

const Menu: React.FC = () => {
  const { cart } = useCartStore();
  return (
    <div className="flex flex-row justify-between items-center px-4 py-6 mb-6">
      <Section level={2}>
        <Heading>
          BuyWars
        </Heading>
      </Section>
      <div className="flex flex-row items-center">
        <Link to="/" className="menu-button">Starships</Link>

      </div>
      <Link to="/Cart" className="menu-button">
        <div className="flex flex-row items-center gap-2">
          <ShoppingBag />
          Cart ( {cart.length} )
        </div>
      </Link>
    </div>
  );
};

export default Menu;
