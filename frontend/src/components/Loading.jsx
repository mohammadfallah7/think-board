const Loading = ({ message }) => {
  return (
    <div className="py-6 flex flex-col gap-2 items-center justify-center">
      <span className="loading loading-infinity loading-xl text-primary"></span>
      <span className="text-primary text-sm">{message}</span>
    </div>
  );
};

export default Loading;
