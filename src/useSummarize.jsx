// useSummarize.jsx
import { useSummary } from 'use-react-summary';

const useSummarize = (content, numWords) => {
  const { summarizeText, isLoading, error } = useSummary({
    text: content,
    words: numWords,
  });
  return { summarizeText, isLoading, error };
};

export default useSummarize;