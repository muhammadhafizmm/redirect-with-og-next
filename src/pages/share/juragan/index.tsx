import { getShareSettingByType } from "@/data-provider/prisma";
import { ReferralType } from "@prisma/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useEffect } from "react";

export default function ShareJuraganPage({
  ogTitle,
  ogImage,
  ogDescription,
  redirectUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    window.location.href = redirectUrl
  }, [redirectUrl]);
  return (
    <div>
      <Head>
        <title>{ogTitle}</title>
        <meta name="og:title" content={ogTitle} />
        <meta name="og:description" content={ogDescription} />
        <meta name="og:image" content={ogImage} />
      </Head>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { refCode } = context.query;
  const settingData = await getShareSettingByType(ReferralType.JURAGAN);
  if (settingData && refCode && refCode === "string") {
    const parseTitle = settingData.og_title.replace(/{code}/g, refCode);
    const parseDesc = settingData.og_description.replace(/{code}/g, refCode);
    return {
      props: {
        ogTitle: parseTitle,
        ogDescription: parseDesc,
        ogImage: settingData.og_image,
        redirectUrl: settingData.redirect_url,
      },
    };
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
