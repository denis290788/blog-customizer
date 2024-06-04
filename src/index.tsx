import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [customArticleState, setCustomArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleArticleState = (customArticleState: ArticleStateType) => {
		setCustomArticleState(customArticleState);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': customArticleState.fontFamilyOption.value,
					'--font-size': customArticleState.fontSizeOption.value,
					'--font-color': customArticleState.fontColor.value,
					'--container-width': customArticleState.contentWidth.value,
					'--bg-color': customArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onArticleStateChange={handleArticleState} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
