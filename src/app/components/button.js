import React from "react";
import { motion } from "framer-motion";

const Button = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      className={`btn hover:cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;
