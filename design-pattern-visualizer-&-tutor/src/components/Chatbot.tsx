import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2, Maximize2, Minimize2, X, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Mermaid } from './Mermaid';

interface Message {
  role: 'user' | 'model';
  content: string;
}

const CodeBlock = ({ className, children, node, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const isInline = !match && !String(children).includes('\n');
  
  if (!isInline && match && match[1] === 'mermaid') {
    return <Mermaid chart={String(children).replace(/\n$/, '')} />;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return !isInline ? (
    <div className="relative group my-2">
      <div className="bg-zinc-800 p-3 rounded-md overflow-x-auto text-sm text-zinc-100">
        <code className={className} {...props}>
          {children}
        </code>
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 bg-zinc-700 text-zinc-300 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-600 hover:text-white"
        title="Copy code"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  ) : (
    <code className="bg-zinc-200 text-zinc-800 px-1 py-0.5 rounded text-sm" {...props}>
      {children}
    </code>
  );
};

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Hi! I am your Design Pattern Tutor. Ask me anything about design patterns, or paste your code and I will visualize its architecture!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are an expert software architect and design pattern tutor.
Your goal is to explain design patterns, answer questions, and analyze code.
Explain the code and concepts as if you are explaining them to a child, using simple analogies and easy-to-understand language.
You must be able to change the code language according to the user's need. If the user asks for code in Python, C++, or any other language, provide the example in that language.
If the user provides code and asks to visualize it, you MUST generate a Mermaid classDiagram or sequenceDiagram enclosed in \`\`\`mermaid ... \`\`\` blocks.
Be concise, clear, and educational.`,
        },
      });

      // Send chat history
      for (const msg of messages.slice(1)) { // Skip initial greeting
        await chat.sendMessage({ message: msg.content });
      }

      const response = await chat.sendMessage({ message: userMessage });
      
      setMessages((prev) => [...prev, { role: 'model', content: response.text || 'Sorry, I could not generate a response.' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { role: 'model', content: 'An error occurred while communicating with the AI. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (content: string) => {
    // Custom renderer for markdown to support Mermaid
    return (
      <ReactMarkdown
        components={{
          p({ children }) {
            return <div className="mb-4 last:mb-0">{children}</div>;
          },
          code: CodeBlock
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-700 transition-transform hover:scale-105 z-50 flex items-center justify-center"
      >
        <Bot className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-zinc-200 flex flex-col transition-all duration-300 z-50 ${
        isExpanded ? 'w-[800px] h-[80vh]' : 'w-[400px] h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-100 bg-indigo-50 rounded-t-2xl">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-indigo-900">AI Tutor</h3>
        </div>
        <div className="flex items-center space-x-2 text-indigo-400">
          <button onClick={() => setIsExpanded(!isExpanded)} className="hover:text-indigo-600 transition-colors p-1">
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="hover:text-indigo-600 transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-sm'
                  : 'bg-white border border-zinc-200 text-zinc-800 rounded-bl-sm shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2 opacity-70">
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                <span className="text-xs font-medium uppercase tracking-wider">
                  {msg.role === 'user' ? 'You' : 'Tutor'}
                </span>
              </div>
              <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : ''}`}>
                {renderMessageContent(msg.content)}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-zinc-200 rounded-2xl rounded-bl-sm p-4 shadow-sm flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              <span className="text-sm text-zinc-500">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-zinc-100 bg-white rounded-b-2xl">
        <div className="flex items-end space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask a question or paste code..."
            className="flex-1 max-h-32 min-h-[44px] p-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-zinc-400 text-center mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};
