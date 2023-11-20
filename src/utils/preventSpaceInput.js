const preventSpaceInput = (e) => {
  if (e.code === "Space") e.preventDefault();
};

export default preventSpaceInput;
