export const AnimatedBackground = () => {
  return (
    <>
      <div className="hidden sm:block fixed z-[1] bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(34,197,94,.15),rgba(255,255,255,0))]" />
      <div className="hidden sm:block fixed z-[1] bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(34,197,94,.15),rgba(255,255,255,0))]" />
    </>
  );
};
