import { useQuery } from '@tanstack/react-query';

interface Customer {
  id: string;
  name: string;
  email: string;
}

export const useCustomer = (customerId?: string) => {
  return useQuery({
    queryKey: ['customer', customerId],
    queryFn: async (): Promise<Customer | null> => {
      if (!customerId) return null;
      // Mock data - replace with actual API call
      return {
        id: customerId,
        name: 'John Doe',
        email: 'john@example.com',
      };
    },
    enabled: !!customerId,
  });
};
