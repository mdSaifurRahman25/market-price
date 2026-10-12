import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/assets/logo-icon.png'
import Navbar from './Navbar';
import MarqueePage from './Marquee';

const Header = () => {
  const date = new Date().toLocaleString('bn-BD', {
    dateStyle: 'full'
  });

  return (
    <div className='py-3'>
      <div className='container mx-auto pb-3'>
        <div className='flex justify-between'>
          {/* Left Logo Section */}
          <div className='flex items-center gap-2 '>
            <Link href={'/'}>
              <div>
                <Image src={Logo} width={40} height={40} className='bg-teal-600 rounded-xl' alt='Bazar Dor' />
              </div>
            </Link>

            <div>
              <Link href={'/'}><p className='text-2xl font-bold'>বাজার দর</p></Link>
              <p className='text-sm'>{date}</p>
            </div>
          </div>

          {/* Right signup and user info section */}
          <div className='flex gap-2'>
            <button className="btn">সাইন ইন</button>
            <button className="btn btn-success">সাইন আপ</button>
          </div>
        </div>
      </div>

      {/* Navbar Component */}
      <Navbar />

      {/* Marquee */}
      <MarqueePage />
    </div>
  )
}

export default Header