const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white p-12 relative overflow-hidden">
      <div className="absolute inset-0">
        <svg
          className="w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="0.3"
            d="M0,256L40,229.3C80,203,160,149,240,133.3C320,117,400,139,480,160C560,181,640,203,720,186.7C800,171,880,117,960,85.3C1040,53,1120,43,1200,53.3C1280,64,1360,96,1400,112L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40"></div>

      <div className="relative z-10 text-center max-w-md">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-full ${
                i % 2 === 0
                  ? "bg-white/20 animate-bounce"
                  : "bg-white/10 animate-pulse"
              }`}
            />
          ))}
        </div>
        <h2 className="text-3xl font-extrabold mb-4">{title}</h2>
        <p className="text-gray-100 text-sm sm:text-base">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
