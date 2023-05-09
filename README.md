# NextJS server rendered search params

Imagine we have a screen with products, and we want to be able to filter them, by name, by price, by category, etc. The normal approachs would be:

- Once new data is needed, call an API with the new params and get the new data to do it client-side. We need to maintain client-state for the data, with many overheads.
- Refetch the whole page with the new query parameters to do it server-side.

## Better approach

With the introduction of React Server Components, we can easily adopt a new approach.
This example works by pushing state to the URL, and then NextJS will stream the already-rendered HTML to the client. This has multiple benefits:

- We don't need to maintain state for the data.
- We don't need to refetch the whole page.
- We don't need to do any client-side logic to fetch the data, control loading state, etc.
- It looks the same to the user as if we were doing it client-side.
- Automatic caching by NextJS.

**But what if we need to know if new data is currently loading?** Simple, we can combine useTransition and useEffect as shown in the code.
