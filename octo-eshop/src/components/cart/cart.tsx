import {component$, createContextId, Slot, useComputed$, useContextProvider, useStore} from "@builder.io/qwik";
import type {ProductInstance} from "~/model/product-instance";
import {Link} from "@builder.io/qwik-city";

export const CART_CTX = createContextId<{ content: ProductInstance[] }>('cart');

export default component$(() => {
    const cart = useStore({content: []});

    useContextProvider(CART_CTX, cart);

    const numberOfArticles = useComputed$(() => {
        return cart.content.reduce((p, c: ProductInstance) => c.howMany + p, 0);
    });

    return (<>
        <Link href={'/cart-list'} class={'m-basket'}>
            <i class={'a-icon a-icon--basket'}></i>
            <span class={'a-number'}>{numberOfArticles}</span>
            <span class={'a-label'}>Mon panier</span>
        </Link>
        <Slot/>
    </>);
});
