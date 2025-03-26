import { useInView } from "react-intersection-observer";

const useFadeInAnimation = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return {
    ref,
    style: {
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
    },
  };
};

export default useFadeInAnimation;
