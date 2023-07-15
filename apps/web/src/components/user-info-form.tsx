interface IProps {
  name: string;
  phoneNumber: string;
  setName: (name: string) => void;
  setPhoneNumber: (name: string) => void;
}

export default function UserInfoForm(props: IProps) {
  const { name, phoneNumber, setName, setPhoneNumber } = props;
  return (
    <form className="mx-auto mt-4 flex h-10 w-full max-w-xl flex-wrap items-center gap-x-2 rounded-md bg-gray-800 px-2 xs:flex-nowrap xs:px-7 sm:mt-12 sm:h-12">
      <input
        type="text"
        className="flex-1 border-none bg-gray-800 text-sm text-gray-100 placeholder:text-slate-600 focus:outline-none focus:ring-0 sm:text-base"
        placeholder="Your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        className="flex-1 border-none bg-gray-800 text-sm text-gray-100 placeholder:text-slate-600 focus:outline-none focus:ring-0 sm:text-base"
        placeholder="Your phone number"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
      />
    </form>
  );
}
