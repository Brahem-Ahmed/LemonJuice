import { Role } from '../../auth/auth.enum';

export interface IUser {
  _id: string;
  email: string;
  name: IName;
  picture: string;
  role: Role;
  userStatus: boolean;
  dateOFBirth: Date | null | string;
  level: number;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
  };
  phones: IPhone[];
  readonly fullName: string;
}

export interface IName {
  first: string;
  last: string;
}
export enum PhoneType {
  None = 'none',
  Home = 'home',
  Work = 'work',
  Mobile = 'mobile',
}
export interface IPhone {
  number: string;
  type: PhoneType;
  digits: string;
  id: number;
}
export class User implements IUser {
  constructor(
    public _id = '',
    public email = '',
    public name = { first: '', last: '' },
    public picture = '',
    public role = Role.None,
    public dateOFBirth: Date | null = null,
    public userStatus = false,
    public level = 0,
    public address = { line1: '', line2: '', city: '', state: '', zip: '' },
    public phones: IPhone[] = [],
  ) {}
  static Build(user: IUser) {
    if (!user) {
      return new User();
    }
    return new User(
      user._id,
      user.email,
      user.name,
      user.picture,
      user.role as Role,
      typeof user.dateOFBirth === 'string' ? new Date(user.dateOFBirth) : user.dateOFBirth,
      user.userStatus,
      user.level,
      user.address,
      user.phones,
    );
  }
  public get fullName(): string {
    if (!this.name) {
      return '';
    }
    return `${this.name.first} ${this.name.last}`;
  }
  toJSON(): object {
    const serialized = Object.assign(this);
    delete serialized._id;
    delete serialized.fullName;
    return serialized;
  }
}
