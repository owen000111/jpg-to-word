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
          <h1 className="text-4xl font-light text-gray-900 mb-8">服务条款</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              <strong>最后更新：</strong> {new Date().toLocaleDateString('zh-CN')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. 条款接受</h2>
            <p className="text-gray-700 mb-6">
              通过访问和使用本网站，您接受并同意受本协议条款和规定的约束。
              如果您不同意遵守上述条款，请不要使用本服务。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. 服务描述</h2>
            <p className="text-gray-700 mb-4">
              我们的服务提供免费的在线工具，将PNG图片转换为PDF文件。该服务包括：
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>客户端PNG到PDF转换</li>
              <li>支持多种图片格式（PNG、JPG、JPEG、WEBP）</li>
              <li>批量图片合并功能</li>
              <li>高质量输出</li>
              <li>保持原始图片质量</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. 用户责任</h2>
            <p className="text-gray-700 mb-4">作为我们服务的用户，您同意：</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>仅将服务用于合法目的</li>
              <li>不上传恶意或有害文件</li>
              <li>尊重知识产权</li>
              <li>不尝试逆向工程或利用服务</li>
              <li>未经许可不得将服务用于商业目的</li>
              <li>确保您有权转换您上传的任何图片文件</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. 禁止使用</h2>
            <p className="text-gray-700 mb-4">您不得使用我们的服务：</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>用于任何非法目的或怂恿他人进行非法行为</li>
              <li>违反任何国际、联邦、省或州法规、规则、法律或地方法令</li>
              <li>侵犯或违反我们的知识产权或他人的知识产权</li>
              <li>骚扰、虐待、侮辱、伤害、诽谤、中伤、贬低、恐吓或歧视</li>
              <li>提交虚假或误导性信息</li>
              <li>上传或传输病毒或任何其他类型的恶意代码</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. 服务可用性</h2>
            <p className="text-gray-700 mb-6">
              我们努力提供连续的服务可用性，但我们不保证不间断的访问。
              由于维护、更新或技术问题，服务可能会暂时不可用。
              我们保留随时修改或停止服务的权利，恕不另行通知。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. 知识产权</h2>
            <p className="text-gray-700 mb-4">
              服务及其原始内容、功能和特性现在并将继续是我们公司及其许可方的专有财产。
              服务受版权、商标和其他法律保护。
            </p>
            <p className="text-gray-700 mb-6">
              您保留对上传的图片文件和生成的PDF文件的所有权利。
              我们不声称对您的内容拥有所有权。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. 隐私和数据保护</h2>
            <p className="text-gray-700 mb-6">
              您的隐私对我们很重要。所有PNG到PDF的转换都在您的浏览器中本地执行，
              您的文件永远不会上传到我们的服务器。请查看我们的隐私政策，
              了解我们如何收集、使用和保护您信息的详细信息。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. 责任限制</h2>
            <p className="text-gray-700 mb-6">
              在任何情况下，我们公司及其董事、员工、合作伙伴、代理人、供应商或关联公司均不对任何间接、偶然、特殊、后果性或惩罚性损害承担责任，
              包括但不限于利润损失、数据、使用、商誉或其他无形损失，这些损失是由于您使用服务而产生的。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. 免责声明</h2>
            <p className="text-gray-700 mb-6">
              本网站上的信息按"现状"提供。在法律允许的最大范围内，
              本公司排除所有与我们的网站和使用本网站相关的陈述、保证、条件和条款。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. 适用法律</h2>
            <p className="text-gray-700 mb-6">
              这些条款应根据[您的司法管辖区]的法律进行解释和管辖，不考虑其法律冲突条款。
              我们未能执行这些条款的任何权利或规定，不应被视为对这些权利的放弃。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. 条款变更</h2>
            <p className="text-gray-700 mb-6">
              我们保留随时修改或替换这些条款的权利，由我们自行决定。
              如果修订是重大的，我们将尝试在任何新条款生效前至少提前30天通知。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. 联系信息</h2>
            <p className="text-gray-700 mb-8">
              如果您对这些服务条款有任何疑问，请通过以下方式联系我们：
            </p>
            <p className="text-gray-700 mb-8">
              邮箱：legal@pdf2png.com<br />
              地址：[您的公司地址]
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
