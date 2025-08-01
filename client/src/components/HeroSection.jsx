import { useNavigate } from "react-router-dom";

export default function HeroSection() {
    const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-between overflow-hidden isolate">
  {/* Background Glows */}
  <div className="absolute inset-0 -z-10 pointer-events-none">
    <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-400 rounded-full blur-[150px] opacity-50" />
    <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-pink-300 rounded-full blur-[150px] opacity-50" />
  </div>

      <header className="w-full max-w-screen-xl mx-auto px-4 py-6 flex justify-between items-center z-10">
        <div className="text-3xl font-bold text-gray-900">ListSync</div>
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-gray-900">
            Home
          </a>
          <a href="#services" className="hover:text-gray-900">
            Our Services
          </a>
          <a href="#footer" className="hover:text-gray-900">
            Pricing
          </a>
          <a href="#contact" className="hover:text-gray-900">
            Contacts
          </a>
        </nav>
        <button onClick={() => navigate('/login')}
         className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors cursor-pointer">
          Login
        </button>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12 z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight max-w-4xl">
          Transform your ideas into reality
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
          Our platform provides you with all the tools to create a stunning and functional website without the hassle
        </p>
        <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button onClick={() => navigate('/login')}
           className="bg-black text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-gray-900 transition-colors cursor-pointer">
            Start Your Free Trial
          </button>
          
        </div>
      </main>
    </div>
  )
}
