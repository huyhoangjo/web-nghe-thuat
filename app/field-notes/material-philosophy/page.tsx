'use client';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArchiveImage } from '@/components/ui/ArchiveImage';

export default function MaterialPhilosophyPage() {
  const { t } = useLanguage();

  return (
    <Container className="py-24 max-w-4xl bg-background-primary space-y-16">
      {/* Back Link */}
      <Link 
        href="/about" 
        className="text-xs tracking-widest text-text-secondary hover:text-text-primary transition-colors flex items-center space-x-2 font-mono uppercase font-bold"
      >
        <span>← BACK TO BIO & PHILOSOPHY</span>
      </Link>

      {/* Title & Metadata Header */}
      <div className="border-b-2 border-border-light pb-12 space-y-6 text-center">
        <span className="text-xs tracking-[0.35em] text-text-secondary font-mono font-bold uppercase block">
          {t("MUSEUM PUBLICATION / ESSAY", "ẤN PHẨM BẢO TÀNG / BÀI LUẬN")}
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-medium text-text-primary tracking-wide leading-tight">
          MATERIAL PHILOSOPHY
        </h1>
        <p className="font-serif italic text-xl md:text-2xl text-text-primary tracking-wide font-normal">
          {t(
            "The Origin of Form: Matter, Suspension, and Perception",
            "Khởi nguyên của Hình hài: Vật chất, Huyền phù và Nhận thức"
          )}
        </p>
        <div className="flex justify-center items-center space-x-4 text-xs text-text-secondary font-mono font-bold pt-4">
          <span>NGO THI THUY DUYEN</span>
          <span>•</span>
          <span>ESSAY & RESEARCH</span>
        </div>
      </div>

      {/* Main Essay Content */}
      <article className="prose prose-stone max-w-none text-text-primary text-lg md:text-xl leading-[2.1] space-y-10 font-serif font-normal">
        
        {/* Paragraph 1 */}
        <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-text-primary">
          {t(
            "I do not view material as merely a medium for creating an artwork. To me, every material carries within itself a history, a process of transformation, and unrevealed possibilities of existence. My artistic practice begins with listening to those possibilities.",
            "Tôi không xem vật liệu là phương tiện để tạo nên một tác phẩm. Với tôi, mỗi vật liệu đều mang trong mình một lịch sử, một quá trình biến đổi và nhiều khả năng tồn tại chưa được khai mở. Thực hành nghệ thuật của tôi bắt đầu từ việc lắng nghe những khả năng ấy."
          )}
        </p>

        {/* Paragraph 2 */}
        <p>
          {t(
            "For more than twenty years, dó paper has been the central material in my creative journey. What binds me to dó paper is not only its fragile beauty, but the fact that its very formation is a process of reconstruction.",
            "Trong hơn hai mươi năm, giấy dó là chất liệu trung tâm trong hành trình sáng tác của tôi. Điều khiến tôi gắn bó với giấy dó không chỉ là vẻ đẹp mong manh của nó, mà còn bởi chính sự hình thành của nó đã là một quá trình tái cấu trúc."
          )}
        </p>

        {/* Featured Pull Quote 1 */}
        <blockquote className="my-12 border-l-4 border-text-primary pl-8 py-4 font-serif italic text-2xl md:text-3xl text-text-primary space-y-2 bg-background-secondary/80 rounded-r-lg">
          <p>
            {t(
              "“Dó paper was once tree bark. Before taking the form of paper, that matter passes through a phase where it is no longer a tree, yet not yet paper. It is precisely this 'in-between' state that becomes the point of departure for my entire thinking.”",
              "“Giấy dó từng là vỏ cây... Trước khi có hình hài của một tờ giấy, vật chất ấy đã trải qua một giai đoạn không còn là cây nhưng cũng chưa phải là giấy. Chính trạng thái 'ở giữa' ấy trở thành điểm khởi đầu cho toàn bộ suy nghĩ của tôi.”"
            )}
          </p>
        </blockquote>

        {/* Paragraph 3 */}
        <p>
          {t(
            "I realized that all matter undergoes such transformations. No form is a final endpoint. Every structure is merely a temporary state in a continuous journey of becoming something else.",
            "Tôi nhận ra rằng mọi vật chất đều trải qua những lần biến đổi như vậy. Không có hình hài nào là điểm kết thúc. Mỗi cấu trúc đều chỉ là một trạng thái tạm thời trong hành trình tiếp tục trở thành một hình thái khác."
          )}
        </p>

        {/* Paragraph 4 */}
        <p>
          {t(
            "Perhaps because of this, I have always seen dó paper as a metaphor for human existence, especially for women. Soft and fragile, yet deeply resilient. It can be torn or distorted, yet always retains the innate capacity to be reconstructed.",
            "Có lẽ vì vậy, tôi luôn nhìn giấy dó như một ẩn dụ về con người, đặc biệt là người phụ nữ. Mềm mại, mong manh nhưng bền bỉ. Có thể bị xé rách, biến dạng, nhưng vẫn luôn mang trong mình khả năng được tái cấu trúc."
          )}
        </p>

        {/* Image Display inside Essay */}
        <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
          <div className="space-y-3">
            <div className="border-2 border-border-medium bg-background-secondary shadow-md">
              <ArchiveImage
                src="/images/materials/material-1.jpg"
                alt="Dó Paper Fiber and Thread"
                id="essay-mat-1"
                aspectRatio="aspect-[4/3]"
              />
            </div>
            <p className="text-xs text-text-secondary font-mono font-bold">
              {t("FIG 1. Dó paper fibers suspended in water & stitched thread traces.", "HÌNH 1. Sợi giấy dó lơ lửng trong nước & dấu vết đường chỉ khâu.")}
            </p>
          </div>

          <div className="space-y-3">
            <div className="border-2 border-border-medium bg-background-secondary shadow-md">
              <ArchiveImage
                src="/images/materials/material-2.jpg"
                alt="Resin Layer and Spatial Light"
                id="essay-mat-2"
                aspectRatio="aspect-[4/3]"
              />
            </div>
            <p className="text-xs text-text-secondary font-mono font-bold">
              {t("FIG 2. Transparent resin block creating spatial depth & refraction.", "HÌNH 2. Khối resin trong suốt tạo chiều sâu không gian & sự phản xạ.")}
            </p>
          </div>
        </div>

        {/* Paragraph 5 */}
        <p>
          {t(
            "In my creative process, I intentionally tear paper, stitch it together, and form new structures. The thread is not meant to conceal tears. They are traces of transformation. The wound does not disappear; it becomes part of a new, stronger structure.",
            "Trong quá trình sáng tác, tôi chủ động xé giấy, khâu lại và tạo nên những cấu trúc mới. Những đường chỉ không nhằm che giấu vết rách. Chúng là dấu vết của sự chuyển hóa. Vết thương không biến mất; nó trở thành một phần của cấu trúc mới mạnh mẽ hơn."
          )}
        </p>

        {/* Paragraph 6 */}
        <p>
          {t(
            "This process mirrors my own journey. Life and art have repeatedly compelled me to reconstruct myself. I realized that maturity does not come from preserving one's initial form, but from the ability to continuously transform without losing one's essence.",
            "Quá trình ấy cũng phản chiếu hành trình của chính tôi. Cuộc sống và nghệ thuật nhiều lần buộc tôi phải tái cấu trúc bản thân. Tôi nhận ra rằng sự trưởng thành không đến từ việc giữ nguyên hình hài ban đầu, mà từ khả năng liên tục biến đổi mà không đánh mất bản chất."
          )}
        </p>

        {/* Paragraph 7 & 8 */}
        <p>
          {t(
            "From dó paper, I began asking another question: can a material as fragile as paper exist beyond its own boundaries? That question led me to resin. Initially, I viewed resin as a way to preserve paper. But as I researched deeper, I realized resin is not a coating or a means to freeze an object. Resin becomes a spatial environment.",
            "Từ giấy dó, tôi bắt đầu đặt ra một câu hỏi khác: liệu một vật liệu vốn mong manh như giấy có thể tồn tại vượt khỏi giới hạn của chính nó? Câu hỏi ấy đưa tôi đến với resin. Ban đầu, tôi xem resin như một cách bảo tồn giấy. Nhưng càng nghiên cứu, tôi càng nhận ra rằng resin không phải là lớp phủ hay phương tiện để đóng băng vật thể. Resin trở thành một không gian."
          )}
        </p>

        {/* Featured Pull Quote 2 */}
        <blockquote className="my-12 border-l-4 border-text-primary pl-8 py-4 font-serif italic text-2xl md:text-3xl text-text-primary space-y-2 bg-background-secondary/80 rounded-r-lg">
          <p>
            {t(
              "“If water was the medium where bark fibers suspended before crystallizing into paper, resin is a new space where matter continues to exist in a state of suspension. I am no longer interested in protecting paper, but in creating an environment where matter continues to unlock alternative possibilities of existence.”",
              "“Nếu nước là môi trường nơi những sợi vỏ cây lơ lửng trước khi kết tinh thành giấy, thì resin là một không gian mới, nơi vật chất tiếp tục tồn tại trong trạng thái huyền phù. Tôi không còn quan tâm đến việc bảo vệ giấy, mà quan tâm đến việc tạo ra một môi trường để vật chất tiếp tục mở ra những khả năng tồn tại khác.”"
            )}
          </p>
        </blockquote>

        {/* Paragraph 9 & 10 */}
        <p>
          {t(
            "Light is the final material that completes this process. I do not use light merely to illuminate the work. Light reveals the space of matter. As it penetrates resin, light brings forth depth, shadows, and shifting imagery that evolve with the observer's position. Space is only truly completed when light actively participates in the artwork's structure.",
            "Ánh sáng là vật liệu cuối cùng hoàn thiện quá trình ấy. Tôi không sử dụng ánh sáng để chiếu sáng tác phẩm. Ánh sáng làm hiển lộ không gian của vật chất. Khi đi xuyên qua resin, ánh sáng làm xuất hiện chiều sâu, bóng đổ và những hình ảnh luôn thay đổi theo vị trí của người quan sát. Không gian chỉ thật sự được hoàn thành khi ánh sáng tham gia vào cấu trúc của tác phẩm."
          )}
        </p>

        {/* Paragraph 11 */}
        <p>
          {t(
            "That is why I choose to suspend artworks in space rather than fixing them to a wall. The resin block is no longer a solid object. It becomes a cross-section of a suspension pool, where matter floats between possibilities before taking shape. Viewers do not stand before a fixed image; they must move, alter their vantage point, and construct form within their own perception.",
            "Đó cũng là lý do tôi lựa chọn treo tác phẩm trong không gian thay vì cố định nó trên tường. Khối resin không còn là một vật thể đặc. Nó trở thành một lát cắt của bể huyền phù, nơi vật chất đang lơ lửng giữa nhiều khả năng trước khi thành hình. Người xem không đứng trước một hình ảnh đã được xác định. Họ phải di chuyển, thay đổi góc nhìn và tự kiến tạo hình hài trong nhận thức của mình."
          )}
        </p>

        {/* Paragraph 12 & 13 */}
        <p>
          {t(
            "Thus, the artwork offers no single answer. It opens a process of perception. To me, matter possesses no fixed essence. What we call form is merely a temporary outcome of the encounter between matter, space, light, and perception. Form is not an inherent trait of matter, but a temporary reflection of awareness. This is the origin of the series 'The Origin of No-Self', and the foundation for the work 'Suspension'.",
            "Vì vậy, tác phẩm không đưa ra một câu trả lời. Nó mở ra một quá trình nhận thức. Đối với tôi, vật chất không mang một bản chất cố định. Điều mà chúng ta gọi là hình hài chỉ là kết quả tạm thời của sự gặp gỡ giữa vật chất, không gian, ánh sáng và nhận thức. Vật chất luôn chứa đựng nhiều khả năng tồn tại. Hình hài không phải là bản chất cố hữu của vật chất, mà là kết quả tạm thời của nhận thức. Đó là điểm khởi đầu của series Khởi nguyên của Vô Ngã (The Origin of No-Self), và cũng là nền tảng cho tác phẩm Huyền Phù (Suspension)."
          )}
        </p>
      </article>

      {/* Footer Navigation & Related Series Link */}
      <div className="border-t-2 border-border-light pt-12 mt-16 space-y-8">
        <div className="bg-background-secondary border-2 border-border-medium p-8 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-lg shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs tracking-widest text-text-secondary font-mono font-bold uppercase block">
              {t("RELATED ARTWORK SERIES", "SERIES TÁC PHẨM LIÊN QUAN")}
            </span>
            <h4 className="font-serif text-2xl text-text-primary font-medium">
              {t("The Origin of No-Self & Suspension", "Khởi Nguyên Của Vô Ngã & Huyền Phù")}
            </h4>
            <p className="text-xs font-mono font-bold text-text-secondary">Chapter 06 (2013 - 2014)</p>
          </div>
          <Link
            href="/works"
            className="border-2 border-text-primary px-6 py-3 text-xs font-bold tracking-widest text-text-primary hover:bg-text-primary hover:text-background-primary transition-colors font-mono uppercase whitespace-nowrap shadow-sm"
          >
            {t("VIEW BODY OF WORKS →", "XEM TIẾN TRÌNH TÁC PHẨM →")}
          </Link>
        </div>
      </div>
    </Container>
  );
}
