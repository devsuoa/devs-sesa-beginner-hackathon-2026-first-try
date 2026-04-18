"use client";

import api from "@/api";
import { useQuery } from "@tanstack/react-query";

export function Hello() {
  const fastApiHello = useQuery({
    queryKey: ["fastapi", "hello"],
    queryFn: api.fastapi.getHello,
  });

  const expressHello = useQuery({
    queryKey: ["express", "hello"],
    queryFn: api.express.getHello,
  });

  if (fastApiHello.error || expressHello.error) {
    return <p>An error occurred while loading backend demos.</p>;
  }

  return (
    <div>
      <p>{fastApiHello.data?.message ?? "Loading FastAPI..."}</p>
      <p>{expressHello.data?.message ?? "Loading Express..."}</p>
    </div>
  );
}
