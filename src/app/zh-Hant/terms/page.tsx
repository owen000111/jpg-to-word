"use client";
import { useLanguage } from "../../../hooks/useLanguage";
import { getTranslation } from "../../../lib/i18n";

export default function TermsPage() {
  const language = useLanguage();
  const t = (key: keyof typeof import('../../../lib/i18n').translations.zh, params?: Record<string, string | number>) => 
    getTranslation(language, key, params);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-4xl font-light text-gray-900 mb-8">服務條款</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              <strong>最後更新：</strong> {new Date().toLocaleDateString('zh-TW')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. 條款接受</h2>
            <p className="text-gray-700 mb-6">
              通過存取和使用本網站，您接受並同意受本協議條款和規定的約束。
              如果您不同意遵守上述條款，請不要使用本服務。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. 服務描述</h2>
            <p className="text-gray-700 mb-4">
              我們的服務提供免費的線上工具，將PNG圖片轉換為PDF檔案。該服務包括：
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>客戶端PNG到PDF轉換</li>
              <li>支援多種圖片格式（PNG、JPG、JPEG、WEBP）</li>
              <li>批次圖片合併功能</li>
              <li>高品質輸出</li>
              <li>保持原始圖片品質</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. 使用者責任</h2>
            <p className="text-gray-700 mb-4">作為我們服務的使用者，您同意：</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>僅將服務用於合法目的</li>
              <li>不上傳惡意或有害檔案</li>
              <li>尊重智慧財產權</li>
              <li>不嘗試逆向工程或利用服務</li>
              <li>未經許可不得將服務用於商業目的</li>
              <li>確保您有權轉換您上傳的任何圖片檔案</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. 禁止使用</h2>
            <p className="text-gray-700 mb-4">您不得使用我們的服務：</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>用於任何非法目的或慫恿他人進行非法行為</li>
              <li>違反任何國際、聯邦、省或州法規、規則、法律或地方法令</li>
              <li>侵犯或違反我們的智慧財產權或他人的智慧財產權</li>
              <li>騷擾、虐待、侮辱、傷害、誹謗、中傷、貶低、恐嚇或歧視</li>
              <li>提交虛假或誤導性資訊</li>
              <li>上傳或傳輸病毒或任何其他類型的惡意程式碼</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. 服務可用性</h2>
            <p className="text-gray-700 mb-6">
              我們努力提供連續的服務可用性，但我們不保證不間斷的存取。
              由於維護、更新或技術問題，服務可能會暫時不可用。
              我們保留隨時修改或停止服務的權利，恕不另行通知。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. 智慧財產權</h2>
            <p className="text-gray-700 mb-4">
              服務及其原始內容、功能和特性現在並將繼續是我們公司及其許可方的專有財產。
              服務受版權、商標和其他法律保護。
            </p>
            <p className="text-gray-700 mb-6">
              您保留對上傳的圖片檔案和生成的PDF檔案的所有權利。
              我們不聲稱對您的內容擁有所有權。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. 隱私和數據保護</h2>
            <p className="text-gray-700 mb-6">
              您的隱私對我們很重要。所有PNG到PDF的轉換都在您的瀏覽器中本地執行，
              您的檔案永遠不會上傳到我們的伺服器。請查看我們的隱私政策，
              了解我們如何收集、使用和保護您資訊的詳細資訊。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. 責任限制</h2>
            <p className="text-gray-700 mb-6">
              在任何情況下，我們公司及其董事、員工、合作夥伴、代理人、供應商或關聯公司均不對任何間接、偶然、特殊、後果性或懲罰性損害承擔責任，
              包括但不限於利潤損失、數據、使用、商譽或其他無形損失，這些損失是由於您使用服務而產生的。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. 免責聲明</h2>
            <p className="text-gray-700 mb-6">
              本網站上的資訊按"現狀"提供。在法律允許的最大範圍內，
              本公司排除所有與我們的網站和使用本網站相關的陳述、保證、條件和條款。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. 適用法律</h2>
            <p className="text-gray-700 mb-6">
              這些條款應根據[您的司法管轄區]的法律進行解釋和管轄，不考慮其法律衝突條款。
              我們未能執行這些條款的任何權利或規定，不應被視為對這些權利的放棄。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. 條款變更</h2>
            <p className="text-gray-700 mb-6">
              我們保留隨時修改或替換這些條款的權利，由我們自行決定。
              如果修訂是重大的，我們將嘗試在任何新條款生效前至少提前30天通知。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. 聯絡資訊</h2>
            <p className="text-gray-700 mb-8">
              如果您對這些服務條款有任何疑問，請通過以下方式聯絡我們：
            </p>
            <p className="text-gray-700 mb-8">
              電子郵件：legal@pdf2png.com<br />
              地址：[您的公司地址]
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <a 
              href="/zh-Hant" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← 返回PNG轉PDF轉換器
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
