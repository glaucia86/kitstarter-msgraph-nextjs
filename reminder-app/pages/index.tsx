/**
 * file: pages/index.tsx
 * description: file responsible for the home page
 * data: 10/26/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Layout from '../components/Layout/layout';
import Image from 'next/image';

export default function IndexPage() {
  return (
    <Layout>
      <h1>Take a Break Reminder App</h1>
      <h4>
        A step by step tutorial how you can use Microsoft Graph with Next.Js!
      </h4>
      <div>
        <Image
          priority
          src='/images/reminder.gif'
          width={560}
          height={315}
          alt='a clock image with a reminder'
        />
      </div>
    </Layout>
  );
}
