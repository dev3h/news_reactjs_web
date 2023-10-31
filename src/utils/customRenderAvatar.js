const customRenderAvatar = (name) => {
  const nameSplit = name?.split(" ");
  const avatar = nameSplit[nameSplit?.length - 1][0];
  return avatar;
};

export default customRenderAvatar;
