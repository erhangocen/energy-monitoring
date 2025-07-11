import { Outlet } from 'react-router-dom';
import { DashboardContext, DashboardProvider } from './hooks/use-dashboard';
import AppLayout from '@/pages/dashboard/components/layout';
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';

export default function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({}) => (
          <div className='relative h-full overflow-hidden bg-background'>
            <div className='relative h-full overflow-hidden bg-background'>
              <main
                id='content'
                className={`h-full overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0`}
              >
                <Layout>
                  <LayoutHeader className='fixed z-10 h-[var(--admin-header-height)] w-full bg-background p-0 pt-5 md:px-0'>
                    <AppLayout />
                  </LayoutHeader>
                  <LayoutBody className='w-full space-y-4 pt-[var(--admin-header-height)]'>
                    <div className='pt-6'>
                      <Outlet />
                    </div>
                  </LayoutBody>
                </Layout>
              </main>
            </div>
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
