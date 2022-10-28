/**
 * file: pages/admin.tsx
 * description: file responsible for the admin page
 * data: 10/26/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { useSession } from 'next-auth/react';
import Layout from '../components/Layout/layout';

export default function Page() {
  const { data } = useSession();

  return (
    <Layout>
      <h1>Admin Page</h1>
      <p>Only admin users can see this page.</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  );
}
