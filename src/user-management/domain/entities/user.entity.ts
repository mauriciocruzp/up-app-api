export class UserEntity {
    public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public admin: boolean;

    constructor(id: string, firstName: string, lastName: string, email: string, password: string, role: boolean) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.admin = role;
    }
}

