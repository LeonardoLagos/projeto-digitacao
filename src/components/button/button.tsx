const Button = ({ text, onClick }: { text: string; onClick?: () => void }) => {
  return (
    <button
      type="submit"
      className="w-full mt-2 py-2 rounded-[8px] px-4 bg-primary text-white font-medium text-lg"
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {text}
    </button>
  );
};

export default Button;
