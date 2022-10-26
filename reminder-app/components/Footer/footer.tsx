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
