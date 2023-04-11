import React, { useEffect } from 'react';

const DiscourseFrame = ({ talkid }) => {
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://teamopendata.org/t/${talkid}`;
    iframe.width = '100%';
    iframe.height = '800px';
    iframe.frameBorder = '0';
    iframe.scrolling = 'yes';
    iframe.setAttribute('id', 'discourse-iframe');
    document.getElementById('discourse-comments').appendChild(iframe);

    return () => {
      document.getElementById('discourse-iframe').remove();
    };
  }, [talkid]);

  return <div id="discourse-comments" />;
};

export default DiscourseFrame;
