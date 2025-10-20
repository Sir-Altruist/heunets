export interface IHandlers {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface IField {
    label: string;
    placeholder: string;
    error: string;
    value: string;
    name: string;
    handlers: IHandlers;
    className?: string;
    inputType?: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IconProps {
  className?: string;
  size?: number;
  click?: () => void;
  style?: any
}

export interface ISelect {
  options: {
    label: string;
    value: string;
  }[];
  className?: string;
  state?: boolean;
  setState?: React.SetStateAction<any>;
  value?: string;
}