/**
 * file: config/createEmotionCache.tsx
 * description: file responsible for creating the cache of the application
 * data: 11/11/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import createCache from '@emotion/cache';

export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
