import { Button } from '@/components/custom/button';
import { LayoutBody, LayoutHeader } from '@/components/custom/layout';
import { Search } from '@/components/search';
import ThemeSwitch from '@/components/theme-switch';
import Logo from '@/components/ui/logo';
import { Separator } from '@/components/ui/separator';
import { UserNav } from '@/components/user-nav';
import { IconBell } from '@tabler/icons-react';
import { Layout } from 'lucide-react';
import React from 'react';

interface AppLayoutProps extends React.HTMLAttributes<HTMLElement> {}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className='flex w-full flex-col justify-between gap-4 bg-background'>
      <div className='flex flex-row justify-between px-12'>
        <div className='flex flex-row items-center gap-5'>
          <Logo link />
          <Separator orientation='vertical' />
        </div>
        <div className='flex flex-row'>
          <div className='flex items-center space-x-4'>
            <Search />
            <Button
              size='icon'
              variant='ghost'
              className='rounded-full'
              onClick={() => null}
            >
              <IconBell size={22} />
            </Button>
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
      </div>

      <Separator orientation='horizontal' />
    </div>
  );
}
