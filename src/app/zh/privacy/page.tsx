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
          <h1 className="text-4xl font-light text-gray-900 mb-8">隐私政策</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              <strong>最后更新：</strong> {new Date().toLocaleDateString('zh-CN')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. 我们收集的信息</h2>
            <p className="text-gray-700 mb-4">
              当您使用我们的PNG转PDF转换服务时，我们可能会收集以下信息：
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>使用数据：</strong>我们收集您如何与我们的网站互动的信息，包括访问的页面、在页面上花费的时间以及转换活动。</li>
              <li><strong>设备信息：</strong>我们可能会收集有关您设备的信息，包括浏览器类型、操作系统和IP地址。</li>
              <li><strong>文件信息：</strong>我们收集您上传的图片文件的元数据，如文件大小、图片数量和转换设置。</li>
              <li><strong>性能数据：</strong>我们跟踪转换成功率、处理时间和错误日志，以改进我们的服务。</li>
              <li>等等</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. 我们如何使用您的信息</h2>
            <p className="text-gray-700 mb-4">我们使用收集的信息来：</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>提供和改进我们的PNG转PDF转换服务</li>
              <li>分析使用模式以增强用户体验</li>
              <li>监控服务性能并排除故障</li>
              <li>生成匿名使用统计和分析</li>
              <li>确保我们平台的安全性和完整性</li>
              <li>等等</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. 数据处理和存储</h2>
            <p className="text-gray-700 mb-4">
              <strong>本地处理：</strong>所有PNG到PDF的转换都在您的浏览器中本地执行。
              您的文件永远不会上传到我们的服务器，确保最大的隐私和安全性。
            </p>
            <p className="text-gray-700 mb-4">
              <strong>数据保留：</strong>我们不存储您的图片文件或转换后的PDF文件。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. 第三方服务</h2>
            <p className="text-gray-700 mb-4">
              我们使用以下第三方服务，可能会收集额外信息：
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>分析：</strong>我们使用Google Analytics来了解网站使用模式</li>
              <li><strong>CDN服务：</strong>我们使用内容分发网络来提供我们的PDF处理库（pdf-lib）</li>
              <li><strong>托管：</strong>我们的网站托管在Vercel上，可能会收集标准网络服务器日志</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. 您的权利</h2>
            <p className="text-gray-700 mb-4">您有权：</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>访问我们持有的关于您的个人信息</li>
              <li>要求更正不准确的信息</li>
              <li>要求删除您的数据</li>
              <li>选择退出数据收集（尽管这可能影响服务功能）</li>
              <li>数据可移植性</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Cookie和跟踪</h2>
            <p className="text-gray-700 mb-4">
              我们使用必要的Cookie来维护您的语言偏好和会话状态。
              我们不使用跟踪Cookie或广告Cookie。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. 安全</h2>
            <p className="text-gray-700 mb-4">
              我们实施适当的技术和组织措施来保护您的信息免受未经授权的访问、更改、披露或破坏。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. 政策变更</h2>
            <p className="text-gray-700 mb-4">
              我们可能会不时更新此隐私政策。我们将通过在此页面上发布新的隐私政策并更新"最后更新"日期来通知您任何变更。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. 联系我们</h2>
            <p className="text-gray-700 mb-4">
              如果您对此隐私政策有任何疑问，请通过以下方式联系我们：
            </p>
            <p className="text-gray-700 mb-8">
              邮箱：ouyanghuiping@gmail.com
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. 最终解释权</h2>
            <p className="text-gray-700 mb-8">
              本隐私协议的最终解释权在本网站，如有问题欢迎联系。
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <a 
              href="/zh" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← 返回PNG转PDF转换器
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
