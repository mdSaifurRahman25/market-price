const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-12 py-6 bg-white">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-600 text-center sm:text-left">
        <p className="font-medium text-gray-800">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
};

export default Footer;
