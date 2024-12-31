import Slider from "react-slick";
import CardReport from "../card/CardReport";
import styles from "./Carousel.module.css";
import { useWindowSize } from "@/hooks/useWindowSize";
import { GetReportListBySearchQuery } from "@/types/graphql.types";

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

function BigCarousel({ items, title }: CarouselProps) {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{title}</h2>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
            <CardReport {...item} />
          </div>
        ))}
      </Slider>
    </div>
  );
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

const settings = {
  speed: 700,
  slidesToShow: 4,
  slidesToScroll: 4,
  infinite: true,
  dots: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};
