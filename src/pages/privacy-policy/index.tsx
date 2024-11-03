import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import Head from "next/head";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>onef - 개인정보 처리방침</title>
      </Head>

      <LayoutWrapper>
        <div style={{ fontSize: "1.6rem", padding: "4rem", lineHeight: "200%" }}>
          <h2>개인정보 처리방침</h2>
          <hr />
          <br />
          <p>
            1. 개인정보의 처리 목적 onef는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는
            이용하지 않습니다.
          </p>
          <p>– 서비스 제공에 따른 본인 식별. 인증, 회원자격 유지. 관리, 독후감의 작성자 정보(닉네임) 제공</p>
          <br />
          <p>2. 개인정보의 처리 및 보유 기간</p>
          <p>① &rsquo;onef&rsquo;는 법령에 따른 개인정보 보유․이용기간 내에서 개인정보를 처리․보유합니다.</p>
          <p>② 구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
          <p>– 고객 가입 및 관리 : 소셜 로그인(카카오, 구글, 네이버)를 통한 회원가입 및 소셜 데이터를 통한 유저 관리</p>
          <p>– 보유 기간 : 사이트 탈퇴 시, 즉시 삭제</p> <br />
          <p>
            3. 정보주체와 법정대리인의 권리·의무 및 그 행사방법 이용자는 개인정보주체로써 다음과 같은 권리를 행사할 수
            있습니다.
          </p>
          <p>① 정보주체는 ‘onef’에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
          <p>1. 개인정보 열람요구</p>
          <p>2. 오류 등이 있을 경우 정정 요구</p>
          <p>3. 삭제요구</p>
          <p>4. 처리정지 요구</p>
          <br />
          <p>4. 처리하는 개인정보의 항목 작성</p>
          <p>① ‘onef’는 다음의 개인정보 항목을 처리하고 있습니다.</p>
          <p>‘onef’에서 수집하는 개인정보 항목</p>
          <p>‘onef’ 회원 가입 시, 제공 동의를 해주시는 개인정보 수집 항목입니다.</p>
          <p>■ 회원 가입 시</p>
          <p>– 필수항목 : 소셜 로그인: 프로필 사진 / 추가 정보 입력 페이지: 닉네임, 생년월일, 성별</p>
          <p>– 수집목적 : onef 회원관리</p>
          <p>– 보유기간 : 회원 탈퇴 또는 동의철회 시 지체없이 파기</p>
          <br />
          <p>5. 개인정보의 파기</p>
          <p>‘onef’는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다.</p>
          <p>파기의 절차, 기한 및 방법은 다음과 같습니다.</p>
          <p>
            이용자가 입력한 정보는 목적 달성 후 별도의 onef 내부 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 일정기간
            저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로
            이용되지 않습니다.
          </p>
          <br />
          <p>6. 개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항</p>
          <p>① ‘onef’는 서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.</p>
          <p>
            ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(https)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며
            이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.
          </p>
          <p>가. 쿠키의 사용 목적 : 유저 검증, 식별 및 해당 유저의 로그인 상태 검증</p>
          <p>
            나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보 메뉴의 옵션 설정을 통해
            쿠키 저장을 거부 할 수 있습니다.
          </p>
          <p>다. 쿠키 저장을 거부할 경우 onef의 서비스 이용에 어려움이 발생할 수 있습니다.</p>
          <br />
          <p>7. 개인정보 보호책임자 작성</p>
          <p>
            ① ‘onef’의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에
            관한 사항은 wpfekdml@me.com으로 문의 부탁드립니다.
          </p>
          <p>‘onef’는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.</p>
        </div>
      </LayoutWrapper>
    </>
  );
}
