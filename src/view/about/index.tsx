import { useState } from 'react';
import { invoke } from '@tauri-apps/api';
import { Tabs, Tag } from 'antd';

import { GITHUB_LOG_URL } from '@/utils';
import useInit from '@/hooks/useInit';
import Markdown from '@/components/Markdown';
import './index.scss';

export default function About() {
  const [logContent, setLogContent] = useState('');

  useInit(async () => {
    const data = (await invoke('get_data', { url: GITHUB_LOG_URL })) || '';
    setLogContent(data as string);
  });

  return (
    <div className="about">
      <Tabs
        items={[
          { label: 'About MBM ChatBot', key: 'about', children: <AboutChatGPTBot /> },
          { label: 'Update Log', key: 'log', children: <LogTab content={logContent} /> },
        ]}
      />
    </div>
  );
}

const AboutChatGPTBot = () => {
  return (
    <div className="about-tab">
      <Tag>MBM ChatBot Desktop Application (Mac, Windows and Linux)</Tag>
      <p>
        🕒 History versions:{' '}
        <a href="https://github.com/lencx/MBM ChatBot/releases" target="_blank">
          lencx/MBM ChatBot/releases
        </a>
      </p>
      <p>
        It is just a wrapper for the
        <a href="https://chatbot.mbmzone.com" target="_blank" title="https://chatbot.mbmzone.com">
          {' '}
          OpenAI MBM ChatBot{' '}
        </a>
        website, no other data transfer exists (you can check the{' '}
        <a
          href="https://github.com/lencx/MBM ChatBot"
          target="_blank"
          title="https://github.com/lencx/MBM ChatBot"
        >
          {' '}
          source code{' '}
        </a>
        ). The development and maintenance of this software has taken up a lot of my time. If it
        helps you, you can buy me a cup of coffee (Chinese users can use WeChat to scan the code),
        thanks!
      </p>
      <p className="imgs" style={{ float: 'left' }}>
        <a href="https://www.buymeacoffee.com/lencx" target="_blank">
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"
            alt="Buy Me A Coffee"
          />
        </a>{' '}
        <br />
        <img
          width="200"
          src="https://user-images.githubusercontent.com/16164244/207228025-117b5f77-c5d2-48c2-a070-774b7a1596f2.png"
        />
      </p>
    </div>
  );
};

const LogTab = ({ content }: { content: string }) => {
  return (
    <div>
      <p>
        Ref:{' '}
        <a href="https://github.com/lencx/MBM ChatBot/blob/main/UPDATE_LOG.md" target="_blank">
          lencx/MBM ChatBot/UPDATE_LOG.md
        </a>
      </p>
      <Markdown className="log-tab" children={content} />
    </div>
  );
};
