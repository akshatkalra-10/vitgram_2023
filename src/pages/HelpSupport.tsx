import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, MessageCircle, Shield, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function HelpSupport() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I change my password?",
      answer: "To change your password, go to Settings > Privacy & Security > Password. Enter your current password and then your new password twice to confirm."
    },
    {
      question: "How do I report inappropriate content?",
      answer: "You can report inappropriate content by clicking the three dots menu on any post, comment, or profile and selecting 'Report'. Follow the prompts to provide details about the issue."
    },
    {
      question: "How do I delete my account?",
      answer: "To delete your account, go to Settings > Privacy & Security > Account > Delete Account. Please note that this action is permanent and cannot be undone."
    },
    {
      question: "How do I enable two-factor authentication?",
      answer: "To enable two-factor authentication, go to Settings > Privacy & Security > Security > Two-Factor Authentication. Follow the setup process to add an extra layer of security to your account."
    },
    {
      question: "How do I change my email address?",
      answer: "To change your email address, go to Settings > Privacy & Security > Account > Email Address. Enter your new email address and verify it through the confirmation email."
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-dark min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-600 dark:text-gray-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold dark:text-white">Help & Support</h1>
      </div>

      {/* Help Categories */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <HelpCircle className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
            <div className="font-medium dark:text-white">Help Center</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Browse help articles</div>
          </button>

          <button className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
            <div className="font-medium dark:text-white">Contact Us</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Get in touch with support</div>
          </button>

          <button className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
            <div className="font-medium dark:text-white">Safety Center</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Learn about safety features</div>
          </button>

          <button className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
            <div className="font-medium dark:text-white">Terms & Policies</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Read our terms of service</div>
          </button>
        </div>
      </div>

      {/* FAQs */}
      <div className="p-4">
        <h2 className="text-lg font-semibold dark:text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium dark:text-white">{faq.question}</span>
                {expandedFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              {expandedFaq === index && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HelpSupport; 