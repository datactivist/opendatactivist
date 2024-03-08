import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import BlogGallery from '../components/docs/BlogGallery';
import styles from '../styles/stories-catalog.module.css';
const DocsIndex = () => {
    const router = useRouter();
    const { topic } = router.query;

    return (
        <Layout>
            <div className={styles.docspage} style={{ backgroundColor: '#173541', marginTop: '-15px', marginBottom:'-15px' }}>
                <h1 className={styles.blogpageTitle}>Le Blog.</h1>
                <BlogGallery topicFilter={topic} />
            </div>
        </Layout>
    );
};

export default DocsIndex;
