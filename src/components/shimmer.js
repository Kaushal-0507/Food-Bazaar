const Shimmer = () => {
  return (
    <div className="outer-shimmer-container flex flex-col justify-center gap-12">
      {/* Landing Image Shimmer - More Pronounced Pulse */}
      <div className="shimmer-landing-img mt-6 w-[990px] h-[350px] rounded-[40px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer-fast mx-auto"></div>

      {/* Card Shimmers - Stronger Gradient Movement */}
      <div className="shimmer-container p-1 flex justify-center flex-wrap gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="shimmer-card p-2 w-[280px] h-[180px] rounded-xl 
                      relative overflow-hidden bg-gray-200"
          >
            {/* Enhanced Shimmer Effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 
                           animate-shimmer-fast bg-[length:400%_100%]"
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shimmer;
