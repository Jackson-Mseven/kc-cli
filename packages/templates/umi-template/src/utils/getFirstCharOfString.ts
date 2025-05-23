type GetFirstCharOfString = (str: string) => string;

const defaultChar = 'K';

const getFirstCharOfString: GetFirstCharOfString = (str) => {
  return str[0] ?? defaultChar;
};

export default getFirstCharOfString;
