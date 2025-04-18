"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { fetchAnime } from "@/app/action";
import AnimeCard, { AnimeProp } from "./AnimeCard";

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeProp[]>([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    if (inView) {
      setPageNo((prev) => prev + 1);
      // alert("Load more items");      git remote -v
      fetchAnime(pageNo).then((res) => {
        setData([...data, ...res]);
      });
    }
  }, [inView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item: AnimeProp, index: number) => (
          <AnimeCard key={item.id} anime={item} index={index} />
        ))}
      </section>

      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
