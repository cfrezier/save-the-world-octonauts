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
            <div key={props.product.id} class={'product-card'}>

                <Link href={'/product/' + props.product.id}>
                    <Image
                        src={props.product.image}
                        layout="constrained"
                        width={props.product.imgWidth}
                        height={props.product.imgHeight}
                        alt="A lovely bath"/>
                </Link>
                <h2>{props.product.name}</h2>
                <p>{props.product.description}</p>
                <div>
                    <p>
                        <button onClick$={addToCart}>Add to Cart (${props.product.price}€)</button>
                    </p>
                </div>
            </div>
        </>
    );
});