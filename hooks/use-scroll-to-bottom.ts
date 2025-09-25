import { useEffect, useRef } from "react";

type Props = {
  changes?: any;
};

const useScrollToBottom = ({ changes }: Props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [changes]);

  useEffect(() => {
    scrollToBottom();
  }, []);
  return { scrollRef };
};

export default useScrollToBottom;
