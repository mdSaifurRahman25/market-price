import Link from "next/link";

interface INavbar {
  id: string,
  slug: string,
  nameBn: string,
  icon: string,
}

const Navbar = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories');
  const navData: INavbar[] = await res.json();
  // console.log(navData);


  return (
    <nav className="border-y border-gray-200 py-4">
      <div className="container mx-auto flex gap-9">
        {
          navData.map((n) => (
            <Link className="" key={n.id} href={n.slug}>
              <span className="">{n.icon} {n.nameBn}</span>
            </Link>
          ))
        }
      </div>
    </nav>
  )
}

export default Navbar