**목차**
- [what is onef stands for](#what-is-onef-stands-for)
- [배포 주소](#배포-주소)
- [기술 스택](#기술-스택)
- [기능 구현 소개](#기능-구현-소개)
  * [github action과 AWS CodeDeploy를 사용한 CI/CD 구축](#github-action과-aws-codedeploy를-사용한-cicd-구축)
  * [고차 컴포넌트 패턴을 사용하여 버튼과 링크의 스타일 통일](#고차-컴포넌트-패턴을-사용하여-버튼과-링크의-스타일-통일)
  * [일관적인 로직 사용을 위한 유틸리티 컴포넌트 도입](#일관적인-로직-사용을-위한-유틸리티-컴포넌트-도입)
  * [재귀 컴포넌트 패턴을 사용하여 댓글 기능 구현](#재귀-컴포넌트-패턴을-사용하여-댓글-기능-구현)
  * [IntersectionObserver API를 사용한 무한 스크롤](#IntersectionObserver-API를-사용한-무한-스크롤)
  * [websocket을 사용한 알림 기능 구현](#websocket을-사용한-알림-기능-구현)
  * [어댑터 패턴을 활용한 백엔드 의존성 개선](#어댑터-패턴을-활용한-백엔드-의존성-개선)
  * [레포지토리 패턴을 활용한 쿼리 함수 관리](#레포지토리-패턴을-활용한-쿼리-함수-관리)

&nbsp;
&nbsp;
# what is onef stands for

onef는 "one-nine-eight-four"의 두문자로서, 이 프로젝트를 시작할 수 있도록 영감을 준 조지 오웰의 소설 1984를 의미합니다. onef는 독후감을 쓰고 공유할 수 있는 서비스로서, 독후감이 1984자를 넘어서는 안 된다는 특징을 가지고 있습니다. 이를 통해 독후감을 쓴다는 행위 자체에 부담을 느끼는 사람들에게 그 부담을 덜어줄 수 있지 않을까 생각했습니다.

&nbsp;

# 배포 주소

[책을 읽고 영원을 기록하다 - onef](https://onef.co.kr)

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

## github action과 AWS CodeDeploy를 사용한 CI/CD 구축

main 브랜치로 코드가 머지되면 자동으로 github action이 동작하여 이를 S3와 AWS CodeDeploy로 넘깁니다. 그러면 AWS CodeDeploy는 EC2 Instance 내의 codedeploy-agent를 통해 S3에 올라간 코드 묶음을 Instance로 가져와 압축을 풀고, 정해진 명령어를 실행합니다.

[cicd.webm](https://github.com/user-attachments/assets/096c4266-7eaa-44fe-bbba-4785ac125f73)

&nbsp;

## 고차 컴포넌트 패턴을 사용하여 버튼과 링크의 스타일 통일

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
export default function Show({
  when,
  children,
  fallback = "",
}: {
  when: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}) {
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

아래는 유틸리티 컴포넌트 Show를 사용하여 다양한 조건부 연산자를 대체한 예시입니다

```tsx
  // 삼항 연산자를 대체
  <Show when={isLogin} fallback={<Header.SignLink />}>
    <Header.ProfileImagePopover {...user} />

    <Header.Notification {...user} />
  </Show>

  // and 연산자를 대체
  <Show when={toggle.BookSearchModal}>
    <Dialog closeDialog={() => setToggle((prev) => ({ ...prev, BookSearchModal: false }))}>
      <BookSearchModal />
    </Dialog>
  </Show>

  // not 연산자를 대체
  <Show when={!!errorMessage}>
    <span className={styles.errorMessage}>{errorMessage}</span>
  </Show>
```
&nbsp;

## 재귀 컴포넌트 패턴을 사용하여 댓글 기능 구현

댓글 기능을 구현할 때, 특히 답글이 여러 번 중첩되는 경우, 재귀 컴포넌트 패턴을 사용하면 코드가 훨씬 더 깔끔하고 유지보수가 쉬워집니다. 재귀 컴포넌트는 자신을 호출하여 중첩된 구조를 자연스럽게 표현할 수 있기 때문에, 댓글과 답글이 트리 형태로 이어지는 구조에서 유용합니다. 예를 들어, 각 댓글은 자신 아래에 자식 댓글을 가질 수 있고, 그 자식 댓글 또한 자식 댓글을 가질 수 있습니다. 이때, 재귀 컴포넌트를 사용하면 각 댓글을 별도의 컴포넌트로 관리하면서 중첩된 댓글을 자연스럽게 렌더링할 수 있습니다.

onef에서는 depth 프로퍼티를 사용해 재귀적으로 댓글의 깊이를 추적하고, 깊이가 5보다 깊어지면 대댓글을 작성할 수 없도록 함으로써 무한한 깊이의 대댓글이 작성되는 것을 원칙적으로 차단하고 있습니다.

```tsx
function CommentContainer({ id, depth }: { id: string; depth: number }) {
  const { comments } = useCommentsAdaptor(id);

  return (
    <div className={styles.containerRoot}>
      <Map each={comments}>
        {(commentData) => {
          return (
            <div key={commentData.id}>
              <Comment.Box key={commentData.id} depth={depth} commentData={commentData} />

              <Comment.ReplyContainer commentData={commentData}>
                <Comment.Container id={commentData.id} depth={depth + 1} />
              </Comment.ReplyContainer>
            </div>
          );
        }}
      </Map>
    </div>
  );
};
```
[댓글.webm](https://github.com/user-attachments/assets/8e9b410d-8c4a-495b-9b17-b30abf8bc20a)

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

컴포넌트에서는 useInfiniteScroll를 호출하여 아래와 같이 사용할 수 있습니다.

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
[무한스크롤.webm](https://github.com/user-attachments/assets/323f72a7-f4d9-4599-bd78-69443f240512)


&nbsp;

## websocket을 사용한 알림 기능 구현








[웹소켓.webm](https://github.com/user-attachments/assets/b0bb004e-5965-4cd3-802f-8f1f76510b0d)

&nbsp;
## 어댑터 패턴을 활용한 백엔드 의존성 개선

만약 어떠한 이유로 백엔드에서 응답하는 JSON 데이터의 형식이 달라지게 된다면 어떻게 될까요. 아래의 예시와 같이 컴포넌트가 서버 상태를 직접적으로 바라보고 있는 경우라면, 모든 컴포넌트를 수정해주어야 할 겁니다. 서비스의 초기 단계라 백엔드 스펙이 자주 바뀌는 경우라면 새로운 코드를 짜는 시간보다 컴포넌트 수정하는 데 시간을 더 쓰게 될 지도 모릅니다.

```tsx
  const bookQuery = new BookQuery();
  const { data, fetchNextPage } = useInfiniteQuery(bookQuery.getBookList(searchKeyword));
  const ref = useInfiniteScroll<HTMLDivElement>(fetchNextPage);

  const pages = data?.pages ?? []

  return (
    <div className={clsx(styles.bookSearchResult, styles.bookSearchSize)}>
      <Map each={pages}>
        {({ bookList }) => {
          return (
            <Map each={bookList.items}>
              {(book) => (
                <Card
                  key={book.isbn13}
                  item={book}
                  onClick={() => setBook(book)}
                  cardBox={<CardResultBox {...book} />}
                />
              )}
            </Map>
          );
        }}
      </Map>

      <div ref={myRef} />
    </div>
  );
}
```

따라서 저는 컴포넌트가 백엔드를 직접 바라보는 것이 아니라, 서버 응답을 매개해줄 커스텀 어댑터 훅에 의존하도록 하였습니다. 덕분에 서버 응답 형식이 변경될 때마다 모든 컴포넌트를 수정할 필요 없이, 어댑터 훅을 수정하여 이를 적절히 처리할 수 있습니다.

```tsx
export const useInfiniteBookListAdaptor = (searchKeyword: string) => {
  const bookQuery = new BookQuery();
  const { data, fetchNextPage } = useInfiniteQuery(bookQuery.getBookList(searchKeyword));

  const pages = data?.pages.map((page) => page.bookList.items).flatMap((items) => items) ?? [];

  return {
    fetchNextPage,
    pages,
  };
};
```
```tsx
function BookListSearchResult({
  searchKeyword,
  setBook,
}: {
  searchKeyword: string;
  setBook: Dispatch<SetStateAction<Item>>;
}) {
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
}
```

&nbsp;

## 레포지토리 패턴을 활용한 쿼리 함수 관리

어댑터 패턴을 사용하다 보면 데이터 요청을 여러 훅에서 관리하게 되어 데이터 요청 로직이 분산되고, 때문에 유지보수가 어려워질 수 있습니다. 이런 문제를 해결하기 위해 레포지토리 패턴을 활용하면, 데이터 요청 로직을 한 곳에서 관리할 수 있습니다. 레포지토리 패턴은 데이터 처리와 관련된 로직을 하나의 추상화된 계층으로 분리하여, 리액트 컴포넌트와 비즈니스 로직이 데이터 소스에 의존하지 않도록 만듭니다.

```tsx
export class QueryFn {
  queryFn<T>(url: string) {
    return () =>
      fetcher<T>({
        method: "get",
        url,
      });
  }

  infiniteQueryFn<T>(url: string) {
    return ({ pageParam }: { pageParam: number }) =>
      fetcher<T>({
        method: "get",
        url: `${url}&skip=${pageParam}`,
      });
  }
}
```
```tsx
export class BookQuery extends QueryFn {
  constructor() {
    super();
  }

  queryKey = ["book"];

  getBook(isbn13: string) {
    return {
      queryKey: [...this.queryKey, isbn13, "getBook"],
      queryFn: () =>
        this.fetcher<GetBookQuery>(`/book/${isbn13}`),
      enabled: !!isbn13,
    };
  }
}
```
특히 리액트 쿼리를 사용할 경우 쿼리 키 관리에 있어 중요한 점은 일관성과 재사용성입니다. 여러 컴포넌트에서 동일한 데이터나 비슷한 데이터를 요청할 때, 각 요청에 대해 일관된 쿼리 키를 사용해야 캐싱 및 리패칭 전략을 효율적으로 관리할 수 있습니다. 레포지토리 패턴을 사용하면 이러한 쿼리 키와 쿼리 함수들을 한 곳에서 관리할 수 있어, 쿼리 키의 중복을 방지하고 코드의 재사용성을 높이는 데 유리합니다.

예를 들어, BookQuery 클래스에서 getBook 메서드는 ISBN 번호를 기반으로 책 정보를 요청하는 쿼리를 정의하고 있습니다. 이를 통해 쿼리 키와 쿼리 함수가 명확하게 관리되고, 필요한 곳에서 쉽게 호출할 수 있습니다. 이 방식으로 여러 API 요청을 처리할 때, 쿼리 키와 쿼리 함수의 재사용성을 높이고, 각 요청의 세부 구현을 레포지토리 클래스에서 관리함으로써 리액트 컴포넌트가 복잡해지는 것을 방지할 수 있습니다.

onef의 전체적인 데이터 페칭 전략은 아래와 같습니다.

<img src="https://github.com/user-attachments/assets/6152a282-c249-4f62-9443-4ebcbff04984" style="width: 320px" />
