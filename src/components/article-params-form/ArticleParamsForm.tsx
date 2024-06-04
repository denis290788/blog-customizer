import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Separator } from 'components/separator';
import { Text } from 'components/text';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { useOutsideClick } from './hooks/useOutsideClick';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';

import {
	fontFamilyOptions,
	defaultArticleState,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	OptionType,
} from '../../constants/articleProps';

type TArticleParamsFormProps = {
	onArticleStateChange: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	onArticleStateChange,
}: TArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleForm = () => {
		setIsOpen(!isOpen);
	};

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleFormChange = (
		type: keyof ArticleStateType,
		value: OptionType
	) => {
		setFormState((prev) => ({
			...prev,
			[type]: value,
		}));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onArticleStateChange(formState);
	};

	const handleReset = () => {
		onArticleStateChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={isOpen} />
			<aside
				ref={useOutsideClick(toggleForm)}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as={'h2'} weight={800} uppercase size={31}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(selected) => {
							handleFormChange('fontFamilyOption', selected);
						}}
						title='шрифт'></Select>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(selected) => {
							handleFormChange('fontSizeOption', selected);
						}}
						title='размер шрифта'></RadioGroup>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={(selected) => {
							handleFormChange('fontColor', selected);
						}}
						title='цвет шрифта'></Select>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(selected) => {
							handleFormChange('backgroundColor', selected);
						}}
						title='цвет фона'></Select>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(selected) => {
							handleFormChange('contentWidth', selected);
						}}
						title='ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
