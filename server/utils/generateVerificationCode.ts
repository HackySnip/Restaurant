export const genrateVerficationCode = (length = 6): string => {
  const characters = "1234567890";
  let verificationCode = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    verificationCode += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }

  return verificationCode;
};
