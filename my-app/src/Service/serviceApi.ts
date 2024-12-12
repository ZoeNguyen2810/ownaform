import axios from "axios";
import { ApplicationForm } from "../Type/typeForm.ts";

export const createProfile = async ({ data, reCaptcha }: { data: ApplicationForm; reCaptcha: string }) => {
    const res = await axios.post(
        "https://owna-api-hq8-qa-dev.azurewebsites.net/api/Registration",
        data, // Body
        {
            params: {
                reCaptcha, // Params
            },
        }
    );

    return res;
};
