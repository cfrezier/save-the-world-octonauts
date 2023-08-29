import {component$} from "@builder.io/qwik";
import ProductList from "~/components/product/product-list";

export default component$(() => {
    return (
        <>
            <h1>Hello Bdx IO !</h1>
            <ProductList/>
        </>
    );
});