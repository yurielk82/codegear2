import { Separator } from "@/components/ui/separator";

export default function PrivacyPage() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-electric">
            Privacy Policy
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            개인정보처리방침
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            시행일: 2026년 1월 15일
          </p>
        </div>

        <div className="space-y-10 text-base leading-relaxed text-foreground/90">
          <p>
            주식회사 코드기어(이하 &quot;회사&quot;)는 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를
            보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
            개인정보 처리방침을 수립·공개합니다.
          </p>

          <Separator />

          {/* 제1조 */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">
              제1조 (개인정보의 수집 및 이용 목적)
            </h2>
            <p className="mb-3">회사는 다음의 목적을 위하여 개인정보를 처리합니다.</p>
            <ul className="list-disc space-y-2 pl-6 text-foreground/80">
              <li>
                <strong>채용 지원 관리:</strong> 입사 지원서 접수, 지원 자격 확인, 채용 전형 진행, 합격 여부 통보
              </li>
              <li>
                <strong>서비스 문의 처리:</strong> 기술 문의, 사업 제안 등 문의사항 접수 및 회신
              </li>
              <li>
                <strong>뉴스레터 발송:</strong> 회사 소식, 채용 정보, 기술 동향 안내 (동의 시)
              </li>
              <li>
                <strong>홈페이지 운영:</strong> 웹사이트 이용 통계 분석, 서비스 개선
              </li>
            </ul>
          </div>

          <Separator />

          {/* 제2조 */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">
              제2조 (수집하는 개인정보의 항목)
            </h2>
            <p className="mb-3">회사는 다음의 개인정보 항목을 수집합니다.</p>

            <h3 className="mb-2 mt-4 text-base font-semibold text-foreground">
              1. 채용 지원 시
            </h3>
            <ul className="list-disc space-y-1 pl-6 text-foreground/80">
              <li>필수: 성명, 연락처(전화번호, 이메일), 학력, 경력사항</li>
              <li>선택: 포트폴리오, 자격증, 희망 연봉</li>
            </ul>

            <h3 className="mb-2 mt-4 text-base font-semibold text-foreground">
              2. 문의 접수 시
            </h3>
            <ul className="list-disc space-y-1 pl-6 text-foreground/80">
              <li>필수: 성명, 이메일</li>
              <li>선택: 연락처, 소속 기관</li>
            </ul>

            <h3 className="mb-2 mt-4 text-base font-semibold text-foreground">
              3. 자동 수집 항목
            </h3>
            <ul className="list-disc space-y-1 pl-6 text-foreground/80">
              <li>IP 주소, 쿠키, 접속 로그, 서비스 이용 기록</li>
            </ul>
          </div>

          <Separator />

          {/* 제3조 */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">
              제3조 (개인정보의 보유 및 이용기간)
            </h2>
            <p className="mb-3">
              회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
              다만, 다음의 경우 명시한 기간 동안 보유합니다.
            </p>
            <ul className="list-disc space-y-2 pl-6 text-foreground/80">
              <li>채용 지원 정보: 채용 전형 종료 후 6개월 (불합격 시)</li>
              <li>문의 처리 정보: 문의 처리 완료 후 1년</li>
              <li>
                관계 법령에 의한 보존:
                <ul className="mt-1 list-disc space-y-1 pl-6">
                  <li>전자상거래 등에서의 소비자보호에 관한 법률에 따른 표시·광고에 관한 기록: 6개월</li>
                  <li>통신비밀보호법에 따른 웹사이트 접속 기록: 3개월</li>
                </ul>
              </li>
            </ul>
          </div>

          <Separator />

          {/* 제4조 */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">
              제4조 (개인정보의 파기 절차 및 방법)
            </h2>
            <p className="mb-3">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
              지체 없이 해당 개인정보를 파기합니다.
            </p>
            <ul className="list-disc space-y-2 pl-6 text-foreground/80">
              <li>
                <strong>전자적 파일:</strong> 복구 및 재생이 불가능한 방법으로 영구 삭제
              </li>
              <li>
                <strong>종이 문서:</strong> 분쇄기로 분쇄하거나 소각하여 파기
              </li>
            </ul>
          </div>

          <Separator />

          {/* 제5조 */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">
              제5조 (개인정보 제공 관련)
            </h2>
            <p>
              회사는 정보주체의 개인정보를 제1조에서 명시한 범위 내에서만 처리하며,
              정보주체의 동의, 법률의 특별한 규정 등에 해당하는 경우에만 개인정보를
              제3자에게 제공합니다.
            </p>
          </div>

          <Separator />

          {/* 제6조 */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">
              제6조 (정보주체의 권리·의무 및 행사방법)
            </h2>
            <p className="mb-3">
              정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
            </p>
            <ul className="list-disc space-y-2 pl-6 text-foreground/80">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리 정지 요구</li>
            </ul>
            <p className="mt-3">
              위 권리 행사는 서면, 이메일 등을 통하여 하실 수 있으며, 회사는 이에 대해
              지체 없이 조치하겠습니다.
            </p>
          </div>

          <Separator />

          {/* 제7조 */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">
              제7조 (개인정보 보호책임자)
            </h2>
            <p className="mb-3">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한
              정보주체의 불만 처리 및 피해 구제를 위하여 아래와 같이 개인정보 보호책임자를
              지정하고 있습니다.
            </p>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">개인정보 보호책임자</h3>
              <ul className="space-y-1.5 text-sm text-foreground/80">
                <li>회사명: 주식회사 코드기어</li>
                <li>이메일: contact@codegear.co.kr</li>
              </ul>
            </div>
          </div>

          <Separator />

          <p className="text-sm text-muted-foreground">
            본 개인정보처리방침은 2026년 1월 15일부터 적용됩니다.
            개인정보처리방침의 변경이 있는 경우 웹사이트 공지를 통하여 안내할 예정입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
