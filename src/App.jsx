import React, { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import useSummarize from './useSummarize';

const sampleBlogPost = {
  title: "The Future of Artificial Intelligence",
  author: "Jane Doe",
  date: "2023-07-15",
  content: `
# The Future of Artificial Intelligence

Artificial Intelligence (AI) is rapidly evolving, reshaping industries and our daily lives. As we stand on the brink of a new technological era, it's crucial to understand the potential impacts and challenges that lie ahead.

## Current State of AI

AI has made significant strides in recent years. Machine learning algorithms are becoming increasingly sophisticated, capable of handling complex tasks such as natural language processing, image recognition, and even creative endeavors like art and music composition.

## Potential Applications

The applications of AI are vast and varied:

1. **Healthcare**: AI can assist in diagnosing diseases, developing new drugs, and personalizing treatment plans.
2. **Transportation**: Self-driving cars and optimized traffic management systems could revolutionize how we move.
3. **Education**: Personalized learning experiences tailored to individual students' needs.
4. **Environmental Protection**: AI can help in monitoring and mitigating climate change effects.

## Challenges and Concerns

While the potential benefits are enormous, there are also significant challenges to address:

- **Ethics and Bias**: Ensuring AI systems are fair and unbiased.
- **Job Displacement**: As AI automates more tasks, we need to consider the impact on employment.
- **Privacy and Security**: With AI processing vast amounts of data, protecting individual privacy is crucial.
- **Control and Safety**: As AI systems become more autonomous, ensuring they remain under human control is vital.

## The Road Ahead

As we move forward, collaboration between technologists, policymakers, and ethicists will be crucial in shaping the future of AI. We must strive to harness its potential while mitigating risks and ensuring it benefits all of humanity.

The future of AI is not just about technological advancement, but about how we as a society choose to shape and apply these powerful tools.
  `
};

const BlogDetails = () => {
  const [numWords, setNumWords] = useState(100);
  const [showSummary, setShowSummary] = useState(false);
  const { summarizeText, isLoading, error } = useSummarize(sampleBlogPost.content, numWords);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (text) => {
    if (typeof text === 'string') {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
    } else {
      console.error('The provided text is not a string:', text);
    }
  };

  const handleStop = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const getSummaryText = () => {
    if (summarizeText && summarizeText.props && summarizeText.props.children) {
      return summarizeText.props.children;
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Title Bar */}
      <div className="bg-pink-600 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">AI Summarizer</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">{sampleBlogPost.title}</h2>
            <div className="mb-6 text-gray-600">
              <span className="mr-4">By {sampleBlogPost.author}</span>
              <span>{new Date(sampleBlogPost.date).toDateString()}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left side: Blog content */}
              <div className="w-full lg:w-2/3">
                <div className="prose max-w-none">
                  <Markdown>{sampleBlogPost.content}</Markdown>
                </div>
              </div>

              {/* Right side: Summary section */}
              <div className="w-full lg:w-1/3">
                <div className="sticky top-6 bg-gray-50 rounded-lg p-6 shadow-md">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Summary</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="number"
                      placeholder="Max words"
                      value={numWords}
                      onChange={(e) => setNumWords(Number(e.target.value))}
                      className="px-3 py-2 border rounded w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => setShowSummary(true)}
                      className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Summarize
                    </button>
                  </div>
                  
                  {showSummary && (
                    <div className="mt-4">
                      {isLoading ? (
                        <p className="text-gray-600">Summarizing...</p>
                      ) : error ? (
                        <p className="text-red-500">{error}</p>
                      ) : (
                        <div>
                          <div className="flex gap-2 mb-4">
                            <button
                              onClick={() => handleSpeak(getSummaryText())}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                              disabled={isSpeaking}
                            >
                              🔊 Speak
                            </button>
                            <button
                              onClick={handleStop}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                              disabled={!isSpeaking}
                            >
                              🔇 Stop
                            </button>
                          </div>
                          {summarizeText && summarizeText.props && summarizeText.props.children ? (
                            <div className="prose max-w-none bg-white p-4 rounded-lg shadow-inner">
                              <Markdown>{summarizeText.props.children}</Markdown>
                            </div>
                          ) : (
                            <p className="text-gray-600">Unable to display summary. Received unexpected data type.</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;