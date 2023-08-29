// @ts-ignore: Unused import
import {component$, Resource, useResource$, useSignal} from '@builder.io/qwik';
import type {Product} from "~/model/product.interface";
import ProductCard from "~/components/product/product-card";
import {useLocation} from "@builder.io/qwik-city";

export default component$(() => {
    const date = useSignal(new Date().getTime());

    const location = useLocation();

    // @ts-ignore: Unused declaration
    const reposResource = useResource$<Product[]>(({ track, cleanup }) => {
        track(() => date.value);
        const controller = new AbortController();
        cleanup(() => controller.abort());
        // Fetch the data and return the promises.
        return getProducts(location.url.origin, controller);
    });

    console.log('Render');

    return (
        <main>
            <section>
                <Resource
                    value={reposResource}
                    onPending={() => <div>Chargement des produits...</div>}
                    onRejected={() => <div>Erreur de chargement des produits</div>}
                    onResolved={(products) => {
                        return <div class={'product-list'}>
                                {products.map(({ id, ...rest }) => (
                                    <div key={id} class={'product-list-item'}>
                                        <ProductCard product={{...rest, id}}></ProductCard>
                                    </div>
                                ))}
                                </div>;

                    }}
                />
                <button onClick$={() => date.value = new Date().getTime()}>Rafraichir</button>
            </section>
        </main>
    );
});

export async function getProducts(
    baseUrl: string,
    controller?: AbortController
): Promise<Product[]> {
    const url = `${baseUrl}/api/products`;
    console.log(`FETCH ${url} start`);
    const resp = await fetch(url, {
        signal: controller?.signal,
    });
    console.log(`FETCH ${url} done`);
    const json = await resp.json();
    return Array.isArray(json) ? json : Promise.reject(json);
}
