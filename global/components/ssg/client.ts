import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	return { props: JSON.parse((query as any).payload) }
}
