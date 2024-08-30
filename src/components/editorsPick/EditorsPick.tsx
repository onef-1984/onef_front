import { useEditorsPickAdaptor } from "@/hooks/useAdaptor/useEditorsPickAdaptor";
import pickImg from "@/../public/images/editorsPick.webp";
import styles from "./EditorsPick.module.css";
import Image from "next/image";
import GlassyBackground from "../glassyBackground/GlassyBackground";
import Link from "next/link";
import { Show } from "../util/Show";

export default function EditorsPick() {
  const { editorsPick } = useEditorsPickAdaptor();

  return (
    <Show when={!!editorsPick.title}>
      <section className={styles.editorsPickContainer}>
        <div className={styles.root}>
          <div className={styles.editorsPick}>
            <Image
              src={pickImg}
              alt="editors pick logo"
              className={styles.image}
              width={300}
              height={120}
              sizes="300"
              draggable="false"
            />
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
}
