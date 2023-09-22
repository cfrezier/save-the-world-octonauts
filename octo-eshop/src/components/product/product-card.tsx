import {$, component$, useContext} from "@builder.io/qwik";
import type {Product} from "~/model/product.interface";
import {CART_CTX} from "~/components/cart/cart";
import {Image} from '@unpic/qwik';
import {Link} from "@builder.io/qwik-city";

export interface ProductCardProps {
    product: Product
}

export default component$((props: ProductCardProps) => {
    const cart = useContext(CART_CTX);

    const addToCart = $(() => {
        const previous = cart.content.find(p => p.product.id === props.product.id);
        if (!previous) {
            cart.content.push({product: props.product, howMany: 1});
        } else {
            previous.howMany++;
        }
    });

    return (
        <>
            <article key={props.product.id} class={'m-product'}>
                <Link href={'/product/' + props.product.id}>
                    <div class={'m-img-wrapper'}>
                        <Image
                            src={props.product.image}
                            layout="constrained"
                            width={props.product.imgWidth}
                            height={props.product.imgHeight}
                            alt="A lovely bath"/>
                    </div>
                    <h2 class={'a-title'}>{props.product.name}</h2>
                    <p class={'a-description'}>{props.product.description}</p>
                    <p class={'a-price'}>{props.product.price} €</p>
                </Link>
                <button class={'a-button'} onClick$={addToCart}>
                    <i class={'a-icon a-icon--buy'}></i>
                    <span class={'a-label'}>Ajouter à mon panier</span>
                    </button>
            </article>
        </>
    );
});