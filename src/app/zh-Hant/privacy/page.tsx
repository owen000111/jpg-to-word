"use client";
import { useLanguage } from "../../../hooks/useLanguage";
import { getTranslation } from "../../../lib/i18n";

export default function PrivacyPage() {
  const language = useLanguage();
  const t = (key: keyof typeof import('../../../lib/i18n').translations.zh, params?: Record<string, string | number>) => 
    getTranslation(language, key, params);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-4xl font-light text-gray-900 mb-8">隱私政策</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              <strong>最後更新：</strong> {new Date().toLocaleDateString('zh-TW')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. 我們收集的資訊</h2>
            <p className="text-gray-700 mb-4">
              當您使用我們的PNG轉PDF轉換服務時，我們可能會收集以下資訊：
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>使用數據：</strong>我們收集您如何與我們的網站互動的資訊，包括訪問的頁面、在頁面上花費的時間以及轉換活動。</li>
              <li><strong>設備資訊：</strong>我們可能會收集有關您設備的資訊，包括瀏覽器類型、作業系統和IP位址。</li>
              <li><strong>檔案資訊：</strong>我們收集您上傳的圖片檔案的元數據，如檔案大小、圖片數量和轉換設定。</li>
              <li><strong>效能數據：</strong>我們追蹤轉換成功率、處理時間和錯誤日誌，以改進我們的服務。</li>
              <li>等等</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. 我們如何使用您的資訊</h2>
            <p className="text-gray-700 mb-4">我們使用收集的資訊來：</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>提供和改進我們的PNG轉PDF轉換服務</li>
              <li>分析使用模式以增強使用者體驗</li>
              <li>監控服務效能並排除故障</li>
              <li>產生匿名使用統計和分析</li>
              <li>確保我們平台的安全性和完整性</li>
              <li>等等</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. 數據處理和儲存</h2>
            <p className="text-gray-700 mb-4">
              <strong>本地處理：</strong>所有PNG到PDF的轉換都在您的瀏覽器中本地執行。
              您的檔案永遠不會上傳到我們的伺服器，確保最大的隱私和安全性。
            </p>
            <p className="text-gray-700 mb-4">
              <strong>數據保留：</strong>我們不儲存您的圖片檔案或轉換後的PDF檔案。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. 第三方服務</h2>
            <p className="text-gray-700 mb-4">
              我們使用以下第三方服務，可能會收集額外資訊：
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>分析：</strong>我們使用Google Analytics來了解網站使用模式</li>
              <li><strong>CDN服務：</strong>我們使用內容分發網路來提供我們的PDF處理庫（pdf-lib）</li>
              <li><strong>託管：</strong>我們的網站託管在Vercel上，可能會收集標準網路伺服器日誌</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. 您的權利</h2>
            <p className="text-gray-700 mb-4">您有權：</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>存取我們持有的關於您的個人資訊</li>
              <li>要求更正不準確的資訊</li>
              <li>要求刪除您的數據</li>
              <li>選擇退出數據收集（儘管這可能影響服務功能）</li>
              <li>數據可攜性</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Cookie和追蹤</h2>
            <p className="text-gray-700 mb-4">
              我們使用必要的Cookie來維護您的語言偏好和會話狀態。
              我们不使用追蹤Cookie或廣告Cookie。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. 安全</h2>
            <p className="text-gray-700 mb-4">
              我們實施適當的技術和組織措施來保護您的資訊免受未經授權的存取、更改、披露或破壞。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. 政策變更</h2>
            <p className="text-gray-700 mb-4">
              我們可能會不時更新此隱私政策。我們將通過在此頁面上發布新的隱私政策並更新"最後更新"日期來通知您任何變更。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. 聯絡我們</h2>
            <p className="text-gray-700 mb-4">
              如果您對此隱私政策有任何疑問，請通過以下方式聯絡我們：
            </p>
            <p className="text-gray-700 mb-8">
              電子郵件：ouyanghuiping@gmail.com
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. 最終解釋權</h2>
            <p className="text-gray-700 mb-8">
              本隱私協議的最終解釋權在本網站，如有問題歡迎聯絡。
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
