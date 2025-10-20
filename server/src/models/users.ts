import { DataTypes, UUIDV4 } from "sequelize";
import { dbClient } from "../datasources";
import { UserModel, UserPayload } from "../interfaces";
import bcrypt from "bcryptjs"

const Users = dbClient.define<UserModel, UserPayload>(
    "users",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        permissions: {
            type: DataTypes.JSON,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
        defaultScope: {
            attributes: {
                exclude: ["password"]
            }
        },
        scopes: {
            withPassword: {
                attributes: {
                    include: ["password"]
                },
            },
        }
    }
);

// Hash password before registration
Users.beforeCreate(async (user) => {
    try {
        const hash = await bcrypt.hash(user.password, 12);
        user.password = hash;
    } catch (err: any) {
        throw new Error(err.message);
    }
});

export default Users;