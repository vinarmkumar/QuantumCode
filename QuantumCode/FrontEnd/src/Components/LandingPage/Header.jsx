import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header(){
    const navigate = useNavigate();
    
    return(
       <>
    
   <div className="w-100 max-w-xl mx-auto sm:mx-270 mt-8 sm:mt-35 mb-8 sm:mb-35 px-3 sm:px-5 py-6 sm:py-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg sm:rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] sm:shadow-[0_8px_30px_rgba(0,0,0,0.2)] text-center">
  <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
    A New Way to <span className="text-teal-600">Learn</span>
  </h1>

  <p className="mt-2 sm:mt-3 text-gray-700 text-xs sm:text-sm md:text-base max-w-md mx-auto leading-relaxed">
    QuantumCode is the ultimate platform to help you sharpen your skills, expand your knowledge, and build your future with hands-on learning.
  </p>

  <button onClick={() => navigate('/auth?mode=signup')} className="mt-4 sm:mt-6 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-base font-semibold bg-teal-600 text-white rounded-lg sm:rounded-xl shadow-md hover:bg-teal-700 hover:scale-105 active:scale-95 transition-transform duration-300">
    Create Account →
  </button>
</div>


       </>
    );

}




