const commonStyles =
  'hidden sm:block fixed -z-10 bottom-0 h-[500px] w-[500px] rounded-full animate-pulse duration-slow bg-[radial-gradient(circle_farthest-side,rgba(156,163,175,.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_farthest-side,rgba(34,197,94,.05),rgba(255,255,255,0))] ';

export const AnimatedBackground = () => {
  return (
    <>
      <div className={`${commonStyles} left-0 right-0 top-[-10%]`} />
      <div className={`${commonStyles} right-[-5%] top-[50%]`} />
    </>
  );
};
