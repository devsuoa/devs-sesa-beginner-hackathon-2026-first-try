import type { ReactNode } from "react";

export default function Page() {
  return (
    <div>
      <Group>
        This is login page
        <InputField />
        <InputField />
        <Button />
      </Group>
    </div>
  );
}

interface GroupProps {
  children: ReactNode;
}

function Group(props: GroupProps) {
  return <div className="flex flex-col gap-2">{props.children}</div>;
}

function InputField() {
  return <input className="w-fit border-2" placeholder="input field"></input>;
}

function Button() {
  return (
    <button type="submit" className="w-fit p-2 border rounded-xl">
      Login
    </button>
  );
}
