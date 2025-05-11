import Image from "next/image";
import styles from "./HeroSec.module.css";
import eyeCatch from "@/../public/images/eyeCatch.webp";
import pickImg from "@/../public/images/editorsPick.webp";
import Carousel from "../carousel/Carousel";
import Link from "next/link";
import GlassyBackground from "../glassyBackground/GlassyBackground";
import { Show } from "utilinent";
import { useReportQuery } from "@/apis/useDomain/useReport.query";
import { useEPQuery } from "@/apis/useDomain/useEP.query";

export default function HeroSec() {
  return (
    <div className={styles.root}>
      <HeroSec.EyeCatch />
      <HeroSec.EditorsPick />
      <HeroSec.Carousels />
    </div>
  );
}

HeroSec.EyeCatch = () => {
  return (
    <div className={styles.EyeCatch}>
      <Image fill sizes="500" alt="eyeCatch image" draggable="false" src={eyeCatch} />
    </div>
  );
};

HeroSec.Carousels = function Carousels() {
  const {
    data: { likedReportList },
  } = useReportQuery().GetMostLikedReportList();
  const {
    data: { recentReportList },
  } = useReportQuery().GetRecentReportList();

  return (
    <section className={styles.carousels}>
      <Carousel title="인기 리뷰" items={likedReportList} />
      <Carousel title="최신 리뷰" items={recentReportList} />
    </section>
  );
};

HeroSec.EditorsPick = function EditorsPick() {
  const {
    data: {
      editorsPick: { title, reportId, cover, nickname, description },
    },
  } = useEPQuery().GetEditorsPick();

  return (
    <Show when={!!title}>
      <section className={styles.editorsPickContainer}>
        <div className={styles.editorsPickBox}>
          <div className={styles.editorsPickImage}>
            <Image src={pickImg} alt="editors pick logo" width={300} height={120} sizes="300" draggable="false" />
          </div>

          <Link className={styles.link} href={`/report/${reportId}`}>
            <GlassyBackground className={styles.report} image={cover}>
              <div className={styles.content}>
                <p className={styles.title}>
                  {title} <span className={styles.nickname}>by. {nickname}</span>
                </p>

                <p className={styles.description}>{description}</p>

                <p className={styles.buttonLike}>지금 읽으러 가기</p>
              </div>
            </GlassyBackground>
          </Link>
        </div>
      </section>
    </Show>
  );
};
