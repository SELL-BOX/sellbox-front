import Head from 'next/head'

type EnvContextProps = {
  children: JSX.Element
}

export default function EnvContext({ children }: EnvContextProps) {
  return (
    <>
      <Head>
        <script src="/__ENV.js" defer={true} />
      </Head>
      {children}
    </>
  )
}
