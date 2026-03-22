interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "gold";
  href?: string;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-8 py-3.5 text-sm tracking-[0.15em] transition-all duration-300 font-light";

  const variants = {
    primary:
      "bg-salon-charcoal text-white hover:bg-salon-gold",
    outline:
      "border border-salon-charcoal text-salon-charcoal hover:bg-salon-charcoal hover:text-white",
    gold:
      "bg-salon-gold text-white hover:bg-salon-charcoal",
  };

  const Tag = href ? "a" : "button";

  return (
    <Tag
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
}
