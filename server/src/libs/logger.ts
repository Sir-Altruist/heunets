import logger from "pino"
import dayjs from "dayjs";

const level = "info";

const log = logger({
    transport: {
        target: "pino-pretty"
    },
    level,
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format("YYYY-MM-DD THH:mm:ss")}"`
});

export default log;
