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
  const { data: { items } = { items: { items: [] } } } = new useReportQuery().getMostLikedReportList();
  const { data: { reportList } = { reportList: { items: [] } } } = new useReportQuery().getRecentReportList();

  return (
    <section className={styles.carousels}>
      <Carousel title="인기 리뷰" items={items.items} />
      <Carousel title="최신 리뷰" items={reportList.items} />
    </section>
  );
};

HeroSec.EditorsPick = function EditorsPick() {
  const {
    data: { editorsPick } = { editorsPick: { title: "", reportId: "", cover: "", nickname: "", description: "" } },
  } = new useEPQuery().getEditorsPick();

  return (
    <Show when={!!editorsPick.title}>
      <section className={styles.editorsPickContainer}>
        <div className={styles.editorsPickBox}>
          <div className={styles.editorsPickImage}>
            <Image src={pickImg} alt="editors pick logo" width={300} height={120} sizes="300" draggable="false" />
          </div>

          <Link className={styles.link} href={`/report/${editorsPick.reportId}`}>
            <GlassyBackground className={styles.report} image={editorsPick.cover}>
              <div className={styles.content}>
                <p className={styles.title}>
                  {editorsPick.title} <span className={styles.nickname}>by. {editorsPick.nickname}</span>
                </p>

                <p className={styles.description}>{editorsPick.description}</p>

                <p className={styles.buttonLike}>지금 읽으러 가기</p>
              </div>
            </GlassyBackground>
          </Link>
        </div>
      </section>
    </Show>
  );
};
