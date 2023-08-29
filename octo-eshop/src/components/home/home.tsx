import {component$} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";

export default component$(() => {
    return (<>
        <Link href={'/'} class={'a-btn'}>Accueil</Link>
    </>);
});
