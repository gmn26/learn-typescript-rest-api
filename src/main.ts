import { logger } from "./application/logging";
import { web } from "./application/web";

web.listen(6969, () => {
    logger.info("Listening on port : 6969")
})