import { Avatar, Box } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { avatar } from "../../assets/images";

const CommonAvatar = (props) => {
  const { className, src = avatar, char, sx, active } = props;
  return (
    <div className="relative">
      <Avatar sx={sx} src={src} className={`${className}`}>
        {char}
      </Avatar>
      {active && (
        <Box className="bg-accent-green size-[10px] rounded-full absolute bottom-0 right-1" />
      )}
    </div>
  );
};

CommonAvatar.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  char: PropTypes.string,
  sx: PropTypes.object, 
};

export default CommonAvatar;
