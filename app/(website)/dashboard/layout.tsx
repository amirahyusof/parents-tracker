import React from 'react';
import Layout from '@/app/(website)/_components/layout';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return <Layout>{children}</Layout>;
};

export default DashboardLayout;
