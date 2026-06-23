'use client';
import { SessionProvider, useSession } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

function SessionSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const u = session.user as any;
      const googleId = u.id || u.sub || '';
      if (googleId && u.email && u.name) {
        api.syncUser(googleId, u.email, u.name, u.image || undefined)
          .catch((err) => console.error('Failed to sync session with NestJS backend:', err));
      }
    } else if (status === 'unauthenticated') {
      api.logout();
    }
  }, [session, status]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { retry: 1, staleTime: 30000 },
    },
  }));

  return (
    <SessionProvider>
      <SessionSync />
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
