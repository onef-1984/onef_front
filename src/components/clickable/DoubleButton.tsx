import Button from "./Button";
import styles from "./Clickable.module.css";

type DoubleButtonProps = {
  text: [string, string];
  onClick: [() => void, () => void];
};

export default function DoubleButton({ text, onClick }: DoubleButtonProps) {
  return (
    <div className={styles.doubleButton}>
      <Button type="button" color="white" onClick={onClick[0]}>
        {text[0]}
      </Button>

      <Button type="button" color="primary" onClick={onClick[1]}>
        {text[1]}
      </Button>
    </div>
  );
}
