import {component$, useComputed$, useContext} from "@builder.io/qwik";
import type {ProductInstance} from "~/model/product-instance";

import {CART_CTX} from "~/components/cart/cart";
import Home from "~/components/home/home";
import {routeAction$} from "@builder.io/qwik-city";
import {saveCommand} from "~/service/command-utils";
import {Image} from "@unpic/qwik";

export const transformCartForPayload = (data: { content: ProductInstance[] }) => {
    return data.content.map((inst: ProductInstance) => ({
        quantity: inst.howMany,
        id: inst.product.id,
        price: inst.product.price
    }))
}

export const useCommand = routeAction$(async (payload) => {
    const command = saveCommand(payload);
    console.log(`Commande reçue: ${command}`);
    return {
        success: command > -1,
        commandId: command
    };
});

export default component$(() => {
    const cart = useContext(CART_CTX);

    const numberOfArticles = useComputed$(() => {
        return cart.content.reduce((p, c: ProductInstance) => c.howMany + p, 0);
    });

    const total = useComputed$(() => {
        return cart.content.reduce((p, c: ProductInstance) => c.howMany * c.product.price + p, 0);
    });

    const action = useCommand();


    return (<>
        <Home></Home>
        {
            cart.content.length === 0 ?
                <div class={'u-mt-4'}>Aucun produit dans votre panier.</div> :
                <div class={'m-table-wrapper'}>
                    <table class={'m-table'}>
                        <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Prix unitaire</th>
                            <th>Quantité</th>
                            <th>Valeur</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cart.content.map((instance: ProductInstance) => (
                            <tr key={instance.product.id} class={'cart-line'}>
                                <td>
                                    <Image
                                        src={instance.product.image}
                                        layout="constrained"
                                        width={instance.product.imgWidth}
                                        height={instance.product.imgHeight}
                                        alt="A lovely bath"/>
                                    <p>{instance.product.name}</p>
                                </td>
                                <td>{instance.product.price} €</td>
                                <td>{instance.howMany}</td>
                                <td>{instance.howMany * instance.product.price} €</td>
                            </tr>
                        ))}
                        <tr class={'m-table-total'}>
                            <td></td>
                            <td></td>
                            <td>Nombre d'articles: {numberOfArticles}</td>
                            <td>Total: {total} €</td>
                        </tr>
                        </tbody>
                    </table>

                    <button class={'a-button'} onClick$={async () => {
                        await action.submit({cart: transformCartForPayload(cart)});
                    }}
                            disabled={action.value?.success}>
                        <i class={'a-icon a-icon--pay'}></i>
                        <span class={'a-label'}>Commander</span>
                    </button>

                    {action.value?.success && (
                        <p class={'a-validation u-mt-2'}>Votre commande a été passée. Son identifiant est le {action.value.commandId}. Les animaux
                            marins vous remercient !</p>
                    )}
                </div>
        }
    </>);
});
