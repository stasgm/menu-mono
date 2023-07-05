interface IProps {
  name: string;
  phoneNumber: string;
  setName: (name: string) => void;
  setPhoneNumber: (name: string) => void;
}

export default function Form(props: IProps) {
  const { name, phoneNumber, setName, setPhoneNumber } = props;
  return (
    <form className="w-full flex items-center bg-gray-800 rounded-md max-w-xl mx-auto px-7 mt-7 sm:mt-12 h-10 sm:h-12 space-x-1">
      <input
        type="text"
        className="flex-1 border-none text-xs sm:text-base bg-gray-800 text-gray-100 focus:outline-none focus:ring-0 placeholder:text-slate-600"
        placeholder="Your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        className="flex-1 border-none text-xs sm:text-base bg-gray-800 text-gray-100 focus:outline-none focus:ring-0 placeholder:text-slate-600"
        placeholder="Your phone number"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
      />
    </form>
  );
}
