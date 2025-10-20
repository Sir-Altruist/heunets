import { DataTypes, UUIDV4 } from "sequelize";
import { dbClient } from "../datasources";
import { TicketModel, TicketPayload } from "../interfaces";

const Tickets = dbClient.define<TicketModel, TicketPayload>(
    "tickets",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        addedBy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        assignedTo: {
            type: DataTypes.STRING
        },
        dateAssigned: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "unassigned"
        },
        dateResolved: {
            type: DataTypes.DATE
        },
        dateClosed: {
            type: DataTypes.DATE
        }
    },
    {
        timestamps: true
    }
);

export default Tickets;