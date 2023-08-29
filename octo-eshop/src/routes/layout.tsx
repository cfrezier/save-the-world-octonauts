import {component$, Slot} from "@builder.io/qwik";
import type {DocumentHead, RequestHandler} from "@builder.io/qwik-city";
import ImageOnepoint from '../../public/images/onepoint-white.png?jsx';
import ImageBdxIO from '../../public/images/bdxio.png?jsx';
import ImageAuthor from '../../public/images/icon.jpeg?jsx';
import Cart from "~/components/cart/cart";

export const onGet: RequestHandler = async ({cacheControl}) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });
};

export default component$(() => {
    return <>
        <h1>Aidez les Octonautes à sauver la planète !</h1>
        <div class="bdx-io">
            <ImageBdxIO alt={'Logo BdxIO'}/>
        </div>
        <div class="author center-image">
            <ImageAuthor class={'circle'} alt={'Avatar cfrezier'}/>@cfrezier
        </div>
        <Cart>
            <Slot/>
        </Cart>
        <div class="onepoint center-image">
            Made with ❤️ by @cfrezier impersonating Cassie, with the courtesy of <ImageOnepoint alt={'Logo onepoint'}/>
        </div>
    </>;
});

export const head: DocumentHead = {
    title: "Les octonautes sauvent le monde avec Qwik",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
    links: [
        {
            rel: 'stylesheet',
            id: 'font-family-1-css',
            href: 'https://fonts.googleapis.com/css2?family=Poppins%3Awght%40300%3B400%3B600%3B700&#038;display=swap&#038;ver=005bbd',
            type: 'text/css',
            media: 'all'
        },
    ],
};