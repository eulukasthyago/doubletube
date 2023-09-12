import Image from 'next/image'
import CardHome from '@components/CardHome'

export default function Home() {
  return (
    <main className="dark min-h-screen">
      <section className= "max-w-5xl mx-auto pt-20">
        <CardHome />
      </section>
    </main>
  )
}
