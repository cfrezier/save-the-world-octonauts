import {type RequestHandler} from '@builder.io/qwik-city';
import file from "./products.json";

export const onGet: RequestHandler = async ({ json }) => {
    json(200, file);
};