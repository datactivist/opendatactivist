import { useEffect, useState } from 'react';
import styles from '../styles/Canvas.module.css'; // Assuming you'll use CSS modules for styling
import Layout from '../components/Layout';
import Link from 'next/link'; // Import Link

export default function CanvasPage() {
  const [canvasList, setCanvasList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/canvas?list');
      if (response.ok) {
        const data = await response.json();
        setCanvasList(data);
      } else {
        console.error('Failed to fetch canvas data');
      }
    }

    fetchData();
  }, []);

  return (
    <Layout>
      <div className={styles.canvasGalleryContainer}>
        <div className={styles.canvasGallery}>
          {canvasList.map((canvas, index) => (
            <Link key={index} href={`/canvas/${encodeURIComponent(canvas.canvaName)}/home`} passHref>
              <div className={styles.canvabox}>
                <img src={canvas.imageUrl} alt={canvas.title} className={styles.canvasImage} />
                <h2>{canvas.title}</h2>
                <p>{canvas.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
