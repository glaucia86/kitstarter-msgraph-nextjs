# Reminder App - step by step tutorial

*(colocar a foto da aplicação)*

Aqui nesse tutorial vamos aprender a como podemos usar Microsoft Graph integrado com Next.js

Mas primeiro precisamos entender antes o que é Microsoft Graph.

Microsoft Graph é uma API que permite que você acesse dados e serviços do Microsoft 365. Você pode usar a API do Microsoft Graph para construir aplicativos que interajam com milhões de usuários em todo o mundo, acessando dados de maneira consistente em todo o ecossistema do Microsoft 365.

*(escrever aqui sobre o Microsoft Graph - incluindo algumas imagens)*

Agora que já entendemos o que é o Microsoft Graph, vamos começar a criar nossa aplicação.

## Take a Break Reminder App. O que é? O que faz?

Essa aplicação é um lembrete de intervalos de tempo para você se levantar e fazer uma pausa. A aplicação irá te lembrar de fazer uma pausa a cada 60 minutos. O aplicativo irá mostrar uma notificação na tela do seu computador e também irá enviar um e-mail para você. 

*(explicar o que a aplicação faz)*

## Recursos usados

*(listar todos os recursos usados durante o desenvolvimento da aplicação)*

## Pré-requisitos

Antes de mais nada, antes de criar a nossa aplicação, precisaremos fazer algumas coisinhas antes. 

Uma delas é, criar uma conta no Microsoft 365 Developer Program. **[LINK AQUI](https://developer.microsoft.com/en-us/microsoft-365/dev-program)**. Não se preocupe. Essa conta é totalmente gratuita!

Se você tiver dúvidas em como criar a conta, você pode assistir esse vídeo **[AQUI](https://www.youtube.com/watch?v=JvWLgirC8xs)**. Pois explica direitinho como criar a conta.

## Criando a aplicação no Portal Azure

Agora precisamos seguir os seguintes passos para criar a aplicação no portal Azure.

*(colocar o passo a passo com imagens como criar a aplicação no Azure, incluso as environments da aplicação)*

Perfeito! Agora podemos começar a codar!

## Let's code!

Agora que criamos a nossa aplicação no portal Azure, vamos começar a codar. Nesse projeto utilizaremos o Next.js, então vamos começar instalando ele.

Para isso, vamos abrir o terminal e digitar o seguinte comando:


```bash
npx create-next-app reminder-app --typescript
```

Agora que já criamos o projeto, para saber que tudo está funcionando, vamos rodar o projeto com o seguinte comando:

```bash
cd reminder-app
```

```bash
npm run dev
```

Abre o browser e digite o seguinte endereço: http://localhost:3000 e pronto! Já temos o nosso projeto rodando.

Precisamos instalar algumas dependências para que possamos dar continuarmos com o nosso projeto. Um deles é o **[Microsoft Graph Client](https://learn.microsoft.com/en-us/graph/sdks/create-client?tabs=Javascript)**. Para instalar, vamos digitar o seguinte comando:

```bash
npm install @microsoft/microsoft-graph-client
```  

Se desejar conhecer mais sobre o Microsoft Graph Client, você pode acessar esse link **[AQUI](https://docs.microsoft.com/en-us/graph/sdks/sdks-overview)** e conhecer o NPM do Microsoft Graph Client **[AQUI](https://www.npmjs.com/package/@microsoft/microsoft-graph-client)**.

Outro pacote que precisaremos instalar é o NextAuth. Para instalar, vamos digitar o seguinte comando:

```bash
npm install next-auth
```

Também, se desejar saber mais sobre o NextAuth, você pode acessar esse link **[AQUI](https://next-auth.js.org/)** e conhecer o NPM do NextAuth **[AQUI](https://www.npmjs.com/package/next-auth)**.

Podemos agora começar a criar alguns componentes. 

## Criando alguns componentes na aplicação!

Vamos agora alterar um pouco a nossa aplicação. Não usaremos, nesse primeiro momento, nenhum UI Framework. Então vamos começar criando alguns componentes.

Toda aplicação precisa de um Layout. Então vamos criar um componente chamado Layout. Para isso, crie uma pasta chamada `components` e dentro dessa pasta, crie dois arquivos:

* `layout.module.css`
* `layout.tsx`

```tsx

```


-------------------------


Na raiz do projeto, crie uma pasta chamada: `components -> Header`. E, dentro da pasta `Header` crie os arquivos:

* `header.module.css`
* `header.tsx`

Vamos criar um css simples para o nosso componente Header. Abra o arquivo `header.module.css` e coloque o seguinte código:

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

Não vamos entrar em detalhes sobre o css, mas, se quiser saber mais sobre o css. 

Agora, vamos focar no componente `header.tsx`. Abra o arquivo `header.tsx` e coloque o seguinte código:

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

Se você olhar o código acima, você verá que estamos usando o `useSession` do `next-auth/react` para obter os dados da sessão do usuário. E também estamos usando o `status` para verificar se a sessão está carregando ou não. Você verá que estamos usando o `session?.user` para verificar se o usuário está logado ou não. Se o usuário estiver logado, então mostraremos o nome e o e-mail do usuário. E também, se o usuário estiver logado, então mostraremos o botão `Sign Out` para que o usuário possa sair da aplicação.

Já na parte do bloco do código dentro do `return` estamos usando react. E também estamos usando o `Link` do `next/link` para navegar entre as páginas da aplicação. 

