const customRenderAvatar = (name = "Unknown") => {
  // const nameSplit = name?.split(" ");
  // const avatar = nameSplit[nameSplit?.length - 1][0];
  const avatar = name.charAt(0);
  return avatar;
};

export default customRenderAvatar;
