import { createFileRoute, Link } from '@tanstack/react-router';
import useCartStore from '../store/useCartStore';
import { Button, ContainedList, ContainedListItem, Heading, Section, Tag } from '@carbon/react';
import { Close, TrashCan } from '@carbon/icons-react';

export const Route = createFileRoute('/Cart')({
  component: Cart
});

function Cart() {
  const { cart, removeFromCart, clearCart } = useCartStore();

  return (
    <div>
      <Section level={1}>
        <Heading className="mb-10">Your Cart</Heading>
      </Section>
      {cart.length === 0 ? (
        <p className="mt-4">Your cart is empty.</p>
      ) : (
        <ContainedList
          label={<div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>Starship Item(s)</span>
            <Tag size="sm" role="status" aria-label="4 items in list">
              {cart.length}
            </Tag>
          </div>}
          kind="on-page">
          {
            cart.map((starship) => {
              const removeAction = <Button kind="ghost" iconDescription="Dismiss" hasIconOnly renderIcon={Close} aria-label="Dismiss" onClick={() => {
                removeFromCart(starship.url)
              }} />
              return (
                <ContainedListItem action={removeAction}>
                  {starship.name} - {starship.quantity} pcs
                </ContainedListItem>
              )
            })
          }
        </ContainedList>
      )}
      <div className="flex flex-row items-center mt-12 gap-4">
        {
          cart.length > 0 ?
            <Button kind="danger" renderIcon={TrashCan} onClick={clearCart}>Clear Cart</Button>
            :
            null
        }
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
}

export default Cart;
