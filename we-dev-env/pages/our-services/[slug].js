import React from "react";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Head from "next/head";
import ImageWithOverlay from "../../components/image-with-overlay/ImageWithOverlay";
import TextSectionWithCta from "../../components/text-section-with-cta/TextSectionWithCta";
import ServiceItem from "../../components/services-item-component/ServiceItem";
import styles from "./Service.module.scss";

const Post = ({ contents }) => {
  const data = JSON.parse(contents);

  return (
    <>
      <Head>
        <title>{data.longTitle}</title>
        <meta name="description" content={data.titleDescription} />
      </Head>

      <header className={styles.serviceHeader}>
        <ImageWithOverlay
          src={data.img}
          alt="hand holding phone showcasing Olga Golant's website"
          height={35}
          width={35}
          thin
          reverse
        />
        <div className={styles.serviceHeader_textWrapper}>
          <Link href="/our-services">
            <a className={styles.goBackCta}>
              <img
                src={require("../../public/icons/arrow-left.svg")}
                alt="arrow left"
                width="24px"
                height="14px"
              />
              <span>Services</span>
            </a>
          </Link>
          <h1>{data.title}</h1>
          <p>{data.introText}</p>
          <Link href="/our-services">
            <a className={styles.surveyCta}>{data.introSurveyText}</a>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.contentWrapper_headline}>
            How we can help you
          </h2>
          {data.processes.map((post, index) => {
            return (
              <ServiceItem post={post} key={index} index={index}></ServiceItem>
            );
          })}
        </div>

        <TextSectionWithCta
          grayBackground
          headline="You are not sure what you need?"
          paragraphs={[
            "Call us on +359 (0)886020965 or fill in the form below so we can learn more about your needs. We will contact you back to organise a timeslot to discuss your future.",
          ]}
          ctaButtonText="Contact us"
          ctaButtonLocation="/contact"
          thin
        />
      </main>
    </>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync("data/servicesData");

  return {
    paths: files.map((filename) => ({
      params: {
        slug: filename.replace(".json", ""),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const contents = fs
    .readFileSync(path.join("data/servicesData", slug + ".json"))
    .toString();

  return {
    props: {
      contents,
    },
  };
};

export default Post;