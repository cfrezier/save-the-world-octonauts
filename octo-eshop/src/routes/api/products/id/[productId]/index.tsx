import {type RequestHandler} from '@builder.io/qwik-city';
import file from "../../products.json";

export const onGet: RequestHandler = async ({json, params}) => {
    const product = file.find(product => product.id === params.productId);
    if (product) {
        json(200, product);
    } else {
        json(404, 'product not found');
    }
};