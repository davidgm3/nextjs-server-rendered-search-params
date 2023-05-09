'use client';
import { Category } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export default function CategoryBox({ category }: { category: Category }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Update the URL, which will trigger a server-side rerender from NextJS
  const handleClick = () => {
    const currentParams = new URLSearchParams(window.location.search);
    if (category.id) {
      currentParams.set('category', category.id);
    } else {
      currentParams.delete('category');
    }
    startTransition(() => {
      router.replace(`${pathname}?${currentParams.toString()}`);
    });
  };

  return (
    <div
      onClick={handleClick}
      key={category.id}
      className={
        'flex items-center justify-center w-fit p-2 rounded-lg bg-white relative cursor-pointer ' +
        (searchParams.get('category')?.toString() === category.id.toString()
          ? ' border-2 border-blue-600'
          : ' border-gray-300 border')
      }
    >
      <div className='absolute  flex items-center justify-center w-12 h-12 text-gray-500 rounded-lg'>
        <div
          className='w-4 h-4 border-2  border-r-transparent animate-spin rounded-full border-blue-600'
          hidden={!isPending}
        ></div>
      </div>
      <span className={isPending ? 'opacity-0' : ''}>{category.name}</span>
    </div>
  );
}
