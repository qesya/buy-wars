import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Link } from '@tanstack/react-router'
import App from '../App';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: App,
  notFoundComponent: () => {
    return (
      <div>
        <p>Not Found</p>
        <Link to="/">Start Over</Link>
      </div>
    )
  },
})