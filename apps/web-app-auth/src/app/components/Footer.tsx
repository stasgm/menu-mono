type Params = {
  text: string;
};

export default function Footer({ text }: Params) {
  return <span>{text}</span>;
}
