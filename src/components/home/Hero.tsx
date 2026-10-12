import Image from "next/image";
import hero_image from '@/assets/bazar-hero.png'


const HeroSection = () => {
    const date = new Date().toLocaleString('bn-BD', {
        dateStyle: 'full'
    });

    return (
        <div className="container mx-auto">
            <div className="bg-gray-100 rounded-2xl px-5 py-3 grid grid-cols-2">
                {/* Left side */}
                <div className="col-span-1 py-5">
                    <span className="bg-gray-200 px-3 py-2 text-teal-800 rounded-full">
                        {date}
                    </span>
                    <h1 className="pt-6 font-bold text-5xl pb-10">আজকের বাজারের দাম এক নজরে</h1>
                    <p className="text-xl pb-5">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন, সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                    <button className="btn btn-success text-white">সব পণ্য দেখুন</button>
                </div>

                {/* Right Side */}
                <div className="col-span-1">
                <Image src={hero_image} alt="Hero Image" width={500} height={500} />
                </div>
            </div>
        </div>
    )
}

export default HeroSection