/**
 * file: components/Layout/layout.tsx
 * description: file responsible for the 'Layout' component
 * data: 10/26/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Header from '../Header/header';
import Footer from '../Footer/footer';
import type { ReactChildren } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>;
}
