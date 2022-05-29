import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import gfm from 'remark-gfm';

import styles from './markdown.module.scss';

export type MarkdownProps = {
    children: string;
    className?: string;
} & ReactMarkdownOptions;

export const Markdown: React.FC<MarkdownProps> = ({ children, className }) => {
    return (
        <ReactMarkdown
            className={clsx('markdown leading-relaxed', styles.markdown, className)}
            remarkPlugins={[gfm]}
            linkTarget="_blank"
        >
            {children}
        </ReactMarkdown>
    );
};

export default Markdown;
