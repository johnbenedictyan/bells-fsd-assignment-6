import { useLocation } from "wouter";
import { useShoppingCart } from "../../atoms/shoppingCart";

export default function ProductCard(props) {
  const { product } = props;

  const { addToCart } = useShoppingCart();
  const [_, setLocation] = useLocation();

  const handleAddToCart = () => {
    addToCart(product);
    setLocation("/shopping-cart");
  };
  return (
    <div key={product.id}>
      <div className="group relative">
        <img
          alt={product.name}
          src={product.image}
          className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{product.price}</p>
        </div>
      </div>
      <button
        type="button"
        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={handleAddToCart}
      >
        Add To Cart
      </button>
    </div>
  );
}
