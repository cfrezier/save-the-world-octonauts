import type {DocumentHead} from "@builder.io/qwik-city";
import {routeLoader$} from "@builder.io/qwik-city";
import type {Product} from "~/model/product.interface";
import {component$} from "@builder.io/qwik";
import ProductCard from "~/components/product/product-card";
import Home from "~/components/home/home";

export const useProductDetails = routeLoader$(async (requestEvent) => {
    const url = `${window.location.origin}/api/products/id/${requestEvent.params.productId}`;
    console.log(`FETCH ${url} start`);
    const res = await fetch(url);
    console.log(`FETCH ${url} done`);
    const product = await res.json();
    return product as Product;
});

export default component$(() => {
    // In order to access the `routeLoader$` data within a Qwik Component, you need to call the hook.
    const signal = useProductDetails(); // Readonly<Signal<Product>>
    return <>
        <Home></Home>
        <ProductCard product={signal.value}></ProductCard>
    </>;
});

export const head: DocumentHead = ({resolveValue}) => {
    const product = resolveValue(useProductDetails);
    return {
        title: `Détails de "${product.name}"`,
        meta: [
            {
                name: 'description',
                content: product.description,
            },
            {
                name: 'id',
                content: product.id,
            },
        ],
    };
};