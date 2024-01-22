import React, { ChangeEvent, ReactNode } from "react";

import clsx from "clsx";

export default function TextInput({
  className,
  disabled,
  endIcon,
  parentClassName,
  placeholder,
  value,
  onChange,
  onClick,
}: Props) {
  const _onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    onChange(evt.target.value);
  };

  return (
    <div className={clsx(parentClassName, "bg-neutral-800 w-full relative flex flex-row justify-center items-center p-2 px-2 rounded-lg")} onClick={onClick}>
      <input
        disabled={disabled}
        placeholder={placeholder}
        className={clsx(
          className,
          "w-full border-0 focus:outline-none bg-transparent p-0 m-0"
        )}
        type="text"
        value={value}
        onChange={_onChange}
      />
      {endIcon &&
        <div className="mr-1 cursor-pointer">
          {endIcon}
        </div>
      }
    </div>
  );
}

interface Props {
  className?: string;
  disabled?: boolean;
  endIcon?: ReactNode;
  placeholder?: string;
  parentClassName?: string;
  value: string;
  onChange: (newVal: string) => void;
  onClick?: () => void;
}
