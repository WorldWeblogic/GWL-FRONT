import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all items with proof of purchase.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to over 50 countries worldwide.',
    },
    {
      question: 'How can I track my order?',
      answer: 'After placing your order, you will receive a tracking number via email.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all items with proof of purchase.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to over 50 countries worldwide.',
    },
    {
      question: 'How can I track my order?',
      answer: 'After placing your order, you will receive a tracking number via email.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 dark:bg-slate-900 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 border-b pb-4">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left flex justify-between items-center focus:outline-none"
          >
            <span className="text-lg font-medium text-gray-800 dark:text-white">{faq.question}</span>
            <span className="text-gray-500 text-xl dark:text-white">{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && (
            <p className="mt-2 text-gray-600 dark:text-slate-50">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
