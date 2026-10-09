const Loading = () => {
  return (
    <div>
      <div className="skeleton h-24 w-full rounded-2xl"></div>
      <div className="skeleton mt-6 h-16 w-full rounded-2xl"></div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-28 rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
};

export default Loading;