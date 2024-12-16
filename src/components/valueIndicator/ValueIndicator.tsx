import Show from "../util/Show";

export default function ValueIndicator({ value, limit }: { value: number; limit: number }) {
  const ratio = value / limit;

  const getColor = () => {
    if (ratio >= 1) {
      return "#d6173a";
    }
    const red = Math.floor(214 * ratio);
    const green = Math.min(255, Math.floor(255 * (1 - ratio)));
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <Show when={ratio > 0.4}>
      <div style={{ color: getColor(), fontWeight: "bolder", textAlign: "right", fontSize: "0.8em" }}>
        글자수 제한 : {value} / {limit}
      </div>
    </Show>
  );
}
