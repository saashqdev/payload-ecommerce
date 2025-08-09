import { clsx } from "clsx";

type Props = {
  className?: string;
  loading?: "lazy" | "eager";
  priority?: "auto" | "high" | "low";
};

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props;

  const loading = loadingFromProps ?? "lazy";
  const priority = priorityFromProps ?? "low";

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Mandala Software House logo"
      width={125}
      height={88}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx("-my-7 h-[88px] w-full max-w-37.5", className)}
      src="/mandala.svg"
    />
  );
};
