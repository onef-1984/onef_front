# what is onef stands for

onef는 "one-nine-eight-four"의 두문자로서 이 프로젝트를 시작할 수 있도록 영감을 준 조지 오웰의 소설 1984를 나타냅니다.

onef는 독후감을 쓰고 공유할 수 있는 서비스로서, 독후감이 1984자를 넘어서는 안 된다는 특징을 가지고 있습니다. 이를 통해 독후감을 쓴다는 행위 자체에 부담을 느끼는 사람들에게 그 부담을 덜어줄 수 있지 않을까 생각했습니다.

&nbsp;
# 기술 스택

**개발 언어 및 프론트엔드 라이브러리 :**
<div>
<img src="https://img.shields.io/badge/react-61dafb?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
</div>

&nbsp;

**상태 관리 도구 :**
<div>
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/CaroKann-f4f3c8?style=for-the-badge&logo=Lichess&logoColor=414193">
<img src="https://img.shields.io/badge/Sicilian-232f3e?style=for-the-badge&logo=Lichess&logoColor=ff9900">
</div>

&nbsp;

**협업 도구 :**

<div> 
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
<img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">
<img src="https://img.shields.io/badge/git-f05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
</div>

&nbsp;
# 기능 구현 소개
## 고차 컴포넌트 패턴을 사용하여 버튼과 링크의 스타일을 통일함

프론트엔드를 처음 시작했을 때부터 지금까지 제가 가지고 있던 고민거리 중 하나는 'button 태그와 a 태그가 스타일이 동일하다면 이를 어떤 식으로 처리하는 것이 옳은가'입니다. 이 두 개의 컴포넌트는 받는 props도 조금 다르고, 클릭했을 때의 동작도 다른 편이지만, 결국은 '클릭할 수 있는 영역'인 만큼 UI 적으로 비슷하거나 동일한 디자인을 가져가는 경우가 종종 있기 때문입니다.

처음에는 getClickable 이라는 함수를 사용해 서로 다른 컴포넌트의 스타일링을 처리했지만, Next.js로 넘어오면서 오직 스타일링만을 위해 Link 컴포넌트를 감싸는 새로운 컴포넌트를 만드는 것이 영 께름칙했습니다. 그래서 **고차 컴포넌트 패턴(HOC)** 을 사용하여 button 태그와 Link 컴포넌트를 하나의 고차 컴포넌트 Clickable에서 처리하도록 하였습니다.

```tsx
type TButton = React.FC<ComponentPropsWithoutRef<"button">>;
type TComponent = typeof Link | TButton;
type ClickableStyle = {
  color?: "primary" | "white" | "like" | "kakao" | "borderless";
  size?: "small" | "medium" | "large";
};
type ClickableProps<T extends TComponent> = ClickableStyle & ComponentPropsWithoutRef<T>;

export default function Clickable<T extends TComponent = TButton>({
  Component,
  ...props
}: {
  Component?: T;
} & ClickableProps<T>) {
  const Button = ({ children, ...buttonProps }: ComponentPropsWithoutRef<"button">) => (
    <button {...buttonProps}>{children}</button>
  );
  const Render = Component ?? Button;
  const { color = "primary", size = "medium", className, ...restProps } = props;
  const style = clsx(styles.root, styles[color], styles[size], className);

  // @ts-expect-error
  return <Render className={style} {...restProps} />;
}
```

이전에는 스타일을 처리하는 getClickable 함수, button 태그를 감싼 Button 컴포넌트, Link 컴포넌트를 감싼 SLink 컴포넌트까지 총 세 개의 파일이 필요하였습니다. 하지만 Clickable 컴포넌트는 앞서 언급한 세 개의 파일이 하는 일을 동일하게 처리할 수 있습니다.

```tsx
// button 태그처럼 사용
<Clickable type="submit" onClick={() => {}}>확인</Clickable>

// Link 컴포넌트처럼 사용
<Clickable component={Link} herf="/">메인 화면으로 이동</Clickable>
```

또한, Clickable 컴포넌트는 확장성이 아주 뛰어납니다. 기획 요구가 변경되어 button 태그와 Link 컴포넌트 말고 a 태그도 Clickable에 추가해야 할 수 있습니다. 그럴 때는 아래와 같이 타입 수정만 해주면 즉시 a 태그도 Clickable하게 사용할 수 있습니다 :)

