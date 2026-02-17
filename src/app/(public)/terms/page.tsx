import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "이용약관",
  description: "주식회사 코드기어의 이용약관",
};

export default function TermsPage() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-electric">
            Terms of Service
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            이용약관
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            시행일: 2026년 1월 15일
          </p>
        </div>

        <div className="space-y-10 text-base leading-relaxed text-foreground/90">
          {/* 제1조 */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">
              제1조 (목적)
            </h2>
            <p>
              본 약관은 주식회사 코드기어(이하 &quot;회사&quot;)가 운영하는 웹사이트(이하
              &quot;사이트&quot;)에서 제공하는 서비스(이하 &quot;서비스&quot;)의 이용과 관련하여
              회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을
              목적으로 합니다.
            </p>
          </div>

          <Separator />

          {/* 제2조 */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">
              제2조 (정의)
            </h2>
            <ul className="list-decimal space-y-3 pl-6 text-foreground/80">
              <li>
                &quot;사이트&quot;란 회사가 서비스를 제공하기 위하여 컴퓨터, 모바일 등 정보통신설비를
                이용하여 설정한 가상의 영업장을 말합니다.
              </li>
              <li>
                &quot;이용자&quot;란 사이트에 접속하여 본 약관에 따라 회사가 제공하는 서비스를
                이용하는 자를 말합니다.
              </li>
              <li>
                &quot;서비스&quot;란 회사가 사이트를 통해 제공하는 회사 소개, 채용 정보, 공지사항,
                기술 문의 등 일체의 서비스를 말합니다.
              </li>
            </ul>
          </div>

          <Separator />

          {/* 제3조 */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">
              제3조 (약관의 게시)
            </h2>
            <ul className="list-decimal space-y-3 pl-6 text-foreground/80">
              <li>
                회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 사이트 초기화면 또는
                연결화면에 게시합니다.
              </li>
              <li>
                회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며,
                약관이 변경된 경우 변경사항을 시행일 7일 전부터 사이트에 공지합니다.
              </li>
              <li>
                이용자가 변경된 약관에 동의하지 않는 경우, 이용자는 서비스 이용을
                중단할 수 있습니다.
              </li>
            </ul>
          </div>

          <Separator />

          {/* 제4조 */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">
              제4조 (서비스의 제공)
            </h2>
            <ul className="list-decimal space-y-3 pl-6 text-foreground/80">
              <li>
                회사는 다음과 같은 서비스를 제공합니다:
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>회사 소개 및 사업 정보 제공</li>
                  <li>채용 공고 및 지원 서비스</li>
                  <li>공지사항 및 뉴스 제공</li>
                  <li>기술 문의 및 사업 제안 접수</li>
                </ul>
              </li>
              <li>
                회사는 서비스의 내용을 변경하거나 중단할 수 있으며, 이 경우 사이트를
                통해 공지합니다.
              </li>
              <li>
                서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. 다만, 시스템
                점검 등의 사유로 일시적으로 서비스가 중단될 수 있습니다.
              </li>
            </ul>
          </div>

          <Separator />

          {/* 제5조 */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">
              제5조 (이용자의 의무)
            </h2>
            <p className="mb-3">이용자는 다음 행위를 하여서는 안 됩니다:</p>
            <ul className="list-decimal space-y-2 pl-6 text-foreground/80">
              <li>허위 정보의 등록 또는 타인의 정보 도용</li>
              <li>사이트에 게시된 정보의 무단 변경, 삭제</li>
              <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등)를 송신하거나 게시하는 행위</li>
              <li>회사 및 제3자의 저작권 등 지적재산권에 대한 침해</li>
              <li>회사 및 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
              <li>사이트의 안정적 운영을 방해하는 행위</li>
            </ul>
          </div>

          <Separator />

          {/* 제6조 */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">
              제6조 (면책사항)
            </h2>
            <ul className="list-decimal space-y-3 pl-6 text-foreground/80">
              <li>
                회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적인
                사유로 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이
                면제됩니다.
              </li>
              <li>
                회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을
                지지 않습니다.
              </li>
              <li>
                회사는 사이트를 통하여 제공하는 정보, 자료의 신뢰도, 정확성 등에
                대해서는 보증하지 않으며, 이로 인해 발생한 이용자의 손해에 대하여
                책임을 지지 않습니다.
              </li>
            </ul>
          </div>

          <Separator />

          {/* 제7조 */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">
              제7조 (분쟁 해결)
            </h2>
            <ul className="list-decimal space-y-3 pl-6 text-foreground/80">
              <li>
                본 약관에 명시되지 않은 사항은 관계 법령 및 상관례에 따릅니다.
              </li>
              <li>
                서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우, 회사 본사
                소재지를 관할하는 법원을 전속관할 법원으로 합니다.
              </li>
            </ul>
          </div>

          <Separator />

          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-foreground/80">
              <strong className="text-foreground">부칙</strong>
              <br />
              본 약관은 2026년 1월 15일부터 시행합니다.
              <br />
              <br />
              주식회사 코드기어
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
