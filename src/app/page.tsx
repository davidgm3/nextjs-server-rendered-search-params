import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

interface HomeProps {
  searchParams: {
    search: string | undefined;
    category: string | undefined;
  };
}

// Gets all aviable products by title and category
const getProducts = async (
  search: string | undefined,
  category: string | undefined
) => {
  let url = new URL('https://api.escuelajs.co/api/v1/products');
  if (search) {
    url.searchParams.set('title', search);
  }
  if (category) {
    url.searchParams.set('categoryId', category);
  }
  const response = await fetch(url.toString(), {
    next: {
      revalidate: 3600,
    },
  });

  const data = await response.json();
  return data as Product[];
};

export default async function Home({ searchParams }: HomeProps) {
  // Given a search and category, render the products
  const products = await getProducts(
    searchParams.search,
    searchParams.category
  );

  return (
    <main className='flex flex-col items-start justify-start py-4  scroll-smooth'>
      {/* Products list */}
      <div className='grid grid-cols-1 gap-4 mx-auto px-4 rounded-lg md:grid-cols-2 lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
