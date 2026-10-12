import Link from "next/link";
import Marquee from "react-fast-marquee";

interface IMarquee {
  id: number,
  slug: string, 
  image: string, 
  nameBn: string, 
  today: number, 
  unit: string, 
  change: {
    dir: string, 
    pct: number
  }

}

const MarqueePage = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
  const allProduct: IMarquee[] = await res.json();
  // console.log(allProduct, 'from marquee.tsx');

  return (
    <Marquee>
      <div className="flex gap-10 py-3 border-b border-gray-300">
        {
          allProduct.map((p) => (
            <div className="" key={p.id}>
              <Link href={`${p.slug}`}>
                <span className="font-semibold text-xl">{p?.image}  {p?.nameBn} {p.today} {p.unit} <span>{p?.change?.dir} {p?.change?.pct}% </span></span>
              </Link>
            </div>
          ))
        }
      </div>
    </Marquee>
  )
}

export default MarqueePage