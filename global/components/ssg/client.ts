import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({
	query: { payload, ...query },
}) => {
	return { props: { ...query, ...JSON.parse(`${payload || '{}'}`) } }
}
