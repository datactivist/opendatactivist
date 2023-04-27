import { useRouter } from 'next/router';
import MarkdownDocs from '../../components/docs/MarkdownDocs';

const DocsPage = () => {
  const router = useRouter();
  const { filename } = router.query;

  return (
    <div>
      <br></br>
      {filename && <MarkdownDocs filename={filename} />}
    </div>
  );
};

export default DocsPage;
