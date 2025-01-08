import { Button as MUIButton, CircularProgress } from "@mui/material";

const buttonStyles = {
  backgroundColor: "primary.main",
  color: "white",
  "&:hover": {
    backgroundColor: "primary.dark",
  },
};

const Button = (props) => {
  const {
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
    endIcon,
    ...rest
  } = props;

  return (
    <MUIButton
      disabled={disabled ? disabled : isLoading}
      type={type}
      onClick={onClick}
      variant={variant}
      className="!flex !items-center !justify-center !capitalize"
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
