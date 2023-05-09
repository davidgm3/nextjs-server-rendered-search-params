import { Product } from '@/types';
import Image from 'next/image';
export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className='flex flex-col items-center justify-center max-w-sm p-4 mx-auto rounded-lg  border-gray-300 bg-white border w-full'>
      <div className='flex w-full justify-between gap-3'>
        <div className='flex flex-col shrink-0 justify-between'>
          <Image
            src={product.category.image}
            alt={product.category.name}
            width={64}
            height={64}
            className='h-16 w-16'
          />
          <p className='text-sm font-medium text-center'>{product.price}$</p>
        </div>

        <div className='flex flex-col'>
          <h2 className='text-xl font-medium'>{product.title}</h2>
          <p className='text-sm font-medium'>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