```tsx
type TButton = React.FC<ComponentPropsWithoutRef<"button">>;
type TAnchor = React.FC<ComponentPropsWithoutRef<"a">>;
type TComponent = typeof Link | TButton | TAnchor;
```

&nbsp;

## 일관적인 로직 사용을 위한 유틸리티 컴포넌트 도입

대규모 팀 프로젝트를 진행하다보면 컴포넌트를 조건부로 랜더링하는 다양한 방법을 마주하게 됩니다. 누군가는 not 연산자(||)를 사용하고, 또 누군가는 널 병합 연산자(??)를 사용하고, 또 누군가는 삼항 연산자(?:)를 사용하기도 합니다. Array.prototype.map도 비슷해서, 개발자는 저마다의 코드 스타일에 따라 이를 작성합니다.

저는 이러한 파편화를 조기에 바로잡고자 각각의 로직을 컴포넌트 내부로 숨기고, 개발자는 컴포넌트의 규칙에 따라 코드를 작성하는 **유틸리티 컴포넌트 Show와 Map** 을 만들어 사용하고 있습니다. 이를 통해 개발자들은 조건부 렌더링과 반복 렌더링 시 특정한 코드 스타일을 따르지 않아도 되고, Show와 Map 컴포넌트를 통해 일관된 방식으로 UI를 구성할 수 있습니다.

이러한 유틸리티 컴포넌트는 코드의 가독성을 높이고, 대규모 프로젝트에서 발생할 수 있는 코드 스타일 파편화를 방지하는 데 큰 도움을 줍니다.

```tsx
type TShowProps = {
  when: boolean;
  children: ReactNode;
  fallback?: ReactNode;
};

export default function Show({ when, children, fallback = "" }: TShowProps) {
  return <>{when ? children : fallback}</>;
}
```
```tsx
export default function Map<T>({
  each,
  children,
  fallback = "",
}: {
  each: T[];
  fallback?: ReactNode;
  children: (item: T, index: number) => ReactNode;
}) {
  return <>{each?.length !== 0 ? each.map(children) : fallback}</>;
}
```



&nbsp;
## IntersectionObserver API를 사용한 무한 스크롤

상품 리스트나 게시글 피드처럼 데이터가 많고 계속해서 추가적으로 로드해야 하는 페이지라면 반드시라고 해도 될 정도로 무한 스크롤 기능을 자주 사용하게 됩니다. 이 기능을 구현하는 방법은 다양하지만, 저는 IntersectionObserver API를 커스텀 훅으로 감싸 효율적으로 처리할 수 있는 방법을 선택했습니다.

```tsx
export const useInfiniteScroll = <T extends HTMLElement>(callback: Function) => {
  // 보여지고 있는지를 나타내는 state
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    // 컴포넌트가 마운트 되면 IntersectionObserver를 생성
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      // 관찰 대상이 화면에 보이면 isVisible을 true로 설정
      setIsVisible(entry.isIntersecting);
    });

    const currentRef = ref.current;

    if (currentRef) {
      // myRef를 관찰 대상으로 설정
      observer.observe(currentRef);
      currentRef.style.minHeight = "1px"; // 기본 높이 설정 (optional)
    }

    // 컴포넌트가 언마운트 되면 observer를 해제
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // 특정 대상을 언옵저브해야 함
      }
      observer.disconnect(); // 옵저버 자체 해제
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      callback();
      setIsVisible(false);
    }
  }, [isVisible, callback, setIsVisible]);

  return ref;
};
```




```tsx
  const { fetchNextPage, pages } = useInfiniteBookListAdaptor(searchKeyword);
  const ref = useInfiniteScroll<HTMLDivElement>(fetchNextPage);

  return (
    <div className={clsx(styles.bookSearchResult, styles.bookSearchSize)}>
      <Map each={pages}>
        {(book) => (
          <Card key={book.isbn13} item={book} onClick={() => setBook(book)} cardBox={<CardResultBox {...book} />} />
        )}
      </Map>

      <div ref={ref} />
    </div>
  );
```



&nbsp;
## 




# 배포 주소

[책을 읽고 영원을 기록하다 - onef](https://onef.co.kr)
