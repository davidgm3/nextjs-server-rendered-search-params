'use client';
import useDebounce from '@/hooks/useDebounce';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

export default function SearchBox() {
  const [search, setSearch] = useState(
    new URLSearchParams(window.location.search).get('search') || ''
  );
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Debounce the search value to avoid triggering a server-side rerender on every keystroke
  const debouncedSearch = useDebounce(search, 300);

  // Load the search value from the URL. Useful for shareable state

  // Whenever the debounced search value changes, update the URL, which will trigger a server-side rerender from NextJS
  useEffect(() => {
    let currentParams = new URLSearchParams(window.location.search);
    if (search) {
      currentParams.set('search', search);
    } else {
      currentParams.delete('search');
    }
    startTransition(() => {
      replace(`${pathname}?${currentParams.toString()}`);
    });
  }, [debouncedSearch]);

  return (
    <div className='relative'>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-full h-12 px-4 text-lg placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
        placeholder='Search'
      />
      {isPending && (
        <div className='absolute top-0 right-0 flex items-center justify-center w-12 h-12  rounded-lg'>
          <div className='w-4 h-4 border-2  border-r-transparent animate-spin rounded-full border-blue-600'></div>
        </div>
      )}
    </div>
  );
}
