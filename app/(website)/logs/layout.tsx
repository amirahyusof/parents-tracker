import React from 'react';
import Layout from '@/app/(website)/_components/layout';

const LogLayout = ({ children }: { children: React.ReactNode }) => {
    return <Layout>{children}</Layout>;
};

export default LogLayout
