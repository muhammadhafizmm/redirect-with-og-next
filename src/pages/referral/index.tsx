import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";

export default function Referral({
  refCode,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>Referral</title>
        <meta name="description" content="Referral page" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={`Gunakan referral code ${refCode} untuk memulai berbelanja`} />
        <meta
          name="og:description"
          content={`Daftar sekarang dengan referral code ${refCode}, untuk mendapatkan hadiah menarik!`}
        />
        <meta name="og:image" content="/KV Referee.png" />
      </Head>
      <h1>Referral</h1>
    </div>
  );
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { refCode } = context.query;

  return { props: { refCode } };
}
