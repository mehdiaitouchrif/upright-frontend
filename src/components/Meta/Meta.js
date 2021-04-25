import { Helmet } from 'react-helmet'

function Meta({ title, description, keywords }) {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords} />
		</Helmet>
	)
}

Meta.defaultProps = {
	title: 'Upright - log in or sign up',
	description:
		'Upright helps you connect and share with the people in your life.',
	keywords:
		'upright, social media, posts, comments, sharing, exploring, chatting, posting, platform',
}

export default Meta
