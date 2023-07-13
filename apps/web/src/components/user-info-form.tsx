interface IProps {
  name: string;
  phoneNumber: string;
  setName: (name: string) => void;
  setPhoneNumber: (name: string) => void;
}

export default function UserInfoForm(props: IProps) {
  const { name, phoneNumber, setName, setPhoneNumber } = props;
  return (
    <form className="flex w-full items-center bg-gray-800 rounded-md max-w-xl mx-auto xs:px-7 px-2 mt-4 sm:mt-12 h-10 sm:h-12 gap-x-2 xs:flex-nowrap flex-wrap">
      <input
        type="text"
        className="flex-1 border-none text-sm sm:text-base bg-gray-800 text-gray-100 focus:outline-none focus:ring-0 placeholder:text-slate-600"
        placeholder="Your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        className="flex-1 border-none text-sm sm:text-base bg-gray-800 text-gray-100 focus:outline-none focus:ring-0 placeholder:text-slate-600"
        placeholder="Your phone number"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
      />
    </form>
  );
}
