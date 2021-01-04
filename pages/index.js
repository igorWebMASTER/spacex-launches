import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function Home({ launches }) {
  console.log('launches', launches);

  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Lançamentos</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>SpaceX Lançamentos</h1>

        <p className={styles.description}>Últimos lançamentos</p>

        <div className={styles.grid}>
          {launches.map((launch) => {
            return (
              <a
                key={launch.id}
                href={launch.links.video_link}
                className={styles.card}
              >
                <h3>{launch.mission_name}</h3>
                <p>
                  <strong>Lançamento</strong>:{' '}
                  {new Date(launch.launch_date_local).toLocaleString('pt-BR')}
                </p>
              </a>
            );
          })}

          {/* <a href='https://nextjs.org/learn' className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href='https://github.com/vercel/next.js/tree/master/examples'
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href='https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a> */}
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Igor Ribeiro
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        launchesPast(limit: 10) {
          id
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            article_link
            video_link
            mission_patch
          }
          rocket {
            rocket_name
          }
        }
      }
    `,
  });

  return {
    props: {
      launches: data.launchesPast,
    },
  };
}
