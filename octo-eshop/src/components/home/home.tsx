import {component$} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";

export default component$(() => {
    return (<>
        <Link href={'/'} class={'a-button a-button--attached'}>
            <i class={'a-icon a-icon--home'}></i>
            <span class={'a-label'}>Accueil</span>
        </Link>
    </>);
});
