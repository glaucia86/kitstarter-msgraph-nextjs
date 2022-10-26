# Reminder App - A Step by Step Tutorial

*(put picture about the application here)*

In this tutorial we will learn how to use Microsoft Graph integrated with Next.js.

But first we need to understand what Microsoft Graph is.

Microsoft Graph is an API that allows you to access data and services from Microsoft 365. You can use the Microsoft Graph API to build applications that interact with millions of users around the world, accessing data in a consistent way across the Microsoft 365 ecosystem.

*(write here about Microsoft Graph - including some images)*

Now that we already understand what Microsoft Graph is, let's start creating our application.

## Take a Break Reminder App. What is it? What does it do?

This application is a reminder of time intervals for you to get up and take a break. The application will remind you to take a break every 60 minutes. The application will show a notification on your computer screen and will also send you an email.

*(explain what the application does)*

## Resources used

*(list all resources used during the development of the application)*

## Prerequisites

Before anything, before creating our application, we will need to do some things first.

One of them is, create an account on the Microsoft 365 Developer Program. **[LINK HERE](https://developer.microsoft.com/en-us/microsoft-365/dev-program)**. Don't worry. This account is totally free!

If you have any doubts on how to create the account, you can watch this video **[HERE](https://www.youtube.com/watch?v=JvWLgirC8xs)**. Because it explains very well how to create the account.

## Creating the application on the Azure Portal

Now we need to follow the steps below to create the application on the Azure portal.

*(put step by step with images as how to create the application on Azure, included the environments of the application)*

Perfect! Now we can start to code our application! 

## Let's Code!

Once we already created our application on the Azure portal, we can start to code our application. In this tutorial we will use Next.js. But you can use any other framework you want. Let's install the Next.js framework.

Open your terminal and run the following command:

```bash
npx create-next-app reminder-app --typescript 
```

Now we already have our application created. Let's execute it to see if everything is working.

```bash
cd reminder-app
npm run dev
```

```bash
npm run dev
```

Open the browser and go to the following address: [http://localhost:3000](http://localhost:3000).

Now we need to install some dependencies. And one of them is the [Microsoft Graph Client](https://learn.microsoft.com/en-us/graph/sdks/create-client?tabs=Javascript). To install it, run the following command:

```bash
npm install @microsoft/microsoft-graph-client
```

If you want to know more about the Microsoft Graph Client, you can read the documentation **[HERE](https://docs.microsoft.com/en-us/graph/sdks/sdks-overview)**. And also, know about the NPM package **[HERE](https://www.npmjs.com/package/@microsoft/microsoft-graph-client)**.

Another package we will need to install is NextAuth. It is a library that helps us to integrate authentication with Next.js. To install it, run the following command:

```bash
npm install next-auth
```

Also, if you want to know more about NextAuth, you can read the documentation **[HERE](https://next-auth.js.org/)**. And also, know about the NPM package **[HERE](https://www.npmjs.com/package/next-auth)**.

Now we can finally start coding our application.

## Creating the Application Components

Now let's make some changes to our application. In this moment we are not going to use none UI framework. So, let's start creating some components.

Every application needs a Layout. So, let's create a Layout component. Create a folder called `components` and inside it create these files:

- `layout.module.css`
- `layout.tsx`

The `layout.module.css` file will be used to style our Layout component. And the `layout.tsx` file will be used to create our Layout component.

* `layout.tsx`

<details><summary><b>components/Layout/layout.tsx</b></summary>
<br/>

```tsx
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
```
</details>
<br/>

Hold on! It's not over yet. We need to create the `Header` and `Footer` components. So, let's create them.

* `header.module.css`
* `header.tsx`

<details><summary><b>components/Header/header.module.css</b></summary>
<br/>

```css
.signedInStatus {
  display: block;
  min-height: 4rem;
  width: 100%;
}

.loading,
.loaded {
  position: relative;
  top: 0;
  opacity: 1;
  overflow: hidden;
  border-radius: 0 0 0.6rem 0.6rem;
  padding: 0.6rem 1rem;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in;
}

.loading {
  top: -2rem;
  opacity: 0;
}

.signedInText,
.notSignedInText {
  position: absolute;
  padding-top: 0.8rem;
  left: 1rem;
  right: 6.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inherit;
  z-index: 1;
  line-height: 1.3rem;
}

.signedInText {
  padding-top: 0rem;
  left: 4.6rem;
}

.avatar {
  border-radius: 2rem;
  float: left;
  height: 2.8rem;
  width: 2.8rem;
  background-color: white;
  background-size: cover;
  background-repeat: no-repeat;
}

.button,
.buttonPrimary {
  float: right;
  margin-right: -0.4rem;
  font-weight: 500;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.4rem;
  padding: 0.7rem 0.8rem;
  position: relative;
  z-index: 10;
  background-color: transparent;
  color: #555;
}

.buttonPrimary {
  background-color: #346df1;
  border-color: #346df1;
  color: #fff;
  text-decoration: none;
  padding: 0.7rem 1.4rem;
}

.buttonPrimary:hover {
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.2);
}

.navItems {
  margin-bottom: 2rem;
  padding: 0;
  list-style: none;
}

.navItem {
  display: inline-block;
  margin-right: 1rem;
}
```
</details>
<br/>

We won't go into details about the css. 

Now let's focus on the `header.tsx` file. Open the `header.tsx` file and add the following code:

<details><summary><b>components/Header/header.tsx</b></summary>
<br/>

```tsx
/**
 * file: components/Header/header.tsx
 * description: file responsible for the 'Header' component
 * data: 10/26/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './header.module.css';

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                ></span>
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                {' '}
                Sign Out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/protected'>
              <a>Protected</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/admin'>
              <a>Admin</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/reminder'>
              <a>Reminder</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
```
</details>
<br/>

If you look at the code above, you'll see that we're using the `useSession` hook to get the session data. We're also using the `signIn` and `signOut` functions to sign in and out of the application. And also we are using the `status` variable to check if the session is loading or not.

You will see we are using `session?.user` to check if the user is signed in or not. If the user is signed in, we will show the user's name and email address. If the user is signed in we will show the `Sign Out` button to log out of the application.

Inside in the `return` block code we are using React. And also, we are using the `Link` component from Next.js to navigate between pages.

And finally, let's create the Footer component. Open the `components` folder and create a new folder called `Footer`. Inside in the `Footer` folder, create these files:


- `footer.module.css`
- `footer.tsx`

<details><summary><b>components/Footer/footer.module.css</b></summary>
<br/>

```css
.footer {
  margin-top: 2rem;
}

.navItems {
  margin-bottom: 1rem;
  padding: 0;
  list-style: none;
}

.navItem {
  display: inline-block;
  margin-right: 1rem;
}
```

</details>
<br/>

<details><summary><b>components/Footer/footer.tsx</b></summary>
<br/>

```tsx
/**
 * file: components/Footer/footer.tsx
 * description: file responsible for the 'Footer' component
 * data: 10/26/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Link from 'next/link';
import styles from '../Footer/footer.module.css';
import packageJSON from '../../package.json';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <a href='https://twitter.com/glaucia_lemos86'>Twitter</a>
        </li>
        <li className={styles.navItem}>
          <em>next-auth@{packageJSON.dependencies['next-auth']}</em>
        </li>
      </ul>
    </footer>
  );
}
```

</details>
<br/>

It's a simple footer component. But if you want to add more things to it, feel free to do it.

