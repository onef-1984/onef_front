import CardReport from "../card/CardReport";
import { useWindowSize } from "@/hooks/useWindowSize";
import { GetReportListBySearchQuery } from "@/types/graphql.types";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import styles from "./Carousel.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type CarouselProps = {
  title: string;
  items: GetReportListBySearchQuery["reportList"]["items"];
};

export default function Carousel({ items, title }: CarouselProps) {
  const { windowWidth } = useWindowSize();

  if (windowWidth === 0) return <></>;
  else if (windowWidth > 768) return <BigCarousel title={title} items={items} />;
  else return <SmallCarousel title={title} items={items} />;
}

function SmallCarousel({ items, title }: CarouselProps) {
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.mobileRoot}>
        {items.map((item) => (
          <div key={item.id}>
            <CardReport {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BigCarousel({ items, title }: CarouselProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.sliderWrapper}>
        <button className={`${styles.navButton} ${styles.prev}`} ref={prevRef}>
          <IoMdArrowDropleftCircle />
        </button>
        <button className={`${styles.navButton} ${styles.next}`} ref={nextRef}>
          <IoMdArrowDroprightCircle />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          loopAdditionalSlides={4}
          slidesPerView={4}
          slidesPerGroup={4}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== "boolean" && swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            1100: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
          loop
          style={{ height: "100%", padding: "0 0 24px" }}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <CardReport {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
