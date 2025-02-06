import { Button as MUIButton, CircularProgress } from "@mui/material";
import { twMerge } from "tailwind-merge";

const buttonStyles = {
  backgroundColor: "primary.main",
  color: "white",
  "&:hover": {
    backgroundColor: "primary.dark",
  },
};

const Button = ({
  variant,
  onClick,
  type,
  color,
  children,
  size,
  isLoading,
  disabled,
  loadingText,
  disableRipple,
  startIcon,
  sx,
  className,
  endIcon,
  ...rest
}) => {
  return (
    <MUIButton
      disabled={disabled ? disabled : isLoading}
      type={type}
      onClick={onClick}
      variant={variant}
      className={twMerge(
        className,
        `${
          disabled ? "!bg-slate-300" : ""
        } !flex !items-center text-nowrap !justify-center !capitalize`
      )}
      color={color}
      sx={{ ...sx }} // Combine styles
      disableRipple={disableRipple}
      size={size}
      startIcon={!isLoading ? startIcon : undefined}
      endIcon={!isLoading ? endIcon : undefined}
      {...rest}
    >
      {isLoading ? (
        <>{loadingText || <CircularProgress size={25} color="inherit" />}</>
      ) : (
        children
      )}
    </MUIButton>
  );
};

export default Button;
