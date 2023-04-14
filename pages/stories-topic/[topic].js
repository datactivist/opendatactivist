import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import StoriesCatalog from '../../components/StoriesCatalog';
import storiesMetadata from '../../public/sitedata/stories-catalog.json';

export async function getStaticPaths() {
  const topics = new Set();
  storiesMetadata.forEach((story) => {
    story.topics.forEach((topic) => topics.add(topic));
  });

  const paths = Array.from(topics).map((topic) => ({
    params: { topic: topic.toLowerCase().replace(/ /g, '-') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const topic = params.topic.replace(/-/g, ' ');

  const filteredStories = storiesMetadata.filter((story) =>
    story.topics.some((t) => t.toLowerCase() === topic.toLowerCase())
  );

  return {
    props: {
      topic,
      filteredStories,
    },
  };
}

const TopicStories = ({ topic, filteredStories }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1>{`Stories sur ${topic}`}</h1>
      <StoriesCatalog storiesData={filteredStories} />
    </Layout>
  );
};

export default TopicStories;
